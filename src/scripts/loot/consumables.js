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
    icon: 'item-97',
    color: 'brown',
    levelRequirement: 1,
    action: 'eat'
  },
  {
    name: 'Spring Water',
    ilvl: 1,
    cost: 25,
    sellPrice: 1,
    type: 'consumable',
    quantity: 1,
    maxStack: 20,
    icon: 'item-88',
    color: 'brown',
    levelRequirement: 5,
    action: 'drink'
  },
  {
    name: 'Conjured Water',
    ilvl: 1,
    cost: undefined,
    sellPrice: undefined,
    type: 'consumable',
    quantity: 2,
    maxStack: 20,
    icon: 'item-87',
    color: 'brown',
    levelRequirement: 5,
    action: 'drink'
  },
  {
    name: 'Conjured Food',
    ilvl: 1,
    cost: undefined,
    sellPrice: undefined,
    type: 'consumable',
    quantity: 2,
    maxStack: 20,
    icon: 'item-85',
    color: 'brown',
    levelRequirement: 5,
    action: 'eat'
  },
]
