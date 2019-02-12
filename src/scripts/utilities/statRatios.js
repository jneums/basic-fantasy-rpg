import { getStatFromEquipped } from './statUtilities';
import { getWeaponSpeed } from './weaponUtilities';

/**
 * getAPFromStr - combat helper
 *
 * @param  {Character} character attacker
 * @returns {number} class specific
 */
function getAPFromStr(character = {}) {
  const strength = character.getStrength();
  // add str bonus from talents, items, buffs
  const strFromEquipped = getStatFromEquipped(character, 'strength');
  const totalStr = strength + strFromEquipped;
  const strToAPR
    = character.getStrengthToAttackPowerRatio();
  const apFromStr = (strToAPR) ? totalStr / strToAPR : 0;
  return apFromStr;
}

/**
 * getAPFromAgi - combat helper
 *
 * @param  {Character} character attacker
 * @returns {number} class specific
 */
function getAPFromAgi(character = {}) {
  const agility = character.getAgility();
  // add agi bonus from talents, items, buffs
  const agiFromEquipped = getStatFromEquipped(character, 'agility');
  const totalAgi = agility + agiFromEquipped;
  const agiToAPR
    = character.getAgilityToAttackPowerRatio();
  const apFromAgi = (agiToAPR) ? totalAgi / agiToAPR : 0;
  return apFromAgi;
}

/**
 * getAttackPowerBonus
 *
 * @param  {Character} attacker
 * @param  {string} hand for weaponSpeed
 * @returns {number} bonus damage
 */
function getAttackPowerBonus(attacker = {}, hand = '') {
  // base stats
  const apFromStr = getAPFromStr(attacker);
  const apFromAgi = getAPFromAgi(attacker);
  const apFromEquipped = getStatFromEquipped(attacker, 'attackPower');
  // add ap bonus from talents, items, buffs
  const attackPower =  apFromStr + apFromAgi + apFromEquipped;
  // 14ap / 1dps
  const dpsIncrease = attackPower / 14;
  const attackPowerBonus = getWeaponSpeed(attacker, hand) * dpsIncrease;
  return attackPowerBonus;
}

export { getAttackPowerBonus };
