import { checkSwingTimer, resetSwingTimer } from '../utilities/meleeTimers';
import { checkForTwoHandWeapon, getWeaponDmg } from '../utilities/weaponUtilities';
import meleeAutoAttackHitTable from '../hitTables/meleeAutoAttackHitTable';
import { getRandomIntInclusive } from '../utilities/randomNumberUtilities';
import { getAttackPowerBonus } from '../utilities/statRatios';
import { buildMeleeCombatObject, processCombatObject } from '../utilities/combatObjectUtilities';

/**
 * meleeAttack
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand left or right
 * @returns {object} damage information
 */
function meleeAttack(attacker = {}, target = {}, hand = '', type = '') {
  resetSwingTimer(attacker, hand);
  const weaponsDamageRange = getWeaponDmg(attacker, hand);
  const attackStatus = meleeAutoAttackHitTable(attacker, target, hand);
  const weaponDmg = getRandomIntInclusive(weaponsDamageRange.min, weaponsDamageRange.max);
  // find dmg algorithm
  const damageAmount = weaponDmg + getAttackPowerBonus(attacker, hand);
  const targetStartingHp = target.getHp();
  const combatObject = buildMeleeCombatObject(
    attacker,
    target,
    attackStatus,
    'melee',
    damageAmount,
    hand
  );
  processCombatObject(attacker, target, combatObject);
  return combatObject;
}

/**
 * meleeAutoAttack - checks each hand swing timer,
 * checks to see if two handed weapon is being used.
 *
 * @param  {Character} character attacking
 * @returns {void} wrapper for meleeAtack
 */
function meleeAutoAttack(attacker = {}, target = {}) {
  const canAttackWithMainHand = checkSwingTimer(attacker, 'main');
  if (canAttackWithMainHand) meleeAttack(attacker, target, 'main', 'autoAttack');
  const canAttackWithOffHand = checkSwingTimer(attacker, 'off');
  const usingTwoHandWeapon = checkForTwoHandWeapon(attacker);
  // if (canAttackWithLeftHand && !usingTwoHandWeapon) meleeAttack(attacker, target, 'off', 'autoAttack');
}

export {
  meleeAutoAttack
};
