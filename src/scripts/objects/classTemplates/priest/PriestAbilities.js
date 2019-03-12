import spellHitTable from '../../../hitTables/spellHitTable';
import { getConsumableByName } from '../../../loot/consumables';
import wand from './abilities/wand';



export default class PriestAbilities {
  constructor(character) {
    let abilities = ['wand'];

    this.wand = wand.bind(character);


    /**
    * getAbilities
    *
    * @returns {array}  characters abilitees
    */
    this.getAbilities = function() {
      return abilities;
    }

    /**
    * setAbilities - spells character knows
    *
    * @param  {array} newAbilities
    * @returns {void}
    */
    this.setAbilities = function(newAbilities) {
      abilities = newAbilities;
    }

  }
}
