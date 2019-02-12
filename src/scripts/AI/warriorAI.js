import { meleeAutoAttack, rangedAttack } from '../meleeAbilities';
import { heroicStrike } from '../classAbilities/warriorAbilities';
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
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function WarriorAI() {
  const meleeRange = 50;
  const rageDumpValue = 20;
  const update = function() {
    const rage = this.getRage();
    const newSwingTimer = updateSwingTimer(this);
    const enemies = scanForEnemies(this);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = getClosestEnemy(this, enemies);
    const canMelee = rangeCheck(this, target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      if (rage > rageDumpValue) heroicStrike(this, target);
      meleeAutoAttack(this, target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return update;
}
