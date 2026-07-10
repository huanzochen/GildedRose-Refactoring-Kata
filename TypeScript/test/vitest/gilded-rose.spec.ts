import { Item, GildedRose } from '@/gilded-rose';
import { describe, expect, it } from 'vitest';

describe('Gilded Rose', () => {
  describe('Item Name', () => {
    it('foo', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toMatchInlineSnapshot('"foo"');
    });
    it('apple', () => {
      const gildedRose = new GildedRose([new Item('apple', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toMatchInlineSnapshot('"apple"');
    });
  });

  describe('updateQuality', () => {
    it('when sellIn > 0', () => {
      const gildedRose = new GildedRose([new Item('apple', 10, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toMatchInlineSnapshot('"apple"');
      expect(items[0].sellIn).toMatchInlineSnapshot('9');
      expect(items[0].quality).toMatchInlineSnapshot('0');
    });

    it('when sellIn 0', () => {
      const gildedRose = new GildedRose([new Item('apple', 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toMatchInlineSnapshot('"apple"');
      expect(items[0].sellIn).toMatchInlineSnapshot('-1');
      expect(items[0].quality).toMatchInlineSnapshot('0');
    });

    describe('Aged Brie', () => {
      it('Aged Brie pass 1 day', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"Aged Brie"');
        expect(items[0].sellIn).toMatchInlineSnapshot('9');
        expect(items[0].quality).toMatchInlineSnapshot('2');
      });

      it('Aged Brie pass 2 day', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 1)]);
        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"Aged Brie"');
        expect(items[0].sellIn).toMatchInlineSnapshot('8');
        expect(items[0].quality).toMatchInlineSnapshot('3');
      });

      it('Aged Brie sellIn 0', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"Aged Brie"');
        expect(items[0].sellIn).toMatchInlineSnapshot('-1');
        expect(items[0].quality).toMatchInlineSnapshot('3');
      });
    });
  });
});
