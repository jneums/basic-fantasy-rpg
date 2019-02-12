import { meleeAutoAttack, castDamageSpell } from '../globalAbilities/meleeAttack';
import {
  getClosestEnemy,
  getLowestHealthAlly,
  scanForEnemies,
  scanForAllies,
  rangeCheck,
} from '../utilities/utilities';
import { checkSwingTimer, updateSwingTimers } from '../utilities/meleeTimers';
import { checkSpellTimer, updateSpellTimers } from '../utilities/spellTimers';
import { getMageSpellByName } from '../spellbooks/mageSpells';

/**
 * MagicUserAI - npc magic user script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function MageAI() {
  const update = function() {
    const newSwingTimer = updateSwingTimers(this);
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
