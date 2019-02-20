
/**
 *  Lvl Manager - will handle adding experience and
 * tracking level ups.
 */
export default class Lvl {
  constructor(character, level = 1) {
    // level 1 - 60;
    // xp, gain xp to level up
    let xp = 0;
    let nextLvl = 100;


    this.gainXP = function(amount) {
      xp += amount;

      if (xp >= nextLvl) {
        // level up!
        const nextLevel = this.getLevel() + 1;
        this.setLevel(nextLevel);
        this.setXp(0);
        nextLvl *= 2;
        console.log("leveled up: ", this.getLevel());
      }
      console.log('xp: ', xp);
    }
    /**
     * getLevel
     *
     * @returns {number} character level
     */
    this.getLevel = function() {
      return level;
    }

    /**
     * getXp
     *
     * @returns {number} character experience
     */
    this.getXp = function() {
      return xp;
    }

    /**
     * setLevel
     *
     * @param  {number} newLevel
     * @returns {void}
     */
    this.setLevel = function(newLevel) {
      level = newLevel;
    }


    /**
     * setXp
     *
     * @param  {number} newXp
     * @returns {void}
     */
    this.setXp = function(newXp) {
      xp = newXp;
    }
  }
}
