import moveToMoveTarget from './../player/moveToMoveTarget';

/**
 * NPCAI - npc script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function NPCAI() {
  const meleeRange = 25;
  const AI = function() {
    if (this.combat.isDead()) return;

    // scan for enemies for body pull
    const enemies = this.target.scanForEnemies(75);
    // scan for enemies by threat table (pulled by attack)
    const target = this.threat.highestThreat()
      ? this.threat.highestThreat()
      : this.target.getClosestEnemy(enemies);
    // if no target in range and no aggro, return to spot
    if (!target) {
      if (!this.target.rangeCheck(this.startingCoords, 5)) {
        this.movement.setMoveTargetCoords([this.startingCoords.x, this.startingCoords.y])
        return moveToMoveTarget(this);
      } else {
        this.animations.idle();
        return this.movement.stop();
      }
    } else {
      this.target.setCurrentTarget(target);
    }

    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.movement.stop();
      this.combat.meleeAutoAttack(target);
      this.animations.combat();
    } else {
      // change this to total moveSpeed
      const moveModifier = this.buffs.statBonus('moveSpeed')
      ? this.buffs.statBonus('moveSpeed')
      : 1;
      const moveSpeed = this.movement.getMovementSpeed() * moveModifier;
      this.movement.setMoveTargetCoords([target.x, target.y]);
      this.animations.run();
      this.scene.physics.moveToObject(this, target, moveSpeed);
    }
  }
  return AI;
}
