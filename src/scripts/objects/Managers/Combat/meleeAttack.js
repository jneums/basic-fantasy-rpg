import meleeAutoAttackHitTable from '../../../hitTables/meleeAutoAttackHitTable';
import buildCombatObject from './buildCombatObject';


/**
 * meleeAttack
 *
 * @param  {character} target
 * @param  {string} hand left or right
 * @returns {object} damage information
 */
export default function meleeAttack (character ={}, target = {}, hand = '', type = '') {
  // face enemy:
  character.movement.faceTarget(target);
  // show swing animation:
  character.animations.swing();
  // reset timer right away:
  character.timer.resetSwingTimer(hand);
  // get the attack status roll, e.g. 'hit', 'miss', 'crit'...
  const attackStatus = meleeAutoAttackHitTable(character, target, hand);
  // get the range for the random roll, e.g. { min: 2, max: 5 }
  const weaponsDamageRange = character.equipment.getWeaponDmg(hand);
  // random number between the above range
  let weaponDmg = Phaser.Math.Between(weaponsDamageRange.min, weaponsDamageRange.max);
  // offhand attacks hit for half as much:
  if (hand === 'off') weaponDmg /= 2;
  // formula for auto attack damage:
  const amount = weaponDmg + character.stat.APBonus(hand);
  // build combatObject, used to describe the outcome of the swing
  return buildCombatObject(
    character,
    target,
    attackStatus,
    'autoAttack',
    'melee',
    'physical',
    amount,
    hand
  );
}
