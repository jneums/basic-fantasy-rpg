

/**
 * getArmorByName
 *
 * @param  {string} name of armor
 * @returns {object} armor
 */
function getArmorByName(name = '') {
  return armor.filter(armor => armor.name === name)[0];
}

export { getArmorByName };

const armor = [
  {
    name: "Recruit's Vest",
    ilvl: 1,
    armor: 7,
    cost: 13,
    sellPrice: 2,
    slot: 'chest',
    type: 'mail',
    durability: 55,
    repairCost: 44,
    disenchant: 'no',
    icon: 'inv_shirt_05',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Recruit's Pants",
    ilvl: 1,
    armor: 6,
    cost: 13,
    sellPrice: 2,
    slot: 'legs',
    type: 'mail',
    durability: 40,
    repairCost: 32,
    disenchant: 'no',
    icon: 'inv_pants_02',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Recruit's Boots",
    ilvl: 1,
    armor: 5,
    cost: 9,
    sellPrice: 1,
    slot: 'feet',
    type: 'mail',
    durability: 25,
    repairCost: 20,
    disenchant: 'no',
    icon: 'inv_boots_06',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Footpad's Vest",
    ilvl: 1,
    armor: 3,
    cost: 13,
    sellPrice: 2,
    slot: 'chest',
    type: 'leather',
    durability: 55,
    repairCost: 44,
    disenchant: 'no',
    icon: 'inv_shirt_05',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Footpad's Pants",
    ilvl: 1,
    armor: 3,
    cost: 13,
    sellPrice: 2,
    slot: 'legs',
    type: 'leather',
    durability: 40,
    repairCost: 32,
    disenchant: 'no',
    icon: 'inv_pants_02',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Footpad's Shoes",
    ilvl: 1,
    armor: 2,
    cost: 9,
    sellPrice: 1,
    slot: 'feet',
    type: 'leather',
    durability: 25,
    repairCost: 20,
    disenchant: 'no',
    icon: 'inv_boots_05',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Apprentice's Robe",
    ilvl: 1,
    armor: 2,
    cost: 13,
    sellPrice: 2,
    slot: 'chest',
    type: 'cloth',
    durability: 55,
    repairCost: 44,
    disenchant: 'no',
    icon: 'inv_chest_cloth_23',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Apprentice's Pants",
    ilvl: 1,
    armor: 2,
    cost: 13,
    sellPrice: 2,
    slot: 'legs',
    type: 'cloth',
    durability: 40,
    repairCost: 32,
    disenchant: 'no',
    icon: 'inv_pants_01',
    droppedBy: '',
    levelRequirement: 1
  },
  {
    name: "Apprentice's Boots",
    ilvl: 1,
    armor: 1,
    cost: 10,
    sellPrice: 1,
    slot: 'feet',
    type: 'cloth',
    durability: 25,
    repairCost: 20,
    disenchant: 'no',
    icon: 'inv_boots_09',
    droppedBy: '',
    levelRequirement: 1
  },
]
