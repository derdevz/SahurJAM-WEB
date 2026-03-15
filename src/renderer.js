import { ITEM_ICONS } from "./recipes.js";
import { GAME_CONFIG } from "./config/gameConfig.js";

const STATION_ASSET = {
  ingredient: "stationIngredient",
  stove: "stationStove",
  oven: "stationOven",
  chopping: "stationChopping",
  plating: "stationPlating",
  service: "stationService",
  trash: "stationTrash"
};

const ITEM_ASSET = {
  lentils: "itemLentils",
  dough: "itemDough",
  vegetables: "itemVegetables",
  chickpeas: "itemChickpeas",
  pastry: "itemPastry",
  meat: "itemMeat",
  rice: "itemRice",
  mercimekCorbasi: "itemMercimekCorbasi",
  pide: "itemPide",
  salata: "itemSalata",
  nohutYemegi: "itemNohutYemegi",
  baklava: "itemBaklava",
  kebap: "itemKebap",
  pilav: "itemPilav"
};

const HOT_RECIPES = new Set(["mercimekCorbasi", "pide", "nohutYemegi", "baklava", "kebap", "pilav"]);
const RECIPE_PRESENTATION = {
  mercimekCorbasi: { plate: "#d7d7c8", accent: "#d68435", steamColor: "rgba(255, 241, 218, 0.6)", steamCount: 3 },
  pide: { plate: "#ddd5c7", accent: "#d09b52", steamColor: "rgba(255, 236, 208, 0.54)", steamCount: 2 },
  salata: { plate: "#d9e6d3", accent: "#7db16a", steamColor: "rgba(215, 238, 220, 0.2)", steamCount: 0 },
  nohutYemegi: { plate: "#ddd3c5", accent: "#c98f47", steamColor: "rgba(255, 236, 212, 0.58)", steamCount: 3 },
  baklava: { plate: "#efe0b5", accent: "#e2b84e", steamColor: "rgba(255, 244, 214, 0.42)", steamCount: 2 },
  kebap: { plate: "#2d2d30", accent: "#c84f39", steamColor: "rgba(255, 225, 205, 0.62)", steamCount: 3 },
  pilav: { plate: "#ece2cc", accent: "#d4b56d", steamColor: "rgba(255, 248, 232, 0.58)", steamCount: 3 }
};

export class Renderer {
  constructor(canvas, hudRefs, config = GAME_CONFIG, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.hud = hudRefs;
    this.config = config;
    this.assets = assets;
    this.upgradeMarkup = "";
  }

  getAsset(key) {
    return this.assets?.get(key) || null;
  }

  drawImageSafe(ctx, img, x, y, w, h) {
    if (!img) return false;
    ctx.drawImage(img, x, y, w, h);
    return true;
  }

  drawCustomStation(ctx, station) {
    if (station.type === "fridge") {
      ctx.fillStyle = "#5f7f98";
      ctx.fillRect(station.x, station.y, station.w, station.h);
      ctx.fillStyle = "#7899b3";
      ctx.fillRect(station.x + 4, station.y + 4, station.w - 8, station.h - 8);
      ctx.fillStyle = "#dfeefa";
      ctx.fillRect(station.x + 8, station.y + 10, station.w - 16, station.h - 20);
      ctx.strokeStyle = "rgba(23, 43, 62, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(station.x, station.y, station.w, station.h);

      ctx.fillStyle = "#496276";
      ctx.fillRect(station.x + station.w - 14, station.y + 22, 4, 28);
      ctx.fillRect(station.x + station.w - 14, station.y + 98, 4, 28);
      ctx.fillRect(station.x + 8, station.y + station.h - 6, 10, 6);
      ctx.fillRect(station.x + station.w - 18, station.y + station.h - 6, 10, 6);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(station.x + 8, station.y + 10, station.w - 16, station.h - 20);
      ctx.fillStyle = "rgba(80, 121, 152, 0.35)";
      ctx.fillRect(station.x + 10, station.y + 36, station.w - 20, 3);
      ctx.fillRect(station.x + 10, station.y + 68, station.w - 20, 3);
      ctx.fillRect(station.x + 10, station.y + 100, station.w - 20, 3);
      ctx.fillRect(station.x + 10, station.y + 132, station.w - 20, 3);

      const items = station.ingredientItems || [];
      items.slice(0, 8).forEach((itemKey, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const icon = ITEM_ICONS[itemKey] || "🍽";
        const x = station.x + 26 + col * 32;
        const y = station.y + 30 + row * 31;
        ctx.font = "20px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#355066";
        ctx.fillText(icon, x, y);
      });
      return true;
    }

    if (station.type === "prepTable") {
      // Marble/Wood prep table with glass top
      ctx.fillStyle = "rgba(140, 98, 57, 0.4)";
      ctx.fillRect(station.x, station.y + 12, station.w, station.h - 12);
      ctx.fillStyle = "rgba(176, 133, 89, 0.6)";
      ctx.fillRect(station.x, station.y, station.w, 12);
      ctx.strokeStyle = "rgba(246, 222, 146, 0.3)";
      ctx.strokeRect(station.x, station.y, station.w, station.h);
      return true;
    }

    if (station.type === "diningTable") {
      const cx = station.x + station.w / 2;
      const cy = station.y + station.h / 2;

      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, station.w / 2, station.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(240, 211, 146, 0.2)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, station.w / 2 - 4, station.h / 2 - 4, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(232, 216, 187, 0.32)";
      ctx.beginPath();
      ctx.arc(cx, cy - 4, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(244, 219, 168, 0.38)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy - 4, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255, 241, 214, 0.88)";
      ctx.fillText("🍽", cx, cy + 2);
      return true;
    }

    return false;
  }

