import { meleeAutoAttack } from '../globalAbilities/meleeAttack';

/**
 * WarriorAI - warrior script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function WarriorAI() {
  const meleeRange = 50;
  const rageDumpValue = 20;
  const AI = function() {
    const rage = this.rage.getRage();
    const enemies = this.target.scanForEnemies(500);
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = this.target.getClosestEnemy(enemies);
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      if (rage > rageDumpValue) this.ability.heroicStrike();
      meleeAutoAttack(this, target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return AI;
}
