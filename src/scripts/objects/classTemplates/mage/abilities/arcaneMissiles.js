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
  const castTime = .5 * 60; // 1.5 seconds

  // check if there is a target
  const target = this.target.currentTarget();

  const cast = {
    name: 'Frostbolt',
    castTime,
    cast: () => {
      // spell effect here:
      //   // channeled, .132 is spell coefficient
        const dmgTick = .162 * this.stat.spellPower();
        // create buff item:
        const combatObject = new CombatObject(this, target);
        combatObject.setType('magic');
        combatObject.setRange('ranged');
        combatObject.setDamageType('arcane');
        combatObject.setAmount(dmgTick);


      // creat debuff to slow target by 40% for 5 secs.
      const debuff = {
        name: 'arcaneMissiles',
        duration: 3 * 60,
        interval: 1 * 60,
        combatObject,
        attacker: this
      }
      this.setCasting(false);
      // create debuff for * .6 movement speed, send it to buff
      if (target.buffs.has('arcaneMissiles'))
        target.buffs.replace(debuff);
      else
        target.buffs.add(debuff);
    }
  }
  this.setCasting(true);
  this.animations.cast('frost')
  this.timer.setSpell(cast);
}
