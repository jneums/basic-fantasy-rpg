import { meleeAutoAttack, rangedAttack, castDamageSpell } from '../abilities';
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
import { getMageSpellByName } from '../spellbooks/mageSpells';

/**
 * MagicUserAI - npc magic user script
 *
 * @param  {character} character reference
 * @returns {function} update function
 */
export default function MageAI() {
  const update = function() {
    const newSwingTimer = updateSwingTimer(this);
    const newSpellTimers = updateSpellTimers(this);
    const damageSpell = getMageSpellByName('magic-missile');

    const enemies = scanForEnemies(this);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = getClosestEnemy(this, enemies);
    const attackRange = damageSpell.range;
    const canReachTarget = rangeCheck(this, target, attackRange);
    if (canReachTarget) {
      this.setVelocity(0, 0);
      const canCastSpellYet = checkSpellTimer(this, damageSpell);
      if (canCastSpellYet) {
        castDamageSpell(this, target, damageSpell);
      }
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return update;
}
