/**
 * Buff Manager: collects and updates temporary
 * changes to characters stats. sends combatObjects
 * to the Combat Manager, and provides the Stat manager
 * with stat bonuses provided from buffs.
 */
export default class Buffs {
  constructor(character) {
    // array of buffs/debuffs
    let buffs = [];

    /**
     * getBuffs
     *
     * @returns {array} list of all active buffs
     */
    this.getBuffs = function() {
      return buffs;
    }

    /**
     * setBuffs - replace all buffs
     *
     * @param  {array} newBuffs
     * @returns {void}
     */
    this.setBuffs = function(newBuffs) {
      buffs = newBuffs;
    }

    /**
     * add - create new buff array
     * with new element
     *
     * @param  {object} newBuff object
     * @returns {void}
     */
    this.add = function(newBuff) {
      const newBuffs = this.getBuffs().concat([newBuff]);
      this.setBuffs(newBuffs);
    }

    /**
     * replace - use instead of add,
     * refreshes buff
     *
     * @param  {object} newBuff
     * @returns {void}
     */
    this.replace = function(newBuff) {
      const newBuffs = this.getBuffs()
        .filter(buff => buff.name !== newBuff.name)
        .concat([newBuff]);
      this.setBuffs(newBuffs);
    }

    /**
     * has - use to check for buff in array
     *
     * @param  {string} name of buff
     * @returns {bool}
     */
    this.has = function(name = '') {
      const buff = this.getBuffs().filter(buff => buff.name === name)[0];
      return !(buff === undefined);
    }

    /**
     * statBonus - from buffs
     *
     * @param  {string} stat to check for
     * @returns {number} sum of given stat
     */
    this.statBonus = function(stat = '') {
      // keep this from returning 'undefined', will start throwing
      // errors in all the stat related functions (pretty much all of the functions)
      const activeBuffs = this.getBuffs();
      const totalStat = activeBuffs.filter(buff => buff.statObject)
        .reduce((sum, buff) => {
          if (!buff.statObject[stat]) return 0;
          return sum + buff.statObject[stat];

        }, 0)
        return totalStat;
    }

    /**
     * update - increments timers and sends
     * dmg/heal objects to combat manager
     *
     * @returns {void}  description
     */
    this.update = function() {
      const oldBuffs = this.getBuffs();
      if (oldBuffs) {
        // immutable way to update timers:
        const newBuffs = oldBuffs.filter(buff => buff.duration > 0)
          .map(buff => {
            const oldBuff = buff;
            const newBuff = Object.assign({},
              oldBuff,
              { name: oldBuff.name, duration: oldBuff.duration - 1 }
            );
            return newBuff;
        })
        this.setBuffs(newBuffs);
        newBuffs.forEach(buff => {
          // if buff is channeled
          if (buff.channel) {
            // check for velocity, if so then channeling has been broken,
            // so kill buff
            if (character.body.velocity.x && character.body.velocity.y) {
              buff.duration = 0;
            }
          }
          // if buff has a combat object
          if (buff.combatObject) {
            // check for interval, if ready then fire
            // use the interval for timing combatObject creation
            // and execution throughout the duration of the buff
            if (buff.duration % buff.interval === 0) {
              const attacker = buff.attacker;
              buff.combatObject.process(attacker, character);
            }
          }
        })
      }
    }
  }
}
