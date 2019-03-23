import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';

/**
 * intimidate - Blasts nearby enemies, increasing the time
 * between their attacks by 100% for 10 seconds and doing
 * 10 damage to them. Will affect up to 4 targets.
 *
 * threat: 1.75x damage.
 * damage is physical and is mitigated by
 * the armor of the opponent.
 * cannot be cast while silenced.
 *
 * level: 1
 *
 * requires: level 6
 * cooldown: 6 seconds
 * range: 8
 *
 * @returns {void}
 */
export default function intimidate() {

  const reqConfig = {
    beneficial: 'false',
    resourceAmount: 20,
    resource: 'rage',
    range: this.CONST.MELEE_RANGE,
    needsTarget: false
  }
  if(!abilityRequirements(this, reqConfig)) return;

  // scan for enemies
  const enemiesInRange = this.target.scanForEnemies(80);
  // only four closest:
  const closest = enemiesInRange.slice(0, this.CONST.MAX_AOE_TARGETS);
  // push debuff to each of the allies in 20 yards
  if (!closest.length) return;
  closest.forEach(enemy => {
    // setup combat object for each enemy:
    const combatObject = new CombatObject(this, enemy);
    combatObject.setType('special');
    combatObject.setAmount(10);
    combatObject.setBonusThreat(10 * .75);
    // send object to be used
    combatObject.process();
    const debuff = {
      name: 'intimidate',
      duration: 10 * 60,
      statObject: {
        attackSpeed: 2
      },
      attacker: this
    }
    if (enemy.buffs.has('intimidate'))
      enemy.buffs.replace(debuff);
    else
      enemy.buffs.add(debuff);
  })
}
