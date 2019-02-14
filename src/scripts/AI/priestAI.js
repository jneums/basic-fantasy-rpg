import { meleeAutoAttack, castDamageSpell } from '../globalAbilities/meleeAttack';
import { getPriestSpellByName } from '../spellbooks/priestSpells';

/**
 * PriestAI - priest script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PriestAI() {
  const update = function() {
    const newSwingTimer = this.timer.updateSwingTimers();
    const newSpellTimers = this.timer.updateSpellTimers();
    const allies = this.target.scanForAllies();

    const enemies = this.target.scanForEnemies(500);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = this.target.getClosestEnemy(enemies);
    const canReachTarget = this.target.angeCheck(target, 60);
    if (canReachTarget) {
      this.setVelocity(0, 0);
      meleeAutoAttack(this, target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return update;
}
