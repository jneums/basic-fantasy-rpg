import Armor from './Armor';

/**
 * getArmorByName
 *
 * @param  {string} name of armor
 * @returns {object} armor
 */
function getArmorByName(name = '') {
  const ringOfFury = new Armor(
    'Ring of Fury',
    'It tingles.',
    30,
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
    13,
    4,
    'ring',
    'cloth',
    55,
    44,
    'item-29'

  )

  const recruitsVest = new Armor(
    "Recruit's Vest",
    "Well used.",
    7,
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
    13,
    4,
    'chest',
    'mail',
    55,
    44,
    'item-04'
  )

  const recruitsPants = new Armor(
    "Recruit's Pants",
    "Not too great.",
    6,
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
    13,
    4,
    'legs',
    'mail',
    40,
    32,
    'item-02'
  )

  const recruitsBoots = new Armor(
    "Recruit's Boots",
    "Stained.",
    5,
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
    9,
    1,
    'feet',
    'mail',
    25,
    40,
    'item-24'
  )

  const footpadsVest = new Armor(
    "Footpad's Vest",
    "What's a footpad...",
    3,
    {
      main: {
        stat: 'strength',
        val: 3
      },
      secondary: {
        stat: 'stamina',
        val: 2
      }
    },
    1,
    13,
    2,
    'chest',
    'leather',
    55,
    44,
    'item-02'
  )

  const footpadsPants = new Armor(
    "Footpad's Pants",
    "Leathery.",
    3,
    {
      main: {
        stat: 'strength',
        val: 3
      },
      secondary: {
        stat: 'stamina',
        val: 2
      }
    },
    1,
    13,
    2,
    'legs',
    'leather',
    40,
    32,
    'item-05'
  )

  const footpadsShoes = new Armor(
    "Footpad's Shoes",
    "Really tight fit.",
    2,
    {
      main: {
        stat: 'strength',
        val: 3
      },
      secondary: {
        stat: 'stamina',
        val: 2
      }
    },
    1,
    9,
    1,
    'feet',
    'leather',
    25,
    20,
    'item-02'
  )

  const apprenticesRobe = new Armor(
    "Apprentice's Robe",
    "Fits like a sack.",
    2,
    {
      main: {
        stat: 'strength',
        val: 3
      },
      secondary: {
        stat: 'stamina',
        val: 2
      }
    },
    1,
    13,
    2,
    'chest',
    'cloth',
    55,
    44,
    'item-05'
  )

  const apprenticesPants = new Armor(
    "Apprentice's Pants",
    "Shabby and worn.",
    2,
    {
      main: {
        stat: 'strength',
        val: 3
      },
      secondary: {
        stat: 'stamina',
        val: 2
      }
    },
    1,
    13,
    2,
    'legs',
    'cloth',
    40,
    32,
    'item-03'
  )

  const apprenticesBoots = new Armor(
    "Apprentice's Boots",
    "More like socks.",
    1,
    {
      main: {
        stat: 'strength',
        val: 3
      },
      secondary: {
        stat: 'stamina',
        val: 2
      }
    },
    1,
    10,
    1,
    'feet',
    'cloth',
    25,
    20,
    'item-01'
  )

  const armor = [
    ringOfFury,
    recruitsVest,
    recruitsPants,
    recruitsBoots,
    footpadsVest,
    footpadsPants,
    footpadsShoes,
  ]


  return armor.filter(armor => armor.getName() === name)[0];
}

export { getArmorByName };
