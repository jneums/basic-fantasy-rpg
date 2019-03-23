
import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';


/**
 * polymorph - Transforms the enemy into a sheep, forcing it to wander around for up to 20 sec.
 * While wandering, the sheep cannot attack or cast spells but will regenerate very quickly.
 * Any damage will transform the target back into its normal form.
 * Only one target can be polymorphed at a time. Only works on Beasts, Humanoids and Critters.
 *
 * requires level 8
 *
 *
 * @return {void}
 */
export default function polymorph() {

  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 25,
    resource: 'mana',
    range: this.CONST.CAST_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const castTime = 1.5 * 60; // 1.5 seconds
  const manaCost = 25;

  const target = this.target.currentTarget();

  const cast = {
    name: 'Polymorph',
    castTime,
    cast: () => {
      // spell effect here:
      // creat debuff to slow target by 40% for 5 secs.
      const debuff = {
        name: 'polymorph',
        duration: 30 * 60,
        attacker: this,
        breakOnDmg: true,
        beginHP: target.stat.hp()
      }
      this.setCasting(false);
      // create debuff for * .6 movement speed, send it to buff
      if (target.buffs.has('polymorph'))
        target.buffs.replace(debuff);
      else
        target.buffs.add(debuff);
    }
  }
  this.setCasting(true);
  this.animations.cast('frost')
  this.timer.setSpell(cast);

}
