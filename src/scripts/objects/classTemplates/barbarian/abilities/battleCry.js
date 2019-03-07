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
  const alliesInRange = this.target.scanForAllies(200);
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
