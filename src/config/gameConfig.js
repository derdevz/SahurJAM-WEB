export const GAME_CONFIG = {
  canvas: {
    baseWidth: 1024,
    baseHeight: 579,
    minWidth: 800,
    minHeight: 520
  },
  player: {
    radius: 26,
    speed: 130,
    interactRange: 40,
    spawnX: 512,
    spawnY: 480
  },
  match: {
    durationMs: 60000
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
    storageKey: "iftar-vakti-progress",
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
          { cost: 20, bonus: { playerSpeedMultiplier: 1.08 } },
          { cost: 55, bonus: { playerSpeedMultiplier: 1.1 } },
          { cost: 110, bonus: { playerSpeedMultiplier: 1.12 } }
        ]
      },
      {
        id: "quickPrep",
        icon: "🔪",
        name: "Hizli Tezgah",
        description: "Pisirme ve dograma sureleri kisalir.",
        levels: [
          { cost: 25, bonus: { processSpeedMultiplier: 1.1 } },
          { cost: 65, bonus: { processSpeedMultiplier: 1.12 } },
          { cost: 130, bonus: { processSpeedMultiplier: 1.15 } }
        ]
      },
      {
        id: "patientGuests",
        icon: "🕊️",
        name: "Sabirli Misafirler",
        description: "Siparisler daha gec suresi dolar.",
        levels: [
          { cost: 30, bonus: { orderTimeMultiplier: 1.12 } },
          { cost: 75, bonus: { orderTimeMultiplier: 1.15 } },
          { cost: 145, bonus: { orderTimeMultiplier: 1.18 } }
        ]
      },
      {
        id: "blessing",
        icon: "✨",
        name: "Bereket Sofrasi",
        description: "Skor ve hurma kazanimi artar.",
        levels: [
          { cost: 35, bonus: { scoreMultiplier: 1.08, hurmaMultiplier: 1.1 } },
          { cost: 85, bonus: { scoreMultiplier: 1.1, hurmaMultiplier: 1.12 } },
          { cost: 160, bonus: { scoreMultiplier: 1.12, hurmaMultiplier: 1.15 } }
        ]
      }
    ]
  },
  ambience: {
    mahyaText: "HOS GELDIN RAMAZAN"
  }
};
