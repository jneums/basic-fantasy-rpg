/**
 * KoboldMinerAI - warrior script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function KoboldMinerAI() {
  const meleeRange = 50;
  const AI = function() {
    // scan for enemies for body pull
    const enemies = this.target.scanForEnemies(200);
    // scan for enemies by threat table (pulled by attack)
    const target = this.threat.highestThreat()
      ? this.threat.highestThreat()
      : this.target.getClosestEnemy(enemies);
    // if no target in range and no aggro, wait
    if (!target) return this.setVelocity(0, 0);
    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      this.combat.meleeAutoAttack(target);
    } else {
      // change this to total moveSpeed
      const moveModifier = this.buffs.statBonus('moveSpeed')
      ? this.buffs.statBonus('moveSpeed')
      : 1;
      const moveSpeed = this.movement.getMovementSpeed() * moveModifier;
      this.scene.physics.moveToObject(this, target, moveSpeed);
    }
  }
  return AI;
}
