import moveToMoveTarget from '../../../player/moveToMoveTarget';

/**
 * MagicUserAI - npc magic user script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function MageAI() {
    const meleeRange = 25;
    const AI = function() {
      if (this.combat.isDead()) return;

      // scan for enemies for body pull
      const enemies = this.target.scanForEnemies(125);
      // scan for enemies by threat table (pulled by attack)
      const target = this.threat.highestThreat()
        ? this.threat.highestThreat()
        : this.target.getClosestEnemy(enemies);
      // if no target in range and no aggro, wait
      if (!target) {
        this.animations.idle();
        return this.movement.stop();
      }
    this.target.setCurrentTarget(target);
    const wandRange = this.target.rangeCheck(target, 175);
    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.movement.stop();
      this.animations.combat();
      this.combat.meleeAutoAttack(target);
    } else if (wandRange) {
      this.ability.wand();
      this.movement.stop();
      this.animations.combat();
    } else {
      moveToMoveTarget(this);
      this.animations.run();
    }
  }
  return AI;
}
