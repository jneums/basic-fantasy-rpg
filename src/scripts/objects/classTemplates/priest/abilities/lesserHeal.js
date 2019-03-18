import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';


/**
 * Lesser Heal - Send a beam of holy magic onto your ally,
 * healing 18 to 20 damage.
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
    range: 175,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const castTime = 1.5 * 60; // 1.5 seconds
  const manaCost = 25;
  const amount = Phaser.Math.Between(18, 20);

  const target = this.target.currentTarget();

  // turn and face target:
  this.movement.faceTarget(target);

  const cast = {
    name: 'Lesser Heal',
    castTime,
    cast: () => {
      if (target.combat.isDead()) return;
      this.mana.spendMana(manaCost);
      // spell effect here:
      // create combat object ot deal 18 - 20 frost dmg:
      const combatObject = new CombatObject(this, target);
      combatObject.setType('heal');
      combatObject.setRange('ranged');
      combatObject.setDamageType('holy');
      combatObject.setAmount(-amount);
      combatObject.process();

    }
  }
  this.timer.setSpell(cast);

}
