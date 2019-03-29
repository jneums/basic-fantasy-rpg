


/**
 *  Lvl Manager - will handle adding experience and
 * tracking level ups.
 */
export default class Lvl {
  constructor(character) {
    // level 1 - 60;
    // xp, gain xp to level up
    let _lvl = 1;
    let _xp = 0;
    let _nextLvl = 150;


    function _levelUp() {
      if (_xp < _nextLvl) return false;

      _lvl++;
      _xp -= _nextLvl;
      _nextLvl *= 1.25;
      return true;

    }

    function _log() {
      console.log(
        `${character.getName()},
         Level: ${_lvl},
         XP: ${_xp},
         Next Level: ${_nextLvl}`)
    }

    this.gainXP = function(amount) {
      _xp += amount;
      _levelUp();
      _log();
    }

    /**
     * getLevel
     *
     * @returns {number} character level
     */
    this.getLevel = function() {
      return _lvl;
    }

    /**
     * getXp
     *
     * @returns {number} character experience
     */
    this.getXp = function() {
      return _xp;
    }

  }
}
