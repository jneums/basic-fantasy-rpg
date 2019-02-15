export default class MobAbilities {
  constructor(character) {
    let abilities = [];

    /**
    * getAbilities
    *
    * @returns {array}  characters abilities
    */
    this.getAbilities = function() {
      return abilities;
    }


    /**
    * setAbilities - abilities character knows
    *
    * @param  {array} newAbilities
    * @returns {void}
    */
    this.setAbilities = function(newAbilities) {
      abilities = newAbilities;
    }
  }
}
