import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';
import CONST from '../../../Managers/Const';


/**
 * Lesser Heal - Send a beam of holy magic onto your ally,
 * healing 47 to 58 damage.
 *
 * requires level 4
 *
 *
 * @return {void}
 */
export default function lesserHeal () {

  // pre ability requirements:
  const config = {
    beneficial: true,
    resourceAmount: 25,
    resource: 'mana',
    range: CONST.CAST_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const castTime = 1.5 * 60; // 1.5 seconds
  const manaCost = 45;
  const amount = Phaser.Math.Between(47, 58);

  const target = this.target.currentTarget();


  const cast = {
    name: 'Lesser Heal',
    castTime,
    cast: () => {
      if (target.combat.isDead()) return;
      // spell effect here:
      // create combat object ot deal 18 - 20 frost dmg:
      const combatObject = new CombatObject(this, target);
      combatObject.setType('heal');
      combatObject.setRange('ranged');
      combatObject.setDamageType('holy');
      combatObject.setAmount(-amount);
      combatObject.process();
      this.setCasting(false)
    }
  }
  this.setCasting(true)
  this.animations.cast('nature');
  this.timer.setSpell(cast);

}
