import CombatObject from '../CombatSystem/CombatObject';
import spellHitTable from '../../hitTables/spellHitTable';
import abilityRequirements from './abilityRequirements';
import CONST from '../Managers/Const';


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

  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 0,
    resource: 'mana',
    range: CONST.CAST_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  // check for wand
  const wand = this.equipment.equipped().ranged;
  if (!wand.damage && wand.type !== 'wand') return console.log("I dont have a wand")

  // check for cooldown
  const canRanged = this.timer.checkSwingTimer('ranged');
  if (!canRanged) return;

  // check if there is a target
  const target = this.target.currentTarget();

  this.timer.resetSwingTimer('ranged');


  // get weapon dmg roll
  const amount = Phaser.Math.Between(wand.damage.min, wand.damage.max);
  // build spell combat object
  const attackStatus = spellHitTable(this, target);
  // process combat object
  const combatObject = new CombatObject(this, target);
  combatObject.setStatus(attackStatus);
  combatObject.setType('wand');
  combatObject.setDamageType(wand.damageType);
  combatObject.setRange('ranged');
  combatObject.setAmount(amount);

  combatObject.process();
}
