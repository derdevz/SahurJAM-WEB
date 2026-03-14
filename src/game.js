import { Station } from "./station.js";
import { Player } from "./player.js";
import { Renderer } from "./renderer.js";
import { ParticleSystem } from "./particles.js";
import { OrderManager } from "./orderManager.js";
import { AudioManager } from "./audioManager.js";
import { RECIPES, ITEM_ICONS } from "./recipes.js";
import { GAME_CONFIG } from "./config/gameConfig.js";
import { KITCHEN_LAYOUT } from "./layouts/kitchenLayout.js";

const PROCESS_TO_STATE = {
  cook: "cooked",
  bake: "baked",
  chop: "chopped"
};

const RECIPE_KEYS = Object.keys(RECIPES);

function getRecipeKey(recipe) {
  return RECIPE_KEYS.find((k) => RECIPES[k] === recipe) || null;
}

export class Game {
  constructor(canvas, hudRefs, config = GAME_CONFIG, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.hud = hudRefs;
    this.config = config;
    this.layoutDef = KITCHEN_LAYOUT;

    this.assets = assets;
    this.renderer = new Renderer(canvas, hudRefs, config, assets);
    this.audio = new AudioManager();

    this.state = "menu";
    this.score = 0;
    this.completedOrders = 0;
    this.mainTimer = config.match.durationMs;

    this.dayPhase = config.cycle.initialPhase;
    this.phaseTimer = 0;
    this.phaseDuration = config.cycle.phaseDurationMs;

    this.comboCount = 0;
    this.comboTimer = 0;
    this.comboWindowMs = 6000;
    this.comboMultiplier = 1;

    this.interactHeld = false;
    this.interactBufferMs = 0;
    this.interactBufferWindowMs = 160;
    this.lastChopSoundMs = 0;

    this.cameraShakeTime = 0;
    this.cameraShakeStrength = 0;

    this.keys = {};
    this.worldW = this.canvas.width;
    this.worldH = this.canvas.height;
    this.worldScale = 1;
    this.layoutTransform = this.computeLayoutTransform(this.worldW, this.worldH);

    this.stations = this.createStations();
    this.player = this.createPlayer(this.worldW, this.worldH);
    this.particles = new ParticleSystem();
    this.orderManager = new OrderManager((penalty, msg) => {
      this.score += penalty;
      this.breakCombo();
      this.audio.playFail();
      this.notify(msg);
    }, config);
    this.orderManager.setCyclePhase(this.dayPhase);

    this.notificationTimer = 0;
    this.lastTime = 0;
    this.running = false;

    this.bindInput();
  }

  computeLayoutTransform(width, height) {
    const { baseWidth, baseHeight } = this.config.canvas;
    const scale = Math.min(width / baseWidth, height / baseHeight);
    const offsetX = (width - baseWidth * scale) * 0.5;
    const offsetY = (height - baseHeight * scale) * 0.5;
    return { scale, offsetX, offsetY };
  }

  mapLayoutRect(rect) {
    const { scale, offsetX, offsetY } = this.layoutTransform;
    return {
      x: offsetX + rect.x * scale,
      y: offsetY + rect.y * scale,
      w: rect.w * scale,
      h: rect.h * scale
    };
  }

  createPlayer(width, height) {
    const sx = width / this.config.canvas.baseWidth;
    const sy = height / this.config.canvas.baseHeight;
    const x = this.config.player.spawnX * sx;
    const y = this.config.player.spawnY * sy;
    const scale = Math.min(sx, sy);

    const player = new Player(x, y);
    player.radius = this.config.player.radius * scale;
    player.speed = this.config.player.speed * scale;
    player.interactRange = this.config.player.interactRange * scale;
    return player;
  }

  createStations() {
    return this.layoutDef.map((def) => {
      const mapped = this.mapLayoutRect(def);
      return new Station(mapped.x, mapped.y, mapped.w, mapped.h, def.type, def.options || {});
    });
  }

  updateStationRectsFromLayout() {
    for (let i = 0; i < this.stations.length; i += 1) {
      const station = this.stations[i];
      const def = this.layoutDef[i];
      const mapped = this.mapLayoutRect(def);
      station.setRect(mapped.x, mapped.y, mapped.w, mapped.h);
    }
  }

