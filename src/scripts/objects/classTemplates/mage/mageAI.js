/**
 * MagicUserAI - npc magic user script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function MageAI() {
  const AI = function() {
    const allies = this.target.scanForAllies();

    const enemies = this.target.scanForEnemies(500);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = this.target.getClosestEnemy(enemies);

    const wandRange = this.target.rangeCheck(target, 300);
    if (wandRange) {
      this.setVelocity(0, 0);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return AI;
}
