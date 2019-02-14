import { meleeAutoAttack } from '../../globalAbilities/meleeAttack';

/**
 * KoboldMinerAI - warrior script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function KoboldMinerAI() {
  const meleeRange = 50;
  const update = function() {
    const newSwingTimer = this.timer.updateSwingTimers();
    const enemies = this.target.scanForEnemies(200);
    // if no enemies within scan distance, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = this.target.getClosestEnemy(enemies);
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      meleeAutoAttack(this, target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return update;
}
