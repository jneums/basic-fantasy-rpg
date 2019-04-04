import Item from './Item';

/**
 * getItemByName
 *
 * @param  {string} name of item
 * @returns {object} item
 */
function getItemByName(name = '') {
  const emerald = new Item(
    'Emerald',
    'Green gem.',
    7,
    20,
    5,
    'vendor',
    1,
    99,
    'emerald',
    6
  );


  const ichor = new Item(
    'Green Ichor',
    'Large glob of greenish goo.',
    1,
    5,
    1,
    'vendor',
    1,
    20,
    'ichor',
    6
  );

  const ore = new Item(
    'Raw Iron Ore',
    'Not worth much.',
    230,
    24,
    3,
    'vendor',
    1,
    20,
    'ore',
    6
  );

  const items = [ emerald, ichor, ore ]

  return items.find(item => item.getName() === name);
}

export { getItemByName };
