/**
 * getItemByName
 *
 * @param  {string} name of item
 * @returns {object} item
 */
function getItemByName(name = '') {
  return items.filter(item => item.name === name)[0];
}

export { getItemByName };

const items = [
  {
    name: 'Gold Dust',
    ilvl: 1,
    cost: undefined,
    sellPrice: undefined,
    type: 'questItem',
    quantity: 1,
    maxStack: 20,
    icon: 'inv_misc_dust_01',
  },
  {
    name: 'Large Candle',
    ilvl: 1,
    cost: undefined,
    sellPrice: undefined,
    type: 'questItem',
    quantity: 1,
    maxStack: 20,
    icon: 'inv_misc_candle_01',
  },
  {
    name: 'Malachite',
    ilvl: 7,
    cost: undefined,
    sellPrice: 50,
    type: 'crafting',
    quantity: 1,
    maxStack: 200,
    icon: 'inv_misc_gem_emerald_03',
  },
]
