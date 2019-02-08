import { getRandomIntInclusive } from './randomNumberUtilities';
import selectDie from './dice';


/**
 * castHealingSpell
 *
 * @param  {character} target to be healed
 * @param  {object} spell
 * @returns {number} heal value
 */
function castHealingSpell(target = {}, spell = {}) {
  const { name, range, speed, healing } = spell;
  const d6 = selectDie(6);
  const healValue = d6(1) + 1;
  const targetOldHp = target.getHp();
  const targetNewHp = targetOldHp + healValue;
  target.setHp(targetNewHp)
  console.log(`healed ${target.getName()} for ${healValue}`)
  return healValue;
}
/**
 * meleeAttack
 *
 * @param  {character} attacker
 * @param  {character} defender
 * @param  {string} hand left or right
 * @returns {void}
 */
function meleeAttack(attacker = {}, defender = {}, hand = '') {
  if (hitCheck(attacker, defender, 'melee')) {
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
    console.log(`${attacker.getName()} hits ${defender.getName()} for ${totalDmg} melee dmg, ${defender.getName()} went from ${defenderStartingHp}, to ${defenderEndingHp} hps`)
    defender.setHp(defenderEndingHp);
  }
}


/**
 * rangedAttack
 *
 * @param  {character} attacker
 * @param  {character} defender
 * @returns {void}
 */
function rangedAttack(attacker = {}, defender = {}) {
  if (hitCheck(attacker, defender, 'ranged')) {
    const weaponMin = attacker.getRightHand().dmg.min;
    const weaponMax = attacker.getRightHand().dmg.max;
    const weaponDmg = getRandomIntInclusive(weaponMin, weaponMax);
    // add dex bonus (or penalty)
    const dexterityBonus = getStatBonus(attacker, 'dex');
    const totalDmg = (weaponDmg + dexterityBonus > 0) ? weaponDmg + dexterityBonus : 1;
    const defenderStartingHp = defender.getHp();
    const defenderEndingHp = defenderStartingHp - totalDmg;
    console.log(`${attacker.getName()} hits ${defender.getName()} for ${totalDmg} ranged dmg, ${defender.getName()} went from ${defenderStartingHp}, to ${defenderEndingHp} hps`)
    defender.setHp(defenderEndingHp);
  }
}


/**
 * hitCheck - hit check for attacks
 *
 * @param  {character} attacker
 * @param  {character} defender
 * @param  {string} type melee or ranged
 * @returns {bool} result
 */
function hitCheck(attacker = {}, defender = {}, type = "") {
  const d20 = selectDie(20);
  let random = d20(1);
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


/**
 * getStatBonus
 *
 * @param  {character} character
 * @param  {string} stat stat to check
 * @returns {number} bonus based on stat
 */
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
    default:
      return 0;
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

export { meleeAttack, rangedAttack, getStatBonus, castHealingSpell };
