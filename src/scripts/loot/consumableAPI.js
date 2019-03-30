import Item from './Item';

/**
 * getConsumableByName
 *
 * @param  {string} name of consumable
 * @returns {object} consumable
 */
function getConsumableByName(name = '') {
  return consumables.filter(consumable => consumable.getName() === name)[0];
}

export { getConsumableByName };


const toughJerky = new Item(
  'Tough Jerky',
  ["not easy on the teeth. It", "does restore 290 HP over", "30 seconds though."],
  1,
  25,
  1,
  'consumable',
  1,
  20,
  'item-97',
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
  'item-88',
  'drink'
)

const consumables = [
  toughJerky,
  springWater
]
