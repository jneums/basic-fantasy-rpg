import { meleeAutoAttack, rangedAttack, castHealingSpell } from '../abilities';
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
 * @param  {character} character reference
 * @returns {function} update function
 */
export default function PriestAI() {
  const update = function() {
    const newSwingTimer = updateSwingTimer(this);
    const newSpellTimers = updateSpellTimers(this);
    const allies = scanForAllies(this);
    const healTarget = getLowestHealthAlly(this, allies);
    // heal ally if low health
    const healSpell = getPriestSpellByName('cure-light-wounds');
    const canCastSpellYet = checkSpellTimer(this, healSpell);
    if (healTarget.getHp() < 5 && canCastSpellYet) {
      console.log(castHealingSpell(this, healTarget, healSpell), healTarget.getName());
    }

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
