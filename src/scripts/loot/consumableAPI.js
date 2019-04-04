import Item from './Item';

/**
 * getConsumableByName
 *
 * @param  {string} name of consumable
 * @returns {object} consumable
 */
function getConsumableByName(name = '') {
  const toughJerky = new Item(
    'Orc Jerky',
    ["not easy on the teeth.", "Restores 290 HP over", "30 seconds though."],
    1,
    25,
    1,
    'consumable',
    1,
    20,
    'leather_scraps',
    'eat'
  )

  const springWater = new Item(
    'Spring Water',
    ["How is it so cold?"],
    1,
    25,
    1,
    'consumable',
    1,
    20,
    'water',
    'drink'
  )

  const consumables = [
    toughJerky,
    springWater
  ]

  return consumables.filter(consumable => consumable.getName() === name)[0];
}

export { getConsumableByName };
