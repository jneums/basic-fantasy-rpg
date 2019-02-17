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
    name: 'Sword of a million truths',
    agility: 100,
    ilvl: 30000000,
    sellPrice: 13,
    slot: 'mainHand',
    type: 'twoHandedSword',
    speed: 3.2,
    durability: 25,
    repairCost: 20,
    damage: { min: 40, max: 60 },
    disenchant: 'no',
    icon: '',
    droppedBy: 'Scarlet Convert',
    levelRequirement: 1
  },
  {
    name: 'Tarnished Bastard Sword',
    ilvl: 3,
    sellPrice: 13,
    slot: 'mainHand',
    type: 'twoHandedSword',
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
    slot: 'mainHand',
    type: 'oneHandedSword',
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
    slot: 'mainHand',
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
    slot: 'mainHand',
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
  {
    name: 'Fire Wand',
    trading: 'boe',
    ilvl: 12,
    sellPrice: 2.93,
    slot: 'ranged',
    type: 'wand',
    speed: 1.5,
    durability: 30,
    repairCost: 60,
    damage: { min: 1, max: 2 },
    disenchant: 'no',
    icon: 'inv_staff_02',
    droppedBy: '',
    levelRequirement: 7
  },
]
