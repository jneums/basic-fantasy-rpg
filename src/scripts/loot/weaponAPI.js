import Weapon from './Weapon';

/**
 * getWeaponByName
 *
 * @param  {string} name of weapon
 * @returns {object} weapon
 */
function getWeaponByName(name = '') {

  const swordOfTruth = new Weapon(
    'Sword of Truth',
    'Like, the best sword in the game!',
    {
      main: {
        stat: 'strength',
        val: 20
      },
      secondary: {
        stat: 'stamina',
        val: 10
      }
    },
    20,
    45,
    12,
    'mainHand',
    'twoHandSword',
    3.2,
    25,
    20,
    { min: 40, max: 60 },
    'item-44'
  )



  const tarnishedSword = new Weapon(
    'Tarnished Sword',
    'Beat up training sword.',
    {
      main: {
        stat: 'strength',
        val: 2
      },
      secondary: {
        stat: 'stamina',
        val: 1
      }
    },
    1,
    1,
    1,
    'mainHand',
    'twoHandSword',
    3.2,
    25,
    20,
    { min: 4, max: 6 },
    'item-44'
  )


  const shortSword = new Weapon(
    'Short Sword',
    'Kind of dull.',
    {
      main: {
        stat: 'strength',
        val: 2
      },
      secondary: {
        stat: 'stamina',
        val: 1
      }
    },
    1,
    1,
    10,
    'mainHand',
    'oneHandedSword',
    2.4,
    18,
    20,
    { min: 2, max: 6 },
    'item-51'
  )

  const deadmanDagger = new Weapon(
    'Deadman Dagger',
    'Found it on a dead body.',
    {
      main: {
        stat: 'strength',
        val: 2
      },
      secondary: {
        stat: 'stamina',
        val: 1
      }
    },
    1,
    10,
    3,
    'mainHand',
    'dagger',
    1.4,
    18,
    20,
    { min: 1, max: 2 },
    'item-47'
  )

  const crookedStaff = new Weapon(
    'Crooked Staff',
    'Looks like a tree branch.',
    {
      main: {
        stat: 'strength',
        val: 2
      },
      secondary: {
        stat: 'stamina',
        val: 1
      }
    },
    1,
    25,
    6,
    'mainHand',
    'staff',
    3.8,
    25,
    20,
    { min: 3, max: 6 },
    'item-59'
  )

  const frostWand = new Weapon(
    'Frost Wand',
    'Icy cold to the touch.',
    {
      main: {
        stat: 'strength',
        val: 2
      },
      secondary: {
        stat: 'stamina',
        val: 1
      }
    },
    1,
    32,
    8,
    'ranged',
    'wand',
    1.5,
    30,
    60,
    { min: 3, max: 9 },
    'item-65'
  )

  const shadowWand = new Weapon(
    'Shadow Wand',
    'It whispers to me...',
    {
      main: {
        stat: 'strength',
        val: 2
      },
      secondary: {
        stat: 'stamina',
        val: 1
      }
    },
    1,
    35,
    6,
    'ranged',
    'wand',
    1.5,
    30,
    60,
    { min: 3, max: 9 },
    'item-63'
  )

  const weapons = [
    swordOfTruth,
    tarnishedSword,
    shortSword,
    deadmanDagger,
    crookedStaff,
    frostWand,
    shadowWand
  ];


  return weapons.filter(weapon => weapon.getName() === name)[0];
}

export { getWeaponByName };
