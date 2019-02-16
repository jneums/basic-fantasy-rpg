/**
 * getConsumableByName
 *
 * @param  {string} name of consumable
 * @returns {object} consumable
 */
function getConsumableByName(name = '') {
  return consumables.filter(consumable => consumable.name === name)[0];
}

export { getConsumableByName };

const consumables = [
  {
    name: 'Tough Jerky',
    ilvl: 1,
    cost: 25,
    sellPrice: 1,
    type: 'consumable',
    quantity: 1,
    maxStack: 20,
    icon: '',
    levelRequirement: 1,
    action: 'eat'
  },
  {
    name: 'Refreshing Spring Water',
    ilvl: 1,
    cost: 25,
    sellPrice: 1,
    type: 'consumable',
    quantity: 1,
    maxStack: 20,
    icon: 'inv_drink_07',
    levelRequirement: 5,
    action: 'drink'
  },
]
