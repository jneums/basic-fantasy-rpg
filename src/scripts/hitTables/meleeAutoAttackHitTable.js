import {
  calculateDodgeChance,
  calculateParryChance,
  calculateBlockChance,
  calculateCritChance,
  calculateMissChance
} from '../utilities/calculators';


/**
 * meleeAutoAttackHitTable - calculate the status
 * of an attack.
 *
 * @param  {Character} attacker stats to use
 * @param  {Character} target stats to use
 * @param  {string} hand 'main' or 'off'
 * @returns {string} 'miss', 'dodge', 'parry',
 * 'glancing', 'blocked', 'crit', 'crushing', or 'hit'.
 */
export default function meleeAutoAttackHitTable(attacker = {}, target = {}, hand ='') {

  // stack each value on top of each other for switch statement:
  const random = Phaser.Math.Between(0, 10000);
  const missChance = calculateMissChance(attacker, target, hand);
  const dodgeChance = missChance + calculateDodgeChance(attacker, target, hand);
  const parryChance = dodgeChance + calculateParryChance(attacker, target, hand);
  // TODO: only players attacking mobs, deals 70% of dmg, default non boss is 5%
  const glancingBlowChance = parryChance + 50;
  const blockChance = glancingBlowChance + calculateBlockChance(attacker, target, hand);
  const criticalHitChance = blockChance + calculateCritChance(attacker);

  // TODO: only for mobs attacking players
  const crushingBlowChance = criticalHitChance + 0;

  switch(true) {
    case (random < missChance):
      return 'miss';
    case (random < dodgeChance):
      return 'dodge';
    case (random < parryChance):
      return 'parry';
    case (random < glancingBlowChance):
      return 'glancing';
    case (random < blockChance):
      return 'blocked';
    case (random < criticalHitChance):
      return 'crit';
    case (random < crushingBlowChance):
      return 'crushing';
    default:
      return 'hit';
  }
}
