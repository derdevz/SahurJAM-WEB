import { RECIPES } from "./recipes.js";
import { GAME_CONFIG } from "./config/gameConfig.js";

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const RECIPE_ENTRIES = Object.entries(RECIPES);

export class OrderManager {
  constructor(onExpire, config = GAME_CONFIG, modifiers = {}) {
    this.config = config;
    this.activeOrders = [];
    this.maxOrders = modifiers.maxOrders || config.orders.maxActive;
    this.orderTimeMultiplier = modifiers.orderTimeMultiplier || 1;
    this.spawnRateMultiplier = modifiers.spawnRateMultiplier || 1;
    this.nextId = 1;
    this.spawnTimer = 0;
    this.spawnCooldown = 0;
    this.onExpire = onExpire;

    this.spawnMin = 15000;
    this.spawnMax = 20000;
    this.phaseTipMultiplier = 2.0;
    this.currentPhase = config.cycle.initialPhase;
    this.diningTableIds = modifiers.diningTableIds || [];
    this.level = modifiers.level || 1;
    this.baseOrderTimeLimit = modifiers.baseOrderTimeLimit || config.orders.timeLimitMs;

    this.setCyclePhase(this.currentPhase);
    this.spawnOrder();
    this.resetSpawnCooldown();
  }

  setDiningTables(tableIds) {
    this.diningTableIds = tableIds;
  }

  setLevel(level) {
    this.level = Math.max(1, level || 1);
  }

  setBaseOrderTimeLimit(timeLimitMs) {
    this.baseOrderTimeLimit = Math.max(4000, Math.round(timeLimitMs || this.config.orders.timeLimitMs));
  }

  getUnlockedRecipeEntries() {
    return RECIPE_ENTRIES.filter(([, recipe]) => (recipe.unlockLevel || 1) <= this.level);
  }

  getUnlockedRecipes() {
    return this.getUnlockedRecipeEntries().map(([key, recipe]) => ({ key, recipe }));
  }

  getAvailableTableId() {
    const usedIds = new Set(this.activeOrders.map((order) => order.tableId).filter(Boolean));
    return this.diningTableIds.find((id) => !usedIds.has(id)) || null;
  }

  resetSpawnCooldown() {
    this.spawnCooldown = rand(this.spawnMin, this.spawnMax);
    this.spawnTimer = 0;
  }

  setCyclePhase(phase) {
    this.currentPhase = phase;
    const phaseConfig = this.config.cycle.phases[phase] || this.config.cycle.phases[this.config.cycle.initialPhase];
    this.spawnMin = Math.max(1500, Math.round(phaseConfig.orders.spawnMinMs * this.spawnRateMultiplier));
    this.spawnMax = Math.max(this.spawnMin + 500, Math.round(phaseConfig.orders.spawnMaxMs * this.spawnRateMultiplier));
    this.phaseTipMultiplier = phaseConfig.orders.tipMultiplier;
  }

  update(delta) {
    this.spawnTimer += delta;
    if (this.activeOrders.length < this.maxOrders && this.spawnTimer >= this.spawnCooldown) {
      this.spawnOrder();
      this.resetSpawnCooldown();
    }

    const expired = [];
    for (const order of this.activeOrders) {
      order.elapsed += delta;
      if (order.elapsed >= order.timeLimit) {
        expired.push(order.id);
      }
    }

    if (expired.length > 0) {
      this.activeOrders = this.activeOrders.filter((o) => !expired.includes(o.id));
      if (this.onExpire) {
        for (let i = 0; i < expired.length; i += 1) {
          this.onExpire(this.config.orders.expirePenalty, this.config.orders.expireMessage);
        }
      }
    }
  }

  spawnOrder() {
    if (this.activeOrders.length >= this.maxOrders) return null;
    const tableId = this.getAvailableTableId();
    if (!tableId) return null;

    const unlockedRecipes = this.getUnlockedRecipeEntries();
    if (unlockedRecipes.length === 0) return null;
    const [key, recipe] = unlockedRecipes[Math.floor(Math.random() * unlockedRecipes.length)];
    const order = {
      id: this.nextId++,
      recipe,
      recipeKey: key,
      tableId,
      timeLimit: Math.round(this.baseOrderTimeLimit * this.orderTimeMultiplier),
      elapsed: 0,
      tipMultiplier: this.phaseTipMultiplier
    };

    this.activeOrders.push(order);
    return order;
  }

  completeOrder(recipeKey, tableId = null) {
    const idx = this.activeOrders.findIndex((o) => {
      if (tableId && o.tableId !== tableId) return false;
      return o.recipeKey === recipeKey;
    });

    if (idx === -1) {
      return { success: false, points: 0, tip: 0, total: 0, order: null };
    }

    const order = this.activeOrders[idx];
    this.activeOrders.splice(idx, 1);

    const base = order.recipe.points;
    const leftRatio = Math.max(0, 1 - order.elapsed / order.timeLimit);
    const tipFactor = 1 + (order.tipMultiplier - 1) * leftRatio;
    const tip = Math.round(base * (tipFactor - 1));
    const total = base + tip;

    return { success: true, points: base, tip, total, order };
  }

  getUrgencyColor(order) {
    const ratio = Math.max(0, 1 - order.elapsed / order.timeLimit);
    if (ratio > 0.6) return "#47c263";
    if (ratio > 0.3) return "#d7b933";
    return "#d9442f";
  }
}
