export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum ItemType {
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  NORMAL = 'Normal Item',
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // backstage pass
  // if (item.sellIn <= 10 && item.sellIn > 5) item.quality = item.quality + 2;
  //   else if (item.sellIn <= 5 && item.sellIn >= 0)
  //     item.quality = item.quality + 3;
  //   else if (item.sellIn < 0) item.quality = 0;
  //   else {
  //     item.quality = item.quality + 1;
  //   }

  updateItemAgedBrie(item: Item) {
    const isExpired = item.sellIn <= 0;
    if (item.quality < 50) {
      item.quality = Math.min(
        isExpired ? item.quality + 2 : item.quality + 1,
        50,
      );
    }

    item.sellIn -= 1;
  }

  updateBackStagePasses(item: Item) {
    if (item.quality <= 50) {
      if (item.sellIn <= 10 && item.sellIn > 5)
        item.quality = Math.min(item.quality + 2, 50);
      else if (item.sellIn <= 5 && item.sellIn > 0)
        item.quality = Math.min(item.quality + 3, 50);
      else if (item.sellIn <= 0) item.quality = item.quality - item.quality;
      else {
        item.quality = Math.min(item.quality + 1, 50);
      }
    }

    if (item.quality > 50) {
      if (item.sellIn <= 0) item.quality = item.quality - item.quality;
    }

    item.sellIn -= 1;
  }

  updateItem(item: Item) {
    if (item.name === ItemType.SULFURAS) return;
    if (item.name === ItemType.AGED_BRIE) {
      this.updateItemAgedBrie(item);
      return;
    }
    if (item.name === ItemType.BACKSTAGE_PASSES) {
      this.updateBackStagePasses(item);
      return;
    }

    if (item.name != ItemType.BACKSTAGE_PASSES) {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == ItemType.BACKSTAGE_PASSES) {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      if (item.name != ItemType.BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    }
  }

  updateQuality() {
    for (const item of this.items) {
      this.updateItem(item);
    }

    return this.items;
  }
}
