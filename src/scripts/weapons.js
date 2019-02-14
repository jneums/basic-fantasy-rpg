

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
    name: 'Tarnished Bastard Sword',
    ilvl: 3,
    sellPrice: 13,
    slot: 'two-hand',
    type: 'sword',
    speed: 3.2,
    durability: 25,
    repairCost: 20,
    damage: { min: 4, max: 6 },
    disenchant: 'no',
    icon: '',
    droppedBy: 'Scarlet Convert',
    levelRequirement: 1
  },
  {
    name: 'Short Sword',
    ilvl: 3,
    sellPrice: 10,
    slot: 'one-hand',
    type: 'sword',
    speed: 2.4,
    durability: 18,
    repairCost: 20,
    damage: { min: 2, max: 6 },
    disenchant: 'no',
    icon: '',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: 'Deadman Dagger',
    ilvl: 3,
    sellPrice: 10,
    slot: 'one-hand',
    type: 'dagger',
    speed: 1.4,
    durability: 18,
    repairCost: 20,
    damage: { min: 1, max: 2 },
    disenchant: 'no',
    icon: '',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: 'Crooked Staff',
    ilvl: 3,
    sellPrice: 14,
    slot: 'two-hand',
    type: 'staff',
    speed: 3.3,
    durability: 25,
    repairCost: 20,
    damage: { min: 4, max: 7 },
    disenchant: 'no',
    icon: '',
    droppedBy: '',
    levelRequirement: 1
  },
]
