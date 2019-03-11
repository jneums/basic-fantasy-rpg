import CombatObject from '../../../CombatSystem/CombatObject';


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
  const castTime = 1.5 * 60; // 1.5 seconds
  const manaCost = 25;
  const dmg = Phaser.Math.Between(18, 20);

  // check if there is a target
  const target = this.target.currentTarget();
  if (!target) return console.log("I need a target");

  // check that target isnt friendly
  if (target.team() === this.team()) return console.log("I cant do that");

  // make sure target is alive:
  if (target.combat.isDead()) return console.log("I cant attack that!")
  this.movement.faceTarget();

  // check if target is in range
  const range = 300;
  const inRange = this.target.rangeCheck(target, range);
  if (!inRange) return console.log("I need to get closer");


  if (this.mana.mana() - manaCost < 0) return console.log('I dont have enough mana');

  const cast = {
    name: 'Frostbolt',
    castTime,
    cast: () => {
      this.mana.spendMana(manaCost);
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
      // create debuff for * .6 movement speed, send it to buff
      if (target.buffs.has('frostbolt'))
        target.buffs.replace(debuff);
      else
        target.buffs.add(debuff);
    }
  }
  this.timer.setSpell(cast);

}
