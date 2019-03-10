import CombatObject from '../../../CombatSystem/CombatObject';

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
  // if (!canCast) return;

  // check if there is a target
  const target = this.target.currentTarget();
  if (!target) return console.log("I need a target");

  // check that target isnt friendly
  if (target.team() === this.team()) return console.log("I cant do that");

  // make sure target is alive:
  if (target.combat.isDead()) return console.log("I cant attack that!")

  // check if target is in range
  const range = 300;
  const inRange = this.target.rangeCheck(target, range);
  if (!inRange) return console.log("I need to get closer");

  // check mana
  const manaCost = 85;
  const paidMana = this.mana.spendMana(manaCost);
  if (!paidMana) return;
  const duration = 3;
  const interval = 1;
  // channeled, .132 is spell coefficient
  const dmgTick = .332 * this.stat.spellPower();
  // create buff item:
  const combatObject = new CombatObject(this, target);
  combatObject.setType('magic');
  combatObject.setRange('ranged');
  combatObject.setDamageType('arcane');
  combatObject.setAmount(dmgTick);

  target.buffs.add({
    name: 'arcaneMissiles',
    duration: duration * 60,
    interval: interval * 60,
    combatObject,
    attacker: this
  });
}
