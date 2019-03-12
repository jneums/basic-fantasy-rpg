import CombatObject from '../../../CombatSystem/CombatObject';


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
  const castTime = 1.5 * 60; // 1.5 seconds
  const manaCost = 25;
  const amount = Phaser.Math.Between(18, 20);

  // check if there is a target
  const target = this.target.currentTarget();
  if (!target) return console.log("I need a target");

  // check that target is friendly
  if (target.team() !== this.team()) return console.log("I cant do that");

  // make sure target is alive:
  if (target.combat.isDead()) return console.log("I cant attack that!");

  // turn and face target:
  this.movement.faceTarget();

  // check if target is in range
  const range = 75;
  const inRange = this.target.rangeCheck(target, range);
  if (!inRange) return console.log("I need to get closer");


  if (this.mana.mana() - manaCost < 0) return console.log('I dont have enough mana');

  const cast = {
    name: 'lesser-heal',
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
