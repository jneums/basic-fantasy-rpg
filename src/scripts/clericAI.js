import { meleeAttack, rangedAttack, castHealingSpell } from './abilities';
import { getClosestEnemy, getLowestHealthAlly } from './utilities';
import { getClericSpellByName } from './clericSpells';

/**
 * ClericAI - fighter script
 *
 * @param  {character} character reference
 * @returns {function} update function
 */
export default function ClericAI() {
  const update = function() {
    // update swing timer
    const swingTimer = this.getSwingTimer();
    const newSwingTimer = swingTimer + 1;
    this.setSwingTimer(newSwingTimer);
    // scan battlefield for allies who need healing
    const allies = this.scene.children.list.filter(child => child.getTeam() === this.getTeam());
    // sort allies by health, assign lowest to healTarget
    const healTarget = getLowestHealthAlly(this, allies);
    // heal ally if low health
    if (healTarget.getHp() < 5) {
      const healSpell = getClericSpellByName('cure-light-wounds');
      castHealingSpell(healTarget, healSpell);
    }
    // scan battlefield for characters on different team
    const enemies = this.scene.children.list.filter(child => child.getTeam() !== this.getTeam());
    // if no enemies, stop
    if (!enemies.length) return this.setVelocity(0, 0);
    // filter enemies by distance
    // targeting, pick closest person you see
    const target = getClosestEnemy(this, enemies);
    // movement until close enough to attack
    const distanceToTarget = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    if (distanceToTarget > 60) {
      this.scene.physics.moveToObject(this, target);
    } else {
      this.setVelocity(0, 0);
      const weaponSpeed = this.getRightHand().speed;
      const weaponSpeedToFrames = weaponSpeed * 60;
      if (newSwingTimer > weaponSpeedToFrames) {
        meleeAttack(this, target, 'left');
        this.setSwingTimer(0);
      }
    }

    // attack until target is dead
    // run away if for sure going to die
  }
  return update;
}
