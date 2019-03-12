import moveToMoveTarget from '../../../player/moveToMoveTarget';


/**
 * OrcArcherAI - ranged NPC script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function OrcArcherAI() {
  const meleeRange = 25;
  const shootRange = 75;

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
      return this.movement.stop();
    }

    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    const canShoot = this.target.rangeCheck(target, shootRange);

    if (canShoot) {
      this.movement.stop();
      this.animations.combat();
      this.combat.rangedAutoAttack(target);
    } else if (canMelee) {
      this.movement.stop();
      this.animations.combat();
      this.combat.meleeAutoAttack(target);
    } else {
      // change this to total moveSpeed
      const moveModifier = this.buffs.statBonus('moveSpeed')
      ? this.buffs.statBonus('moveSpeed')
      : 1;
      const moveSpeed = this.movement.getMovementSpeed() * moveModifier;
      this.movement.setMoveTargetCoords([target.x, target.y]);
      this.animations.run();
      moveToMoveTarget(this);
    }
  }
  return AI;
}
