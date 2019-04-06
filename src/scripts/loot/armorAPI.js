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
    3,
    'ring',
    'cloth',
    55,
    44,
    'ring_01'

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
        stat: 'crit',
        val: 3
      }
    },
    1,
    13,
    4,
    'chest',
    'mail',
    55,
    44,
    'mail_chest'
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
    'leather'
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
    'mail_boots'
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
    'brown_cloak'
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
    'leather'
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
    'shoes'
  )



  const apprenticesRobe = new Armor(
    "Apprentice's Robe",
    "Fits like a sack.",
    2,
    {
      main: {
        stat: 'intellect',
        val: 2
      },
      secondary: {
        stat: 'spellCrit',
        val: 1
      }
    },
    1,
    13,
    2,
    'chest',
    'cloth',
    55,
    44,
    'white_shirt'
  )

  const apprenticesPants = new Armor(
    "Apprentice's Pants",
    "Shabby and worn.",
    2,
    {
      main: {
        stat: 'intellect',
        val: 2
      },
      secondary: {
        stat: 'spirit',
        val: 1
      }
    },
    1,
    13,
    2,
    'legs',
    'cloth',
    40,
    32,
    'cloth'
  )

  const apprenticesBoots = new Armor(
    "Apprentice's Boots",
    "More like socks.",
    1,
    {
      main: {
        stat: 'intellect',
        val: 2
      },
      secondary: {
        stat: 'spirit',
        val: 1
      }
    },
    1,
    10,
    1,
    'feet',
    'cloth',
    25,
    20,
    'slippers'
  )

  const armor = [
    ringOfFury,
    recruitsVest,
    recruitsPants,
    recruitsBoots,
    footpadsVest,
    footpadsPants,
    footpadsShoes,
    apprenticesRobe,
    apprenticesPants,
    apprenticesBoots
  ]


  return armor.find(armor => armor.getName() === name);
}

export { getArmorByName };
