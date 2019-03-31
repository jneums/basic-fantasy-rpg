import CONST from '../objects/Managers/Const';

/**
 * standGuard - idle state, awaiting player input
 * will attack if in melee range.
 *
 * @param  {type} character = {} description
 * @returns {bool} attacking or not
 */
export default function standGuard(character = {}) {
  const target = character.target.currentTarget();
  if (target) {
    const inRange = character.target.rangeCheck(target, CONST.MELEE_RANGE);
    const targetIsEnemy = (character.team() !== target.team());
    if (inRange && targetIsEnemy && !target.combat.isDead()) {
      if (character.combat.autoAttack()) {
        character.combat.meleeAutoAttack(target);
        return true;
      }
    };
    return false;
  }
}
