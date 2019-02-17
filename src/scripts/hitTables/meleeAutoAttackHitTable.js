import { selectDie } from '../dice';
import {
  calculateDodgeChance,
  calculateParryChance,
  calculateBlockChance,
  calculateCritChance,
  calculateMissChance
} from '../utilities/calculators';

export default function meleeAutoAttackHitTable(attacker = {}, target = {}, hand ='') {
  const d100 = selectDie(100);
  const random = d100(1) * .01;
  const missChance = calculateMissChance(attacker, target, hand);
  const dodgeChance = missChance + calculateDodgeChance(attacker, target, hand);
  const parryChance = dodgeChance + calculateParryChance(attacker, target, hand);

  // TODO: only players attacking mobs, deals 70% of dmg, default non boss is 5%
  const glancingBlowChance = parryChance + .05;
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
