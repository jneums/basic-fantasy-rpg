export default class Lvl {
  constructor(character, level = 1) {
    // level 1 - 60;

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
     * getExperience
     *
     * @returns {number} character experience
     */
    this.getExperience = function() {
      return experience;
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
     * setExperience
     *
     * @param  {number} newExperience
     * @returns {void}
     */
    this.setExperience = function(newExperience) {
      level = newExperience;
    }
  }
}
