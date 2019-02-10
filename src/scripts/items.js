

/**
 * getWeaponByName
 *
 * @param  {string} name of weapon
 * @returns {object} weapon
 */
function getWeaponByName(name = '') {
  return weapons.filter(weapon => weapon.name === name)[0];
}

export { getWeaponByName };

const weapons = [
  {
    name: 'quarterstaff',
    price: '2gp',
    size: 'L',
    speed: 3,
    weight: 4,
    type: 'staves',
    die: { sides: 6, quantity: 1, bonus: 0 },
  },
  {
    name: 'great-axe',
    price: '14gp',
    size: 'L',
    speed: 3,
    weight: 15,
    type: 'twoHandedAxes',
    die: { sides: 10, quantity: 1, bonus: 0 },  },
  {
    name: 'dagger',
    price: '2gp',
    size: 'S',
    speed: 1,
    weight: 1,
    type: 'daggers',
    die: { sides: 4, quantity: 1, bonus: 0 },  },
  {
    name: 'hand-axe',
    price: '4gp',
    size: 'S',
    speed: 1,
    weight: 5,
    type: 'oneHandedAxes',
    die: { sides: 6, quantity: 1, bonus: 0 },
  },
  {
    name: 'foam-sword',
    price: '4gp',
    size: 'S',
    speed: 3,
    weight: 5,
    type: 'twoHandedSwords',
    die: { sides: 2, quantity: 1, bonus: 0 },  }
]
