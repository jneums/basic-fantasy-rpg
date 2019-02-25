/**
 * standGuard - idle state, awaiting player input
 * will attack if in melee range.
 *
 * @param  {type} character = {} description
 * @returns {bool} attacking or not
 */
export default function standGuard(character = {}) {
  const range = 32;
  const target = character.target.currentTarget();
  if (target) {
    const inRange = character.target.rangeCheck(target, range);
    const targetIsEnemy = (character.team() !== target.team());
    if (inRange && targetIsEnemy) {
      if (character.combat.autoAttack()) {
        character.combat.meleeAutoAttack(target);
        return true;
      }
    };
    return false;
  }
}
