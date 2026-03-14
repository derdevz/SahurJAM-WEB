export const RECIPES = {
  mercimekCorbasi: {
    name: "Mercimek Corbasi",
    icon: "🍲",
    points: 150,
    steps: [
      { action: "pickup", station: "ingredient", item: "lentils" },
      { action: "cook", station: "stove", duration: 5000 },
      { action: "plate", station: "plating" },
      { action: "serve", station: "service" }
    ]
  },
  pide: {
    name: "Pide",
    icon: "🫓",
    points: 120,
    steps: [
      { action: "pickup", station: "ingredient", item: "dough" },
      { action: "bake", station: "oven", duration: 7000, burnAt: 10000 },
      { action: "serve", station: "service" }
    ]
  },
  salata: {
    name: "Salata",
    icon: "🥗",
    points: 100,
    steps: [
      { action: "pickup", station: "ingredient", item: "vegetables" },
      { action: "chop", station: "chopping", duration: 3000 },
      { action: "plate", station: "plating" },
      { action: "serve", station: "service" }
    ]
  }
};

export const ITEM_ICONS = {
  lentils: "🫘",
  dough: "🥖",
  vegetables: "🥬",
  mercimekCorbasi: "🍲",
  pide: "🫓",
  salata: "🥗"
};

export const ITEM_LABELS = {
  lentils: "Mercimek",
  dough: "Hamur",
  vegetables: "Sebze",
  mercimekCorbasi: "Mercimek Corbasi",
  pide: "Pide",
  salata: "Salata"
};
