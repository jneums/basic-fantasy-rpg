import CombatObject from '../../../CombatSystem/CombatObject';

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
  // check for valid target:
  const target = this.target.currentTarget();
  if (!target) return console.log('You need a target');
  // check for enough rage:
  if (!this.rage.spendRage(10)) return console.log('I need more rage')

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
