import { meleeAutoAttack, rangedAttack } from '../abilities';
import {
  getClosestEnemy,
  updateSwingTimer,
  scanForEnemies,
  rangeCheck,
  checkSwingTimer,
  checkForTwoHandWeapon
} from '../utilities';

/**
 * WarriorAI - warrior script
 *
 * @param  {character} character reference
 * @returns {function} update function
 */
export default function WarriorAI() {
  const update = function() {
    const newSwingTimer = updateSwingTimer(this);
    const enemies = scanForEnemies(this);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = getClosestEnemy(this, enemies);
    const canReachTarget = rangeCheck(this, target, 60);
    if (canReachTarget) {
      this.setVelocity(0, 0);
      meleeAutoAttack(this, target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return update;
}
