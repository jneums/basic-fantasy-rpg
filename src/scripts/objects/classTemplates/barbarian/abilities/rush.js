import CombatObject from '../../../CombatSystem/CombatObject';

/**
 * rush - rush an enemy, generate 9 rage, and stun it for 3 seconds.
 * Can be used in combat.
 *
 * level: 1
 *
 * requires: level 4
 *
 * @returns {void}
 */
export default function rush() {
  // meets requirements:
  const target = this.target.currentTarget();
  if (!target) return console.log('I dont have a target!');
  if (target.combat.isDead()) return console.log("I can't attack that")
  const inRange = this.target.rangeCheck(target, 60)
  if (inRange) return console.log('You are too close')

  // setup combat object:
  const combatObject = new CombatObject(this.getName(), target.getName());
  combatObject.setType('stun');
  combatObject.setBonusThreat(1);

  target.buffs.add({
    name: 'stun',
    duration: 3 * 60, //3 seconds
    combatObject,
    attacker: this
  });
  this.rage.spendRage(-9)
  this.movement.setMoveTargetCoords([target.x, target.y])
  this.movement.setMovementSpeed(500)
}