  drawBackground(ctx, phase = "iftar") {
    ctx.imageSmoothingEnabled = false;
    const { width, height } = this.canvas;

    const bg = this.getAsset("roomBackground");
    if (bg) {
      ctx.drawImage(bg, 0, 0, width, height);
    } else {
      ctx.fillStyle = "#2a1a12";
      ctx.fillRect(0, 0, width, height);
    }

    const warmPhase = phase === "iftar";
    const mainGlow = ctx.createLinearGradient(0, 0, 0, height);
    if (warmPhase) {
      mainGlow.addColorStop(0, "rgba(255, 177, 73, 0.28)");
      mainGlow.addColorStop(0.45, "rgba(184, 82, 36, 0.14)");
      mainGlow.addColorStop(1, "rgba(42, 18, 8, 0.08)");
      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, width, height);

      const sunGlow = ctx.createRadialGradient(width * 0.78, height * 0.18, 0, width * 0.78, height * 0.18, 240);
      sunGlow.addColorStop(0, "rgba(255, 214, 118, 0.34)");
      sunGlow.addColorStop(0.45, "rgba(255, 148, 66, 0.16)");
      sunGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);
    } else {
      mainGlow.addColorStop(0, "rgba(84, 122, 194, 0.2)");
      mainGlow.addColorStop(0.45, "rgba(40, 63, 110, 0.14)");
      mainGlow.addColorStop(1, "rgba(10, 18, 34, 0.14)");
      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, width, height);

      const moonGlow = ctx.createRadialGradient(width * 0.78, height * 0.16, 0, width * 0.78, height * 0.16, 220);
      moonGlow.addColorStop(0, "rgba(214, 232, 255, 0.26)");
      moonGlow.addColorStop(0.5, "rgba(112, 152, 225, 0.12)");
      moonGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawStation(ctx, station) {
    ctx.save();
    const pulseTime = performance.now() * 0.004;

    const stationAssetKey = STATION_ASSET[station.type];
    const stationAsset = stationAssetKey ? this.getAsset(stationAssetKey) : null;

    if (!this.drawCustomStation(ctx, station) && !this.drawImageSafe(ctx, stationAsset, station.x, station.y, station.w, station.h)) {
      ctx.fillStyle = station.color.top;
      ctx.fillRect(station.x, station.y, station.w, station.h);
      ctx.fillStyle = station.color.side;
      ctx.fillRect(station.x, station.y + station.h - 5, station.w, 5);
    }

    if (station.state === "processing") {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(station.x + 6, station.y + 4, station.w - 12, 8);
      const p = Math.min(1, station.progress);
      const r = Math.round(220 - p * 70);
      const g = Math.round(160 - p * 120);
      ctx.fillStyle = `rgb(${r},${g},30)`;
      ctx.fillRect(station.x + 6, station.y + 4, (station.w - 12) * p, 8);
    }

    if (station.state === "burnt") {
      ctx.fillStyle = "rgba(20,0,0,0.45)";
      ctx.fillRect(station.x, station.y, station.w, station.h);
      ctx.strokeStyle = "#ef3a22";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(station.x + 8, station.y + 8);
      ctx.lineTo(station.x + station.w - 8, station.y + station.h - 8);
      ctx.moveTo(station.x + station.w - 8, station.y + 8);
      ctx.lineTo(station.x + 8, station.y + station.h - 8);
      ctx.stroke();
    }

    if (station.state === "done") {
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#5bd36b";
      ctx.fillStyle = "#7fed90";
      ctx.font = "bold 18px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("✓", station.x + station.w - 10, station.y + 16);
      ctx.shadowBlur = 0;
    }

    if (station.type === "diningTable" && station.seatedOrder) {
      const isPremium = (station.seatedOrder.recipe.unlockLevel || 1) >= 3 || station.seatedOrder.recipe.points >= 200;
      const recipeKey = station.seatedOrder.recipeKey;
      const presentation = RECIPE_PRESENTATION[recipeKey] || {};
      const glowAlpha = 0.08 + (Math.sin(pulseTime + station.x * 0.01) + 1) * 0.05;
      ctx.fillStyle = isPremium ? "rgba(84, 57, 26, 0.9)" : "rgba(68, 48, 30, 0.82)";
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2 + 6, station.w * 0.26, station.h * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = presentation.plate || (isPremium ? "rgba(247, 232, 186, 0.96)" : "rgba(238, 229, 212, 0.92)");
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2 + 1, station.w * 0.22, station.h * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = presentation.accent
        ? `${presentation.accent}${""}`
        : isPremium
          ? `rgba(245, 200, 66, ${0.12 + glowAlpha})`
          : `rgba(255, 244, 220, ${0.07 + glowAlpha * 0.6})`;
      if (presentation.accent) {
        ctx.globalAlpha = 0.16 + glowAlpha;
      }
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2, station.w * 0.38, station.h * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (isPremium) {
        ctx.strokeStyle = presentation.accent || "rgba(245, 200, 66, 0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2, station.w * 0.32, station.h * 0.24, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    if (station.item) {
      const itemAsset = this.getAsset(ITEM_ASSET[station.item.key]);
      const isRaw = station.item.state === "raw";
      const size = Math.min(station.w, station.h) * (station.type === "diningTable" ? 0.72 : isRaw ? 0.72 : 0.66);
      if (!this.drawImageSafe(ctx, itemAsset, station.x + station.w / 2 - size / 2, station.y + station.h / 2 - size / 2, size, size)) {
        const icon = station.item.icon || ITEM_ICONS[station.item.key] || "🍽";
        ctx.font = `${Math.max(isRaw ? 30 : 22, station.h * (station.type === "diningTable" ? 0.48 : isRaw ? 0.48 : 0.4))}px serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#f5f0de";
        ctx.fillText(icon, station.x + station.w / 2, station.y + station.h / 2 + 8);
      }
    }

    if (station.type === "diningTable" && station.seatedOrder) {
      const isPremium = (station.seatedOrder.recipe.unlockLevel || 1) >= 3 || station.seatedOrder.recipe.points >= 200;
      const recipeKey = station.seatedOrder.recipeKey;
      const presentation = RECIPE_PRESENTATION[recipeKey] || {};
      ctx.fillStyle = "#f5ede0";
      ctx.font = `${Math.max(isPremium ? 34 : 28, station.h * (isPremium ? 0.54 : 0.46))}px serif`;
      ctx.textAlign = "center";
      ctx.shadowBlur = isPremium ? 20 : 10;
      ctx.shadowColor = presentation.accent || (isPremium ? "#f5c842" : "rgba(255, 245, 225, 0.55)");
      ctx.fillText(station.seatedOrder.recipe.icon, station.x + station.w / 2, station.y + station.h / 2 + 10);
      ctx.shadowBlur = 0;

      if (HOT_RECIPES.has(recipeKey) && (presentation.steamCount || 0) > 0) {
        ctx.strokeStyle = presentation.steamColor || "rgba(255, 245, 225, 0.55)";
        ctx.lineWidth = 2;
        const halfCount = Math.floor(presentation.steamCount / 2);
        for (let i = -halfCount; i <= halfCount; i += 1) {
          const baseX = station.x + station.w / 2 + i * 12;
          const steamTop = station.y + station.h / 2 - 28 + Math.sin(pulseTime * 1.6 + i) * 4;
          ctx.beginPath();
          ctx.moveTo(baseX, station.y + station.h / 2 - 4);
          ctx.bezierCurveTo(baseX - 6, station.y + station.h / 2 - 16, baseX + 8, steamTop + 8, baseX, steamTop);
          ctx.stroke();
        }
      }
    }

    if (station.serveFlashTimer > 0) {
      const ratio = station.serveFlashTimer / 850;
      ctx.fillStyle = `rgba(255, 244, 196, ${ratio * 0.26})`;
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2, station.w * (0.36 + (1 - ratio) * 0.18), station.h * (0.3 + (1 - ratio) * 0.12), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(245, 200, 66, ${ratio * 0.75})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2, station.w * (0.25 + (1 - ratio) * 0.26), station.h * (0.18 + (1 - ratio) * 0.18), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(33, 22, 12, ${ratio * 0.92})`;
      ctx.beginPath();
      ctx.roundRect(station.x + station.w / 2 - 28, station.y + 8, 56, 24, 10);
      ctx.fill();
      ctx.strokeStyle = `rgba(245, 200, 66, ${ratio * 0.9})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = `rgba(255, 239, 196, ${ratio})`;
      ctx.font = "bold 14px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(station.serveBadgeText || "SERVIS", station.x + station.w / 2, station.y + 24);
    }

    if (station.satisfactionTimer > 0) {
      const ratio = station.satisfactionTimer / 1400;
      ctx.fillStyle = `rgba(112, 224, 146, ${ratio * 0.18})`;
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2, station.w * (0.42 + (1 - ratio) * 0.12), station.h * (0.34 + (1 - ratio) * 0.08), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(170, 250, 192, ${ratio * 0.55})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(station.x + station.w / 2, station.y + station.h / 2, station.w * 0.3, station.h * 0.22, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (["prepTable", "diningTable", "fridge"].includes(station.type)) {
      ctx.fillStyle = "#eadcc0";
      ctx.font = "11px Georgia";
      ctx.textAlign = "center";
      const label = station.type === "diningTable" ? `🪑 ${station.label}` : station.label;
      ctx.fillText(label, station.x + station.w / 2, station.y + station.h - 8);
    }

    ctx.restore();
  }

  drawPlayer(ctx, player) {
    if (player.upgradeFlash) {
      const progress = Math.max(0, player.upgradeFlash.timer / player.upgradeFlash.duration);
      const pulse = 1 + (1 - progress) * 0.25;
      ctx.save();
      ctx.globalAlpha = 0.24 + progress * 0.18;
      ctx.fillStyle = player.upgradeFlash.color;
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius * 2.2 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = player.upgradeFlash.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius * 1.55 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const chef = this.getAsset(Math.cos(player.facing) >= 0 ? "chefRight" : "chefLeft");
    const size = player.radius * 2.4;

    if (!this.drawImageSafe(ctx, chef, player.x - size / 2, player.y - size / 2, size, size)) {
      player.draw(ctx);
      return;
    }

    ctx.save();

    if (player.heldItem) {
      const heldAsset = this.getAsset(ITEM_ASSET[player.heldItem.key]);
      const heldSize = player.radius * (player.heldItem.state === "raw" ? 2.25 : 1.85);
      if (!this.drawImageSafe(ctx, heldAsset, player.x - heldSize / 2, player.y - player.radius - heldSize - 2, heldSize, heldSize)) {
        ctx.font = player.heldItem.state === "raw" ? "34px serif" : "28px serif";
        ctx.textAlign = "center";
        ctx.fillText(player.heldItem.icon || "🍽", player.x, player.y - (player.heldItem.state === "raw" ? 36 : 30));
      }
    }

    ctx.restore();

    if (player.upgradeFlash) {
      const progress = Math.max(0, player.upgradeFlash.timer / player.upgradeFlash.duration);
      ctx.save();
      ctx.globalAlpha = Math.min(1, progress + 0.15);
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff0c1";
      ctx.font = "bold 18px Georgia";
      ctx.fillText(`${player.upgradeFlash.icon} ${player.upgradeFlash.label}`, player.x, player.y - player.radius - 34 - (1 - progress) * 18);
      ctx.fillStyle = player.upgradeFlash.color;
      ctx.font = "14px Georgia";
      ctx.fillText(player.upgradeFlash.detail, player.x, player.y - player.radius - 14 - (1 - progress) * 16);
      ctx.restore();
    }
  }

  drawHUD(game) {
    this.hud.score.innerHTML = `<span class="hud-icon">🏆</span><strong>${game.score}</strong>`;
    this.hud.combo.textContent =
      game.comboCount > 1 ? `KOMBO x${game.comboMultiplier.toFixed(2)} (${game.comboCount})` : "";

    const sec = Math.max(0, Math.ceil(game.mainTimer / 1000));
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    this.hud.timer.innerHTML = `<strong>${mm}:${ss}</strong>`;
    this.hud.timer.style.color = sec < 30 ? "#ff5a3f" : "#e8c030";

    const phaseLeft = Math.max(0, Math.ceil((game.phaseDuration - game.phaseTimer) / 1000));
    const phaseCfg = this.config.cycle.phases[game.dayPhase] || this.config.cycle.phases.iftar;
    this.hud.cycle.textContent = `${phaseCfg.label} • ${phaseLeft}s`;
    this.hud.cycle.style.color = phaseCfg.hudColor;
    if (this.hud.runStats) {
      this.hud.runStats.innerHTML = `
        <div class="stat-row"><span>Seviye</span><strong>${game.level}</strong></div>
        <div class="stat-row"><span>Teslimat</span><strong>${game.completedOrders}/${game.getCurrentLevelTarget()}</strong></div>
        <div class="stat-row"><span>Hurma</span><strong>${game.hurma}</strong></div>
      `;
    }

    const ordersHtml = game.orderManager.activeOrders
      .map((order) => {
        const leftRatio = Math.max(0, 1 - order.elapsed / order.timeLimit);
        const width = Math.round(leftRatio * 100);
        const color = game.orderManager.getUrgencyColor(order);
        return `
          <div class="order-card">
            <div class="order-head">
              <div class="order-title">${order.recipe.icon} ${order.recipe.name}</div>
              <div class="order-meta">${order.tableId?.replace("table-", "Masa ")} • +${order.recipe.points}</div>
            </div>
            <div class="order-bar-wrap">
              <div class="order-bar" style="width:${width}%;background:${color};"></div>
            </div>
          </div>
        `;
      })
      .join("");

    this.hud.orders.innerHTML = ordersHtml;

    if (this.hud.controls) {
      this.hud.controls.textContent =
        game.state === "playing"
          ? "WASD / yön tuşları ile hareket et • E veya Boşluk ile etkileşime geç • Escape ile duraklat"
          : "Enter veya buton ile başlat • R ile yeniden başlat • Tab ile menüyü aç";
    }

    if (this.hud.hurma) this.hud.hurma.textContent = String(game.progress.totalHurma);
    if (this.hud.highScore) this.hud.highScore.textContent = String(game.progress.highScore);
    if (this.hud.bestCombo) this.hud.bestCombo.textContent = `x${game.progress.bestCombo}`;
    if (this.hud.soundButton) {
      this.hud.soundButton.textContent = game.progress.settings.soundEnabled ? "SES: AÇIK" : "SES: KAPALI";
    }
    if (this.hud.animationsButton) {
      this.hud.animationsButton.textContent = game.progress.settings.animationsEnabled ? "ANİMASYON: AÇIK" : "ANİMASYON: KAPALI";
    }
    if (this.hud.hintsButton) {
      this.hud.hintsButton.textContent = game.progress.settings.showHints ? "YARDIM METİNLERİ: AÇIK" : "YARDIM METİNLERİ: KAPALI";
    }
    if (this.hud.pauseButton) {
      const canPause = game.state === "playing" || game.state === "paused";
      this.hud.pauseButton.disabled = !canPause;
      this.hud.pauseButton.textContent = canPause ? (game.state === "paused" ? "DEVAM ET" : "DURAKLAT") : "OYUNU BAŞLAT";
    }
    if (this.hud.upgrades) {
      const markup = game
        .getUpgradeCatalog()
        .map((upgrade) => {
          const current = upgrade.level;
          const canAfford = upgrade.nextCost !== null && game.progress.totalHurma >= upgrade.nextCost;
          const disabled = upgrade.isMaxed;
          return `
            <article class="upgrade-card ${upgrade.isMaxed ? "maxed" : ""}">
              <div class="upgrade-head">
                <h3><span class="upgrade-icon">${upgrade.icon || "⬆"}</span>${upgrade.name}</h3>
                <span>Sv.${current}/${upgrade.maxLevel}</span>
              </div>
              <p>${upgrade.description}</p>
              <p class="upgrade-effect">${upgrade.isMaxed ? "Tum etkiler acik" : upgrade.nextBonusText}</p>
              <p>${upgrade.isMaxed ? "Maksimum seviyeye ulaştı" : canAfford ? "Hazır: hemen uygulanır" : `${upgrade.nextCost - game.progress.totalHurma} hurma daha gerekli`}</p>
              <button type="button" data-upgrade-id="${upgrade.id}" ${disabled ? "disabled" : ""}>
                ${upgrade.isMaxed ? "Tamamlandı" : `${upgrade.nextCost} hurma ile geliştir`}
              </button>
            </article>
          `;
        })
        .join("");
      if (markup !== this.upgradeMarkup) {
        this.hud.upgrades.innerHTML = markup;
        this.upgradeMarkup = markup;
      }
    }

    if (this.hud.status) {
      const status = game.getStatusText();
      if (status) {
        this.hud.status.innerHTML = `
          <div class="status-card">
            <div class="status-kicker">İftar Vakti</div>
            <h2>${status.title}</h2>
            <p>${status.subtitle}</p>
            <span>${status.action}</span>
          </div>
        `;
        this.hud.status.classList.add("visible");
      } else {
        this.hud.status.innerHTML = "";
        this.hud.status.classList.remove("visible");
      }
    }
  }

  draw(game) {
    const { ctx } = this;
    ctx.save();
    if (game.cameraShakeTime > 0) {
      const mag = game.cameraShakeStrength * (game.cameraShakeTime / 140);
      const ox = (Math.random() * 2 - 1) * mag;
      const oy = (Math.random() * 2 - 1) * mag;
      ctx.translate(ox, oy);
    }

    this.drawBackground(ctx, game.dayPhase);

    if (game.state === "menu") {
      this.drawMenu(ctx);
      this.drawHUD(game);
      ctx.restore();
      return;
    }

    for (const station of game.stations) {
      this.drawStation(ctx, station);
    }

    game.player.upgradeFlash = game.upgradeFlash;
    this.drawPlayer(ctx, game.player);
    game.particles.draw(ctx);

    if (game.state === "levelComplete") {
      this.drawOverlay(ctx, `Seviye ${game.level} Tamamlandı`, "Sonraki seviye için Enter'a bas");
    }

    if (game.state === "levelFailed") {
      this.drawOverlay(ctx, `Seviye ${game.level} Basarisiz`, `Hedef: ${game.getCurrentLevelTarget()} | Teslimat: ${game.completedOrders}`);
    }

    if (game.state === "gameOver") {
      this.drawOverlay(ctx, "Süre Doldu", `Skor: ${game.score} | R ile yeniden başla`);
    }

    ctx.restore();
    this.drawHUD(game);
  }

  drawMenu(ctx) {
    this.drawOverlay(ctx, "İftar Vakti", "Başlamak için Enter | Hareket: WASD | Etkileşim: E / Boşluk");
  }

  drawOverlay(ctx, title, subtitle) {
    ctx.save();
    const grad = ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, 0, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2);
    grad.addColorStop(0, "rgba(0,0,0,0.15)");
    grad.addColorStop(1, "rgba(0,0,0,0.72)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#f0d392";
    ctx.textAlign = "center";
    ctx.font = "bold 56px Georgia";
    ctx.fillText(title, this.canvas.width / 2, this.canvas.height / 2 - 24);
    ctx.font = "28px Georgia";
    ctx.fillStyle = "#ffe8bf";
    ctx.fillText(subtitle, this.canvas.width / 2, this.canvas.height / 2 + 26);
    ctx.restore();
  }
}
