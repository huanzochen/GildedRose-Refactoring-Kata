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
    describe('Normal Items', () => {
      it('sellIn > 0', () => {
        const gildedRose = new GildedRose([new Item('apple', 10, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"apple"');
        expect(items[0].sellIn).toMatchInlineSnapshot('9');
        expect(items[0].quality).toMatchInlineSnapshot('0');
      });

      it('sellIn 0', () => {
        const gildedRose = new GildedRose([new Item('apple', 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"apple"');
        expect(items[0].sellIn).toMatchInlineSnapshot('-1');
        expect(items[0].quality).toMatchInlineSnapshot('0');
      });

      it('Quality >= 99', () => {
        const gildedRose = new GildedRose([new Item('apple', 10, 99)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"apple"');
        expect(items[0].sellIn).toMatchInlineSnapshot('9');
        expect(items[0].quality).toMatchInlineSnapshot('98');
      });

      it('Quality in 50', () => {
        const gildedRose = new GildedRose([new Item('apple', 10, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot('"apple"');
        expect(items[0].sellIn).toMatchInlineSnapshot('9');
        expect(items[0].quality).toMatchInlineSnapshot('49');
      });
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

    describe('Sulfuras', () => {
      it('Never expires && Quality lock in 80', () => {
        const gildedRose = new GildedRose([
          new Item('Sulfuras, Hand of Ragnaros', 10, 80),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toMatchInlineSnapshot(
          '"Sulfuras, Hand of Ragnaros"',
        );
        expect(items[0].sellIn).toMatchInlineSnapshot('10');
        expect(items[0].quality).toMatchInlineSnapshot('80');
      });
    });
  });
});
