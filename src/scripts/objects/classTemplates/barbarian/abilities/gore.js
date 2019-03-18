import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';

/**
 * gore - Wounds the target causing them to bleed for 15 damage
 * over 9 seconds. Requires Battle Stance/Defensive Stance
 *
 * level: 1
 *
 * requires: level 4
 *
 * @returns {void}
 */
export default function gore() {
  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 10,
    resource: 'rage',
    range: 25,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;
  
  const target = this.target.currentTarget();
  // setup combat object:
  const combatObject = new CombatObject(this, target);
  combatObject.setType('dot');
  combatObject.setBonusThreat(1);
  combatObject.setAmount(15); // damage per tick

  // build debuff
  const debuff = {
    name: 'gore',
    duration: 9 * 60,
    interval: 3 * 60,
    combatObject,
    attacker: this
  }
  if (target.buffs.has('gore'))
    target.buffs.replace(debuff);
  else
    target.buffs.add(debuff);
  // placeholder animation, will make specific one for gore
  this.animations.swing();

}
