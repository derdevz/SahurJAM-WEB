export class AssetManager {
  constructor() {
    this.images = new Map();
    this.loaded = false;

    this.manifest = {
      floorTile: "assets/environment/floor-tile.png",
      fener: "assets/decor/fener.svg",
      chefLeft: "assets/characters/chef-left.gif",
      chefRight: "assets/characters/chef-right.gif",
      stationIngredient: "assets/stations/ingredient.png",
      stationStove: "assets/stations/stove.png",
      stationOven: "assets/stations/oven.png",
      stationChopping: "assets/stations/chopping.png",
      stationPlating: "assets/stations/plating.png",
      stationService: "assets/stations/service.png",
      stationTrash: "assets/stations/trash.png",
      itemLentils: "assets/items/lentils.png",
      itemDough: "assets/items/dough.png",
      itemVegetables: "assets/items/vegetables.png",
      itemChickpeas: "assets/items/chickpeas.svg",
      itemPastry: "assets/items/pastry.svg",
      itemMeat: "assets/items/meat.svg",
      itemRice: "assets/items/rice.svg",
      itemMercimekCorbasi: "assets/items/mercimekCorbasi.png",
      itemPide: "assets/items/pide.png",
      itemSalata: "assets/items/salata.png",
      itemNohutYemegi: "assets/items/nohutYemegi.svg",
      itemBaklava: "assets/items/baklava.svg",
      itemKebap: "assets/items/kebap.svg",
      itemPilav: "assets/items/pilav.svg",
      roomBackground: "assets/room_pixel.jpg"
    };
  }

  loadImage(path) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = path;
    });
  }

  async loadAll() {
    const entries = Object.entries(this.manifest);
    await Promise.all(
      entries.map(async ([key, path]) => {
        try {
          const img = await this.loadImage(path);
          this.images.set(key, img);
        } catch {
          this.images.set(key, null);
        }
      })
    );
    this.loaded = true;
  }

  get(key) {
    return this.images.get(key) || null;
  }
}
