import getRandomIntInclusive from './getRandomIntInclusive';
// takes two characters and calculates melee attack,
// adjusting the defenders hp if succesful.
function meleeAttack(attacker = {}, defender = {}, hand = '') {
  if (didHit(attacker, defender, 'melee')) {
    const weaponMin = hand === 'left'
      ? attacker.getLeftHand().dmg.min
      : attacker.getRightHand().dmg.min;
    const weaponMax = hand === 'left'
      ? attacker.getLeftHand().dmg.max
      : attacker.getRightHand().dmg.max;
    const weaponDmg = getRandomIntInclusive(weaponMin, weaponMax);
    // get attack bonus from strength
    const strengthBonus = getStatBonus(attacker, 'str');
    const totalDmg = (weaponDmg + strengthBonus > 0) ? weaponDmg + strengthBonus : 1;
    const defenderStartingHp = defender.getHp();
    const defenderEndingHp = defenderStartingHp - totalDmg;
    console.log(`${attacker.getName()} hits ${defender.getName()} for ${totalDmg}, ${defender.getName()} went from ${defenderStartingHp}, to ${defenderEndingHp} hps`)
    defender.setHp(defenderEndingHp);
  }
}

// takes two characters and calculates ranged attack,
// adjusting the defenders hp if succesful.
function rangedAttack(attacker = {}, defender = {}, hand = '') {
  if (didHit(attacker, defender, 'ranged')) {
    const weaponMin = hand === 'left'
      ? attacker.getLeftHand().dmg.min
      : attacker.getRightHand().dmg.min;
    const weaponMax = hand === 'left'
      ? attacker.getLeftHand().dmg.max
      : attacker.getRightHand().dmg.max;
    const weaponDmg = getRandomIntInclusive(weaponMin, weaponMax);
    // add dex bonus (or penalty)
    const dexterityBonus = getStatBonus(attacker, 'dex');
    const totalDmg = (weaponDmg + dexterityBonus > 0) ? weaponDmg + dexterityBonus : 1;
    const defenderStartingHp = defender.getHp();
    const defenderEndingHp = defenderStartingHp - totalDmg;
    console.log(`${attacker.getName()} hits ${defender.getName()} for ${totalDmg}, ${defender.getName()} went from ${defenderStartingHp}, to ${defenderEndingHp} hps`)
    defender.setHp(defenderEndingHp);
  }
}

// checks to see if the attack was succesful
// if it was, 'true' is returned and the attack
// function will finish.
function didHit(attacker = {}, defender = {}, type = "") {
  let random = getRandomIntInclusive(1, 20);
  let attackBonus = attacker.getAb();
  let attackerStr = attacker.getStr();
  let attackerDex = attacker.getDex();
  let defendersAc = defender.getAc();
  if (type === 'melee') {
    return (random + attackBonus + attackerStr >= defendersAc);
  }
  if (type === 'ranged') {
    return (random + attackBonus + attackerDex >= defendersAc);
  }
}

// calculate strength bonus, using characters str
function getStatBonus(character = {}, stat = '') {
  let statValue = 0;
  switch(stat) {
    case 'str':
      statValue = character.getStr();
      break;
    case 'dex':
      statValue = character.getDex();
      break;
    case 'con':
      statValue = character.getCon();
      break;
    case 'int':
      statValue = character.getInt();
      break;
    case 'wis':
      statValue = character.getWis();
      break;
    case 'cha':
      statValue = character.getCha();
      break;
  }
  switch(true) {
    case (statValue > 17):
      return 3;
    case (statValue > 15):
      return 2;
    case (statValue > 12):
      return 1;
    case (statValue > 8):
      return 0;
    case (statValue > 5):
      return -1;
    case (statValue > 3):
      return -2;
    default:
      return -3;
  }
}

// calculate dexterity bonus, using characters dex
function getDexterityBonus(character = {}) {
  let dex = character.getStr();
  switch(true) {
    case (str > 17):
      return 3;
    case (str > 15):
      return 2;
    case (str > 12):
      return 1;
    case (str > 8):
      return 0;
    case (str > 5):
      return -1;
    case (str > 3):
      return -2;
    default:
      return -3;
  }
}

export { meleeAttack };
