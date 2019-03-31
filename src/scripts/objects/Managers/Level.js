


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
    let _dirty = false;

    this.isDirty = function() {
      return _dirty;
    }

    this.clean = function() {
      _dirty = false;
    }

    function _levelUp() {
      if (_xp < _nextLvl) return false;

      const primary = character.stat.getPrimary();
      primary.forEach(stat => {
        character.stat.incStat(stat);
        character.stat.incStat(stat);
      })

      const secondary = character.stat.getSecondary();
      secondary.forEach(stat => {
        character.stat.incStat(stat);
      })

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


    this.lvlInfo = function() {
      return {
        lvl: _lvl,
        xp: _xp,
        nextLvl: _nextLvl
      }
    }

    this.gainXP = function(amount) {
      _dirty = true;
      _xp += amount;
      _levelUp();
      // _log();
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

    this.getNextLvl = function() {
      return _nextLvl;
    }

  }
}
