export const RECIPES = {
  mercimekCorbasi: {
    name: "Mercimek Corbasi",
    icon: "🍲",
    unlockLevel: 1,
    points: 150,
    steps: [
      { action: "pickup", station: "fridge", item: "mercimekCorbasi" },
      { action: "heat", station: "oven", duration: 3500 },
      { action: "serve", station: "service" }
    ]
  },
  pide: {
    name: "Pide",
    icon: "🫓",
    unlockLevel: 1,
    points: 120,
    steps: [
      { action: "pickup", station: "fridge", item: "pide" },
      { action: "heat", station: "oven", duration: 2500 },
      { action: "serve", station: "service" }
    ]
  },
  salata: {
    name: "Salata",
    icon: "🥗",
    unlockLevel: 1,
    points: 100,
    steps: [
      { action: "pickup", station: "fridge", item: "salata" },
      { action: "heat", station: "oven", duration: 2200 },
      { action: "serve", station: "service" }
    ]
  },
  nohutYemegi: {
    name: "Nohut Yemegi",
    icon: "🥘",
    unlockLevel: 2,
    points: 165,
    steps: [
      { action: "pickup", station: "fridge", item: "nohutYemegi" },
      { action: "heat", station: "oven", duration: 3200 },
      { action: "serve", station: "service" }
    ]
  },
  baklava: {
    name: "Baklava",
    icon: "🍮",
    unlockLevel: 2,
    points: 175,
    steps: [
      { action: "pickup", station: "fridge", item: "baklava" },
      { action: "heat", station: "oven", duration: 2600 },
      { action: "serve", station: "service" }
    ]
  },
  kebap: {
    name: "Kebap",
    icon: "🍢",
    unlockLevel: 3,
    points: 210,
    steps: [
      { action: "pickup", station: "fridge", item: "kebap" },
      { action: "heat", station: "oven", duration: 3200 },
      { action: "serve", station: "service" }
    ]
  },
  pilav: {
    name: "Pilav",
    icon: "🍚",
    unlockLevel: 4,
    points: 220,
    steps: [
      { action: "pickup", station: "fridge", item: "pilav" },
      { action: "heat", station: "oven", duration: 2400 },
      { action: "serve", station: "service" }
    ]
  }
};

export const ITEM_ICONS = {
  lentils: "🫘",
  dough: "🥖",
  vegetables: "🥬",
  chickpeas: "🫛",
  pastry: "🥮",
  meat: "🥩",
  rice: "🌾",
  mercimekCorbasi: "🍲",
  pide: "🫓",
  salata: "🥗",
  nohutYemegi: "🥘",
  baklava: "🍮",
  kebap: "🍢",
  pilav: "🍚"
};

export const ITEM_LABELS = {
  lentils: "Mercimek",
  dough: "Hamur",
  vegetables: "Sebze",
  chickpeas: "Nohut",
  pastry: "Baklavalik Hamur",
  meat: "Et",
  rice: "Pirinç",
  mercimekCorbasi: "Mercimek Corbasi",
  pide: "Pide",
  salata: "Salata",
  nohutYemegi: "Nohut Yemegi",
  baklava: "Baklava",
  kebap: "Kebap",
  pilav: "Pilav"
};
