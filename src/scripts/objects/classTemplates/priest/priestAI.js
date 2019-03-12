import moveToMoveTarget from '../../../player/moveToMoveTarget';

/**
 * MagicUserAI - npc magic user script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PriestAI() {
  const meleeRange = 25;
  const AI = function() {
    if (this.combat.isDead()) return;

    // scan for enemies for body pull
    const enemies = this.target.scanForEnemies(75);
    // scan for enemies by threat table (pulled by attack)
    const target = this.threat.highestThreat()
      ? this.threat.highestThreat()
      : this.target.getClosestEnemy(enemies);
    // if no target in range and no aggro, wait
    if (!target) {
      this.animations.idle();
      return this.setVelocity(0, 0);
    } else {
      this.target.setCurrentTarget(target);
    }

    //
    const wandRange = this.target.rangeCheck(target, 75);
    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      this.combat.meleeAutoAttack(target);
      this.animations.combat();
    } else if (wandRange) {
      this.setVelocity(0, 0);
      this.ability.wand();
      this.animations.combat();
    } else {
      moveToMoveTarget(this);
    }
  }
  return AI;
}
