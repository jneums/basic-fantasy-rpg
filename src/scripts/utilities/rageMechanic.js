import { getWeaponSpeed } from './weaponUtilities';
/**
 * calculateHitFactor - used for rage calculation
 *
 * @param  {object} combatObject info about attack
 * @returns {number} used in rage formula
 */
function calculateHitFactor(combatObject = {}) {
  let hitFactor = 0;
  const hand = combatObject.hand;
  const type = combatObject.type;
  if (hand === 'main') {
    if( type === 'hit') {
      hitFactor = 3.5;
    } else if (type === 'crit') {
      hitFactor = 7;
    }
  } else if (hand === 'off') {
    if (type === 'hit') {
      hitFactor = 1.75;
    } else if (type === 'crit') {
      hitFactor = 3.5;
    }
  }
  return hitFactor;
}

/**
 * processRage - update players rage
 *
 * @param  {Character} character to update rage on
 * @param  {object} combatObject info about attack
 * @param  {string} role attacker or target
 * @returns {void}
 */
export default function processRage(character = {}, combatObject = {}, role = '') {
  let rageGain = 0;
  const oldRage = character.getRage();
  const level = character.getLevel();
  const rageConversion = 0.0091107836 * (level * level) + (3.225598133 * level) + 4.2652911;
  const dmgAmt = combatObject.damageAmount;
  const hand = combatObject.hand;
  const weaponSpeed = (hand === 'main')
    ? getWeaponSpeed(character, 'main')
    : getWeaponSpeed(character, 'off');
  const hitFactor = calculateHitFactor(combatObject);

  if (role === 'attacker') {
    // only for white dmg and 'special' attacks
    rageGain = (15 * dmgAmt)/ (4 * rageConversion ) + ((hitFactor * weaponSpeed) / 2);
    const maxRageGain = (15 * dmgAmt) / rageConversion;
    if (rageGain > maxRageGain) rageGain = maxRageGain;
    character.setRage(rageGain + oldRage);
  } else if (role === 'target') {
    rageGain = (5/2) * (dmgAmt / rageConversion);
    character.setRage(rageGain + oldRage);
  }
}
