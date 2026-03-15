export const KITCHEN_LAYOUT = [
  { type: "ramadanCannon", x: 96, y: 372, w: 86, h: 54, options: { label: "Ramazan Topu" } },
  { type: "fridge", x: 34, y: 426, w: 82, h: 126, options: { label: "Raf (Yemek)", ingredientItems: ["mercimekCorbasi", "pide", "salata", "nohutYemegi", "baklava", "kebap", "pilav"] } },
  { type: "fridge", x: 132, y: 426, w: 82, h: 126, options: { label: "Dolap (Yemek)", ingredientItems: ["mercimekCorbasi", "pide", "salata", "nohutYemegi", "baklava", "kebap", "pilav"] } },

  { type: "oven", x: 362, y: 284, w: 84, h: 64, options: { label: "Fırın 1" } },
  { type: "oven", x: 466, y: 284, w: 84, h: 64, options: { label: "Fırın 2" } },

  { type: "diningTable", x: 720, y: 332, w: 112, h: 78, options: { label: "Masa 1", tableId: "table-1" } },
  { type: "diningTable", x: 852, y: 332, w: 112, h: 78, options: { label: "Masa 2", tableId: "table-2" } },
  { type: "diningTable", x: 720, y: 438, w: 112, h: 78, options: { label: "Masa 3", tableId: "table-3" } },
  { type: "diningTable", x: 852, y: 438, w: 112, h: 78, options: { label: "Masa 4", tableId: "table-4" } },

  { type: "trash", x: 936, y: 528, w: 64, h: 48, options: { label: "Çöp" } }
];
