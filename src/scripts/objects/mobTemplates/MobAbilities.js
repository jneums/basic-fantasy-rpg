export default class MobAbilities {
  constructor(character) {
    let spellbook = [];

    /**
    * getSpellbook
    *
    * @returns {array}  characters spells
    */
    this.getSpellbook = function() {
      return spellbook;
    }


    /**
    * setSpellbook - spells character knows
    *
    * @param  {array} newSpellbook
    * @returns {void}
    */
    this.setSpellbook = function(newSpellbook) {
      spellbook = newSpellbook;
    }
  }
}
