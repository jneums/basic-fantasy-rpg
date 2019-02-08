

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
    name: 'great-axe',
    price: '14gp',
    size: 'L',
    speed: 3,
    weight: 15,
    dmg: { min: 1, max: 10 }
  },
  {
    name: 'dagger',
    price: '2gp',
    size: 'S',
    speed: 1,
    weight: 1,
    dmg: { min: 1, max: 4 }
  },
  {
    name: 'hand-axe',
    price: '4gp',
    size: 'S',
    speed: 1,
    weight: 5,
    dmg: { min: 1, max: 6 }
  },
  {
    name: 'foam-sword',
    price: '4gp',
    size: 'S',
    speed: 3,
    weight: 5,
    dmg: { min: 0, max: 0 }
  }
]
