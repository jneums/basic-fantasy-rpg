import Item from './Item';

/**
 * getItemByName
 *
 * @param  {string} name of item
 * @returns {object} item
 */
function getItemByName(name = '') {
  return items.filter(item => item.getName() === name)[0];
}

export { getItemByName };


const malachite = new Item(
  'Malachite',
  'Green gem.',
  7,
  null,
  50,
  'crafting',
  1,
  99,
  'item-105',
  6
);


const largeCandle = new Item(
  'Large Candle',
  'Mostly melted.',
  1,
  null,
  null,
  'questItem',
  1,
  20,
  'item-100',
  6
);

const goldDust = new Item(
  'Gold Dust',
  'Not worth anything.',
  230,
  24,
  6,
  'crafting',
  1,
  20,
  'item-105',
  6
);

const items = [ malachite, largeCandle, goldDust ]
