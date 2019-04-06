import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';
import spellHitTable from '../../../../hitTables/spellHitTable';

import CONST from '../../../Managers/Const';


/**
 * Renew - Heals 45 dmg of 15 seconds
 *
 * requires level 4
 *
 *
 * @return {void}
 */
export default function renew() {

  // pre ability requirements:
  const config = {
    beneficial: true,
    resourceAmount: 25,
    resource: 'mana',
    range: CONST.CAST_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const castTime = .5 * 60; // 1.5 seconds
  const manaCost = 25;
  const amount = 9;

  const target = this.target.currentTarget();


  const cast = {
    name: 'Renew',
    castTime,
    cast: () => {
      if (target.combat.isDead()) return;
      const combatObject = new CombatObject(this, target);
      const status = spellHitTable(this, target);

      combatObject.setStatus(status);
      combatObject.setType('heal');
      combatObject.setStatus(null);
      combatObject.setRange('ranged');
      combatObject.setDamageType('nature');
      combatObject.setAmount(-amount);

      // build debuff
      const buff = {
        name: 'renew',
        duration: 15 * 60,
        interval: 3 * 60,
        combatObject,
        attacker: this
      }
      if (target.buffs.has('renew'))
        target.buffs.replace(buff);
      else
        target.buffs.add(buff);
      this.setCasting(false)
    }
  }
  this.setCasting(true)
  this.animations.cast('nature');
  this.timer.setSpell(cast);

}
