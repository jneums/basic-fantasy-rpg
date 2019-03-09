/**
 * barbarianAI - barbarian script, used for
 * non player controlled barbarian characters.
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function barbarianAI() {
  const meleeRange = 25;
  const rageDumpValue = 20;
  const AI = function() {
    if (this.combat.isDead()) return;

    const rage = this.rage.rage();

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
    }

    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      if (rage > rageDumpValue) this.ability.savageBlow();
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
      this.scene.physics.moveToObject(this, target, moveSpeed);
    }
  }
  return AI;
}
