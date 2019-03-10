import CombatObject from '../../../CombatSystem/CombatObject';
import spellHitTable from '../../../../hitTables/spellHitTable';

/**
 * wand - attack with an equipped wand
 *
 * level: 1
 *
 * requires: level 1, wand
 *
 * @returns {void}
 */
export default function wand() {
  // check for wand
  const wand = this.equipment.equipped().ranged;
  if (!wand.damage && wand.type !== 'wand') return console.log("I dont have a wand")

  // check for cooldown
  const canRanged = this.timer.checkSwingTimer('ranged');
  if (!canRanged) return;

  // check if there is a target
  const target = this.target.currentTarget();
  if (!target) return console.log("I need a target");

  // make sure target is alive:
  if (target.combat.isDead()) return console.log("I cant attack that!")


  // check if target is in range
  const maxDistance = 300;
  const inRange = this.target.rangeCheck(target, maxDistance);
  if (!inRange) return console.log("I'm too far away");


  // stop moving, cant move and wand
  this.movement.stop();
  this.timer.resetSwingTimer('ranged');

  // get weapon dmg roll
  const amount = Phaser.Math.Between(wand.damage.min, wand.damage.max);
  // build spell combat object
  const attackStatus = spellHitTable(this, target);
  // process combat object
  const combatObject = new CombatObject(this, target);
  combatObject.setStatus(attackStatus);
  combatObject.setType('wand');
  combatObject.setDamageType(wand.type);
  combatObject.setRange('ranged');
  combatObject.setAmount(amount);

  combatObject.process();
}
