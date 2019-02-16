/**
 * MagicUserAI - npc magic user script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function MageAI() {
  const AI = function() {
    const newSwingTimer = this.timer.updateSwingTimers();
    const newSpellTimers = this.updateSpellTimers();
    const allies = this.target.scanForAllies();

    const enemies = this.target.scanForEnemies(500);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = this.target.getClosestEnemy(enemies);
    const canReachTarget = this.target.rangeCheck(target, 50);
    if (canReachTarget) {
      this.setVelocity(0, 0);
      this.combat.meleeAutoAttack(target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return AI;
}
