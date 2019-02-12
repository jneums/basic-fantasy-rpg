import { meleeAutoAttack } from '../globalAbilities/meleeAttack';
import {
  getClosestEnemy,
  scanForEnemies,
  rangeCheck,
  checkForTwoHandWeapon
} from '../utilities/utilities';
import {
  updateSwingTimers,
  checkSwingTimer
} from '../utilities/meleeTimers';


/**
 * RogueAI - rogue script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function RogueAI() {
  const update = function() {
    const newSwingTimer = updateSwingTimers(this);
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
