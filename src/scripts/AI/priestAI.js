import { meleeAutoAttack, rangedAttack, castHealingSpell } from '../meleeAbilities';
import {
  getClosestEnemy,
  getLowestHealthAlly,
  updateSwingTimer,
  updateSpellTimers,
  scanForEnemies,
  scanForAllies,
  rangeCheck,
  checkSwingTimer,
  checkSpellTimer
} from '../utilities';
import { getPriestSpellByName } from '../spellbooks/priestSpells';

/**
 * PriestAI - priest script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PriestAI() {
  const update = function() {
    const newSwingTimer = updateSwingTimer(this);
    const newSpellTimers = updateSpellTimers(this);
    const allies = scanForAllies(this);

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