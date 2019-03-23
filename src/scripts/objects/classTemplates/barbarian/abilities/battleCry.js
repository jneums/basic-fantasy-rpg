import abilityRequirements from '../../abilityRequirements';

/**
 * Battle Cry - The barbarian shouts, increasing the melee
 * attack power of all party members within 20 yards by 15.
 * Lasts 2 minutes.
 *
 * level: 1
 *
 * requires: level 1
 *
 * @returns {void}
 */
export default function battleCry() {

  const reqConfig = {
    beneficial: 'true',
    resourceAmount: 10,
    resource: 'rage',
    range: this.CONST.MELEE_RANGE,
    needsTarget: false
  }
  if(!abilityRequirements(this, reqConfig)) return;

  const alliesInRange = this.target.scanForAllies(this.CONST.CAST_RANGE);
  // create a buff object.
  const buff = {
    name: 'battleShout',
    duration: 120 * 60,
    statObject: {
      attackPower: 25
    }
  }

  if (this.rage.spendRage(10)) {
    // push it to each of the allies in 20 yards
    if (alliesInRange.length !== 0) {
      alliesInRange.forEach(ally => {
        if (ally.buffs.has('battleShout'))
          ally.buffs.replace(buff);
        else
          ally.buffs.add(buff);
      })
    }
  };
}