  resize(width, height) {
    const prevW = this.worldW || width;
    const prevH = this.worldH || height;

    this.canvas.width = Math.max(this.config.canvas.minWidth, Math.floor(width));
    this.canvas.height = Math.max(this.config.canvas.minHeight, Math.floor(height));
    this.worldW = this.canvas.width;
    this.worldH = this.canvas.height;
    this.worldScale = Math.min(
      this.worldW / this.config.canvas.baseWidth,
      this.worldH / this.config.canvas.baseHeight
    );

    this.layoutTransform = this.computeLayoutTransform(this.worldW, this.worldH);

    if (!this.stations || this.stations.length === 0) {
      this.stations = this.createStations();
    } else {
      this.updateStationRectsFromLayout();
    }

    if (!this.player) {
      this.player = this.createPlayer(this.worldW, this.worldH);
      return;
    }

    this.player.x = (this.player.x / prevW) * this.worldW;
    this.player.y = (this.player.y / prevH) * this.worldH;
    this.player.radius = this.config.player.radius * this.worldScale;
    this.player.speed = this.config.player.speed * this.worldScale;
    this.player.interactRange = this.config.player.interactRange * this.worldScale;
  }

  bindInput() {
    window.addEventListener("keydown", (e) => {
      this.audio.unlock();
      this.keys[e.code] = true;

      if (e.code === "Enter") {
        if (this.state === "menu" || this.state === "levelComplete") {
          this.startRun();
          this.audio.playMenuStart();
        }
      }

      if (e.code === "KeyR" && this.state === "gameOver") {
        this.startRun();
        this.audio.playMenuStart();
      }

      if (e.code === "KeyE" || e.code === "Space") {
        e.preventDefault();
        this.interactHeld = true;
        if (this.state === "playing") {
          this.interactBufferMs = this.interactBufferWindowMs;
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
      if (e.code === "KeyE" || e.code === "Space") {
        this.interactHeld = false;
      }
    });
  }

  startRun() {
    this.state = "playing";
    this.score = 0;
    this.completedOrders = 0;
    this.mainTimer = this.config.match.durationMs;

    this.dayPhase = this.config.cycle.initialPhase;
    this.phaseTimer = 0;

    this.comboCount = 0;
    this.comboTimer = 0;
    this.comboMultiplier = 1;

    this.player = this.createPlayer(this.worldW, this.worldH);
    this.stations = this.createStations();
    this.particles = new ParticleSystem();
    this.orderManager = new OrderManager((penalty, msg) => {
      this.score += penalty;
      this.breakCombo();
      this.audio.playFail();
      this.notify(msg);
    }, this.config);
    this.orderManager.setCyclePhase(this.dayPhase);

    this.notify("Iftar hazirligi basladi!");
  }

  updateCycle(delta) {
    this.phaseTimer += delta;
    if (this.phaseTimer >= this.phaseDuration) {
      this.phaseTimer = 0;
      this.dayPhase = this.dayPhase === "iftar" ? "sahur" : "iftar";
      this.orderManager.setCyclePhase(this.dayPhase);
    }
  }

  addCameraShake(strength = 5, durationMs = 120) {
    this.cameraShakeStrength = Math.max(this.cameraShakeStrength, strength);
    this.cameraShakeTime = Math.max(this.cameraShakeTime, durationMs);
  }

  breakCombo() {
    this.comboCount = 0;
    this.comboTimer = 0;
    this.comboMultiplier = 1;
  }

  registerCombo() {
    if (this.comboTimer > 0) {
      this.comboCount += 1;
    } else {
      this.comboCount = 1;
    }
    this.comboTimer = this.comboWindowMs;
    this.comboMultiplier = 1 + Math.min(this.comboCount - 1, 6) * 0.15;
  }

  handleInteract() {
    const result = this.player.interact(this.stations, this.orderManager);
    if (!result.didInteract) {
      return false;
    }

    if (result?.message) this.notify(result.message);
    this.audio.playInteract();

    if (result?.fail) {
      this.breakCombo();
      this.audio.playFail();
      this.addCameraShake(4, 100);
    }

    if (result?.served?.success) {
      this.registerCombo();

      const comboBonus = Math.round(result.served.total * (this.comboMultiplier - 1));
      const totalAward = result.served.total + comboBonus;
      this.score += totalAward;
      this.completedOrders += 1;

      this.notify(`Harika servis! +${totalAward} puan`);

      const service = this.stations.find((s) => s.type === "service");
      if (service) {
        const sx = service.x + service.w / 2;
        const sy = service.y + service.h / 2;
        this.particles.emit("sparkle", sx, sy, { count: 10 });
        this.particles.emit("popup", sx, sy - 20, {
          text: `+${totalAward} puan`,
          color: "#f6de92"
        });
      }

      this.audio.playServe(this.comboMultiplier);
      this.addCameraShake(6, 140);

      if (this.completedOrders >= this.config.match.levelCompleteOrders) {
        this.state = "levelComplete";
        this.notify("Seviye tamamlandi!");
      }
    }

    return true;
  }

  getActiveHoldChopStation() {
    if (!this.interactHeld) return null;
    const nearest = this.player.getNearestStation(this.stations, this.player.interactRange + 20 * this.worldScale);
    if (!nearest) return null;
    if (nearest.type !== "chopping") return null;
    if (nearest.state !== "processing") return null;
    return nearest;
  }

  updateStations(delta, holdChopStation) {
    for (const station of this.stations) {
      const wasState = station.state;

      const holdActive = station.type === "chopping" ? station === holdChopStation : true;
      station.update(delta, holdActive);

      if (holdActive && station.type === "chopping" && station.state === "processing") {
        this.lastChopSoundMs += delta;
        if (this.lastChopSoundMs >= 280) {
          this.lastChopSoundMs = 0;
          this.audio.playChopTick();
        }
      }

      if (station.state === "processing" && ["stove", "oven"].includes(station.type) && Math.random() < 0.08) {
        this.particles.emit("smoke", station.x + station.w / 2, station.y + 8);
      }

      if (wasState === "processing" && station.state === "done" && station.item) {
        const nextStep = station.item.recipe.steps[station.item.stepIndex + 1];
        if (nextStep && ["cook", "bake", "chop"].includes(nextStep.action)) {
          station.item.stepIndex += 1;
          station.item.state = PROCESS_TO_STATE[nextStep.action];
          const finalKey = getRecipeKey(station.item.recipe);
          const upcoming = station.item.recipe.steps[station.item.stepIndex + 1];
          if (station.item.stepIndex >= station.item.recipe.steps.length - 1 || upcoming?.action === "serve") {
            station.item.key = finalKey;
            station.item.icon = ITEM_ICONS[finalKey] || station.item.icon;
            station.item.recipeKey = finalKey;
          }
        }
      }

      if (station.state === "done" && station.type === "plating" && station.item) {
        const recipe = station.item.recipe;
        const maybeServeStep = recipe?.steps[station.item.stepIndex + 1];
        if (maybeServeStep && maybeServeStep.action === "serve") {
          const finalKey = getRecipeKey(recipe);
          station.item.key = finalKey;
          station.item.icon = ITEM_ICONS[finalKey] || station.item.icon;
          station.item.recipeKey = finalKey;
        }
      }

      if (station.state === "burnt" && Math.random() < 0.03) {
        this.particles.emit("warning", station.x + station.w / 2, station.y - 6, {
          text: "⚠ YANIYOR!",
          color: "#ff4635"
        });
        if (Math.random() < 0.2) this.audio.playWarning();
      }

      if (wasState !== "burnt" && station.state === "burnt") {
        this.breakCombo();
        this.addCameraShake(5, 110);
      }
    }
  }

  notify(message) {
    this.hud.notifications.innerHTML = `<span class="notification">${message}</span>`;
    this.notificationTimer = this.config.notifications.durationMs;
  }

  update(delta) {
    if (this.notificationTimer > 0) {
      this.notificationTimer -= delta;
      if (this.notificationTimer <= 0) this.hud.notifications.textContent = "";
    }

    if (this.cameraShakeTime > 0) {
      this.cameraShakeTime -= delta;
      if (this.cameraShakeTime <= 0) {
        this.cameraShakeTime = 0;
        this.cameraShakeStrength = 0;
      }
    }

    if (this.comboTimer > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) this.breakCombo();
    }

    if (this.state !== "playing") {
      this.particles.update(delta);
      return;
    }

    if (this.interactBufferMs > 0) {
      const success = this.handleInteract();
      if (success) {
        this.interactBufferMs = 0;
      } else {
        this.interactBufferMs -= delta;
      }
    }

    this.updateCycle(delta);
    this.player.update(delta, this.keys, this.stations, { w: this.worldW, h: this.worldH });

    const holdChopStation = this.getActiveHoldChopStation();
    this.updateStations(delta, holdChopStation);

    this.orderManager.update(delta);
    this.particles.update(delta);

    this.mainTimer -= delta;
    if (this.mainTimer <= 0) {
      this.mainTimer = 0;
      this.state = "gameOver";
      this.audio.playFail();
      this.notify("Vakit doldu!");
    }
  }

  frame = (ts) => {
    if (!this.running) return;

    if (!this.lastTime) this.lastTime = ts;
    let delta = ts - this.lastTime;
    this.lastTime = ts;
    delta = Math.min(delta, 50);

    this.update(delta);
    this.renderer.draw(this);

    requestAnimationFrame(this.frame);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = 0;
    requestAnimationFrame(this.frame);
  }
}
