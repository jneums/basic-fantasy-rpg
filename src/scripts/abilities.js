import { getRandomIntInclusive } from './randomNumberUtilities';
import selectDie from './dice';
import { resetSpellTimer, checkSwingTimer, checkForTwoHandWeapon } from './utilities';
import meleeAutoAttackHitTable from './hitTables';
/**
 * castHealingSpell
 *
 * @param  {character} character casting heal
 * @param  {character} target to be healed
 * @param  {object} spell
 * @returns {number} heal value
 */
function castHealingSpell(character = {}, target = {}, spell = {}) {
  const { name, range, speed, die } = spell;
  const healValue = determineDieValue(die);
  const targetOldHp = target.getHp();
  const targetNewHp = targetOldHp + healValue;
  target.setHp(targetNewHp)
  const newTimers = resetSpellTimer(character, name);
  return healValue;
}


/**
 * determineDieValue - parse die info into number
 *
 * @param  {object} dieInfo from object
 * @returns {number} value
 */
function determineDieValue(dieInfo = {}) {
  const die = selectDie(dieInfo.sides);
  const value = die(dieInfo.quantity) + dieInfo.bonus;
  return value;
}


/**
 * castDamageSpell
 *
 * @param  {character} character casting spell
 * @param  {character} target of spell
 * @param  {object} spell causing damage
 * @returns {number} damage value
 */
function castDamageSpell(character = {}, target = {}, spell = {}) {
  const { name, range, speed, die } = spell;
  const damageValue = determineDieValue(die);
  const targetOldHp = target.getHp();
  const targetNewHp = targetOldHp - damageValue;
  target.setHp(targetNewHp);
  const newTimers = resetSpellTimer(character, name);
  return damageValue;
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
  let dieInfo = {};
  if (hand === 'right') {
    attacker.setSwingTimerRightHand(0);
    dieInfo = attacker.getRightHand().die;
  }
  if (hand === 'left') {
    attacker.setSwingTimerLeftHand(0);
    dieInfo = attacker.getLeftHand().die;
  }
  const attackStatus = meleeAutoAttackHitTable(attacker, defender, 'right');
  // this is for a right handed attack
  const weaponDmg = determineDieValue(dieInfo);
  // get attack bonus from strength
  const strengthBonus = getStatBonus(attacker, 'str');
  const totalDmg = (weaponDmg + strengthBonus > 0) ? weaponDmg + strengthBonus : 1;
  const defenderStartingHp = defender.getHp();
  if (attackStatus === 'hit') {
    defender.setHp(defenderStartingHp - totalDmg);
  } else if (attackStatus === 'crit') {
    defender.setHp(defenderStartingHp - (totalDmg * 2))
  }
  console.log(`${attacker.getName()} does: ${totalDmg} with ${hand} hand`);
}


/**
 * meleeAutoAttack
 *
 * @param  {character} character attacking
 * @returns {void} wrapper for meleeAtack
 */
function meleeAutoAttack(character = {}, target = {}) {
  const canAttackWithRightHand = checkSwingTimer(character, 'right');
  if (canAttackWithRightHand) meleeAttack(character, target, 'right');
  const canAttackWithLeftHand = checkSwingTimer(character, 'left');
  const usingTwoHandWeapon = checkForTwoHandWeapon(character);
  if (canAttackWithLeftHand && !usingTwoHandWeapon) meleeAttack(character, target, 'left');
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
    const dieInfo = attacker.getLeftHand().die;
    const weaponDmg = determineDieValue(dieInfo);
    // add dex bonus (or penalty)
    const dexterityBonus = getStatBonus(attacker, 'dex');
    const totalDmg = (weaponDmg + dexterityBonus > 0) ? weaponDmg + dexterityBonus : 1;
    const defenderStartingHp = defender.getHp();
    const defenderEndingHp = defenderStartingHp - totalDmg;
    attacker.setSwingTimerRightHand(0);

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
  let attackerStr = attacker.getStrength();
  let attackerDex = attacker.getAgility();
  let defendersAc = defender.getArmorRating();
  if (type === 'melee') {
    return (random + attackerStr >= defendersAc);
  }
  if (type === 'ranged') {
    return (random + attackerDex >= defendersAc);
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
    case 'strength':
      statValue = character.getStrength();
      break;
    case 'agility':
      statValue = character.getAgility();
      break;
    case 'intellect':
      statValue = character.getIntellect();
      break;
    case 'stamina':
      statValue = character.getStamina();
      break;
    case 'spirit':
      statValue = character.getSpirit();
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

export {
  meleeAttack,
  rangedAttack,
  getStatBonus,
  castHealingSpell,
  castDamageSpell,
  meleeAutoAttack
};
