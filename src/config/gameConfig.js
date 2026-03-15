export const GAME_CONFIG = {
  canvas: {
    baseWidth: 1024,
    baseHeight: 579,
    minWidth: 800,
    minHeight: 520
  },
  player: {
    radius: 26,
    speed: 155,
    interactRange: 40,
    spawnX: 512,
    spawnY: 480
  },
  match: {
    durationMs: 60000,
    levelDurationsMs: [60000, 90000, 120000, 150000, 180000],
    tutorialBonusMs: 7000
  },
  notifications: {
    durationMs: 1600
  },
  cycle: {
    initialPhase: "iftar",
    phaseDurationMs: 30000,
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
    timeLimitRatio: 0.65,
    timeLimitMs: 30000,
    expirePenalty: -30,
    expireMessage: "Siparis kacirildi! -30 puan"
  },
  levels: {
    deliveryTargets: [2, 3, 4, 5, 6],
    spawnRateStep: 0.08,
    orderTimeStep: 0.06,
    maxOrdersStepEvery: 2,
    maxOrdersCap: 4
  },
  progress: {
    storageKey: "ramadan-looper-progress",
    startingHurma: 120
  },
  settings: {
    defaultAnimationsEnabled: true,
    defaultShowHints: true
  },
  economy: {
    hurmaPerOrder: 10
  },
  upgrades: {
    catalog: [
      {
        id: "swiftFeet",
        icon: "👣",
        name: "Hizli Adimlar",
        description: "Asci daha hizli hareket eder.",
        levels: [
          { cost: 45, bonus: { playerSpeedMultiplier: 1.08 } },
          { cost: 110, bonus: { playerSpeedMultiplier: 1.1 } },
          { cost: 210, bonus: { playerSpeedMultiplier: 1.12 } },
          { cost: 340, bonus: { playerSpeedMultiplier: 1.14 } },
          { cost: 480, bonus: { playerSpeedMultiplier: 1.16 } }
        ]
      },
      {
        id: "quickPrep",
        icon: "🔪",
        name: "Hizli Tezgah",
        description: "Pisirme sureleri kisalir.",
        levels: [
          { cost: 55, bonus: { processSpeedMultiplier: 1.1 } },
          { cost: 130, bonus: { processSpeedMultiplier: 1.12 } },
          { cost: 245, bonus: { processSpeedMultiplier: 1.15 } },
          { cost: 380, bonus: { processSpeedMultiplier: 1.18 } },
          { cost: 540, bonus: { processSpeedMultiplier: 1.22 } }
        ]
      },
      {
        id: "patientGuests",
        icon: "🕊️",
        name: "Sabirli Misafirler",
        description: "Siparisler daha gec suresi dolar.",
        levels: [
          { cost: 60, bonus: { orderTimeMultiplier: 1.12 } },
          { cost: 145, bonus: { orderTimeMultiplier: 1.15 } },
          { cost: 270, bonus: { orderTimeMultiplier: 1.18 } },
          { cost: 410, bonus: { orderTimeMultiplier: 1.22 } },
          { cost: 580, bonus: { orderTimeMultiplier: 1.26 } }
        ]
      },
      {
        id: "blessing",
        icon: "✨",
        name: "Bereket Sofrasi",
        description: "Skor ve hurma kazanimi artar.",
        levels: [
          { cost: 70, bonus: { scoreMultiplier: 1.08, hurmaMultiplier: 1.1 } },
          { cost: 165, bonus: { scoreMultiplier: 1.1, hurmaMultiplier: 1.12 } },
          { cost: 300, bonus: { scoreMultiplier: 1.12, hurmaMultiplier: 1.15 } },
          { cost: 455, bonus: { scoreMultiplier: 1.15, hurmaMultiplier: 1.18 } },
          { cost: 640, bonus: { scoreMultiplier: 1.18, hurmaMultiplier: 1.22 } }
        ]
      }
    ]
  },
  ambience: {
    mahyaText: "HOS GELDIN RAMAZAN"
  }
};
