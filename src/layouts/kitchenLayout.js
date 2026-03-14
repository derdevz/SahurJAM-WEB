export const KITCHEN_LAYOUT = [
  { type: "oven", x: 160, y: 70, w: 90, h: 60, options: { label: "Firin" } },
  { type: "stove", x: 265, y: 70, w: 90, h: 60, options: { label: "Ocak" } },
  { type: "stove", x: 370, y: 70, w: 90, h: 60, options: { label: "Ocak" } },
  { type: "plating", x: 475, y: 70, w: 90, h: 60, options: { label: "Tabak" } },
  { type: "service", x: 580, y: 70, w: 100, h: 60, options: { label: "Servis" } },

  { type: "ingredient", x: 70, y: 150, w: 70, h: 70, options: { label: "Mercimek", ingredientItems: ["lentils"] } },
  { type: "ingredient", x: 70, y: 235, w: 70, h: 70, options: { label: "Hamur", ingredientItems: ["dough"] } },
  {
    type: "ingredient",
    x: 70,
    y: 320,
    w: 70,
    h: 70,
    options: { label: "Sebze", ingredientItems: ["vegetables"] }
  },

  {
    type: "ingredient",
    x: 760,
    y: 150,
    w: 70,
    h: 70,
    options: { label: "Karisik", ingredientItems: ["lentils", "dough", "vegetables"] }
  },
  {
    type: "ingredient",
    x: 760,
    y: 235,
    w: 70,
    h: 70,
    options: { label: "Karisik", ingredientItems: ["lentils", "dough", "vegetables"] }
  },

  { type: "chopping", x: 330, y: 500, w: 100, h: 60, options: { label: "Dograma" } },
  { type: "trash", x: 470, y: 500, w: 100, h: 60, options: { label: "Cop" } }
];
