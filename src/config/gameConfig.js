export const GAME_CONFIG = {
  canvas: {
    baseWidth: 900,
    baseHeight: 600,
    minWidth: 800,
    minHeight: 520
  },
  player: {
    radius: 14,
    speed: 130,
    interactRange: 40,
    spawnX: 420,
    spawnY: 350
  },
  match: {
    durationMs: 180000,
    levelCompleteOrders: 8
  },
  notifications: {
    durationMs: 1600
  },
  cycle: {
    initialPhase: "iftar",
    phaseDurationMs: 45000,
    phases: {
      iftar: {
        label: "IFTAR",
        hudColor: "#f0d594",
        notify: "Iftar yogunlugu basladi",
        orders: {
          spawnMinMs: 10000,
          spawnMaxMs: 15000,
          tipMultiplier: 2.3
        }
      },
      sahur: {
        label: "SAHUR",
        hudColor: "#9fc7ff",
        notify: "Sahur dinginligi basladi",
        orders: {
          spawnMinMs: 17000,
          spawnMaxMs: 23000,
          tipMultiplier: 1.8
        }
      }
    }
  },
  orders: {
    maxActive: 3,
    timeLimitMs: 30000,
    expirePenalty: -30,
    expireMessage: "Siparis kacirildi! -30 puan"
  },
  ambience: {
    mahyaText: "HOS GELDIN RAMAZAN"
  }
};
