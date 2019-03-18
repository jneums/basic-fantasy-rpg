import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';

/**
 * Arcane Missiles -
 *
 * level: 1
 *
 * requires: level 8
 *
 * @returns {void}
 */
export default function arcaneMissiles() {
  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 85,
    resource: 'mana',
    range: 175,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  // check if there is a target
  const target = this.target.currentTarget();

  this.mana.spendMana(85);

  // channeled, .132 is spell coefficient
  const dmgTick = .162 * this.stat.spellPower();
  // create buff item:
  const combatObject = new CombatObject(this, target);
  combatObject.setType('magic');
  combatObject.setRange('ranged');
  combatObject.setDamageType('arcane');
  combatObject.setAmount(dmgTick);

  target.buffs.add({
    name: 'arcaneMissiles',
    duration: 3 * 60,
    interval: 1 * 60,
    combatObject,
    attacker: this
  });
}
