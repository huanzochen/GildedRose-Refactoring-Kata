import { describe, expect, it } from 'vitest';
import {
  GildedRose as Original,
  Item as OriginalItem,
} from './original-gilded-rose';
import { GildedRose, Item } from '@/gilded-rose';

/**
 * 差異測試（differential testing）—— 重構期的地毯式安全網。
 *
 * 原理：original-gilded-rose.ts 是凍結的原版（可執行的規格），
 * 對整個輸入空間逐一比對「重構版 vs 原版」的行為。
 * 手寫測試可能漏案例，這裡不會——覆蓋靠枚舉，不靠記憶力。
 *
 * 注意：用 toEqual（只比欄位值），不能用 toStrictEqual（會比 class 身分）。
 * 生命週期：加入 Conjured（刻意行為變更）時，此網退役或排除 Conjured。
 */

const names = [
  'normal stuff',
  'Aged Brie',
  'Sulfuras, Hand of Ragnaros',
  'Backstage passes to a TAFKAL80ETC concert',
];

describe('差異測試：重構版 vs 原版', () => {
  it('單日更新，全輸入空間行為一致', () => {
    for (const name of names)
      for (let sellIn = -5; sellIn <= 15; sellIn++)
        for (let quality = 0; quality <= 55; quality++) {
          const original = new Original([
            new OriginalItem(name, sellIn, quality),
          ]);
          const current = new GildedRose([new Item(name, sellIn, quality)]);
          original.updateQuality();
          current.updateQuality();
          expect(
            current.items[0],
            `${name} sellIn=${sellIn} q=${quality}`,
          ).toEqual(original.items[0]);
        }
  });

  it('連續 30 天，逐日行為一致', () => {
    for (const name of names) {
      const original = new Original([new OriginalItem(name, 15, 30)]);
      const current = new GildedRose([new Item(name, 15, 30)]);
      for (let day = 1; day <= 30; day++) {
        original.updateQuality();
        current.updateQuality();
        expect(current.items[0], `${name} day=${day}`).toEqual(
          original.items[0],
        );
      }
    }
  });
});
