export default class Lvl {
  constructor(character, level = 1) {
    // level 1 - 60;

    // xp, gain xp to level up
    let xp = 0;

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
