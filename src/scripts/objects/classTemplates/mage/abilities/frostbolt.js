import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';


/**
 * frostbolt - Launches a bolt of frost at the enemy,
 * causing 18 to 20 Frost damage and slowing
 * movement speed by 40% for 5 sec.
 *
 * requires level 4
 *
 *
 * @return {type}  description
 */
export default function frostbolt () {

  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 25,
    resource: 'mana',
    range: 175,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const castTime = 1.5 * 60; // 1.5 seconds
  const dmg = Phaser.Math.Between(18, 20);

  const target = this.target.currentTarget();

  const cast = {
    name: 'Frostbolt',
    castTime,
    cast: () => {
      // spell effect here:
      // create combat object ot deal 18 - 20 frost dmg:
      const combatObject = new CombatObject(this, target);
      combatObject.setType('magic');
      combatObject.setRange('ranged');
      combatObject.setDamageType('frost');
      combatObject.setAmount(dmg);
      combatObject.process();
      // creat debuff to slow target by 40% for 5 secs.
      const debuff = {
        name: 'frostbolt',
        duration: 5 * 60,
        statObject: {
          moveSpeed: .6
        },
        attacker: this
      }
      this.setCasting(false);
      // create debuff for * .6 movement speed, send it to buff
      if (target.buffs.has('frostbolt'))
        target.buffs.replace(debuff);
      else
        target.buffs.add(debuff);
    }
  }
  this.setCasting(true);
  this.animations.cast('frost')
  this.timer.setSpell(cast);

}
