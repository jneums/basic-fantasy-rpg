import Item from './Item';

/**
 * getItemByName
 *
 * @param  {string} name of item
 * @returns {object} item
 */
function getItemByName(name = '') {
  const malachite = new Item(
    'Malachite',
    'Green gem.',
    7,
    20,
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
    5,
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

  return items.filter(item => item.getName() === name)[0];
}

export { getItemByName };
