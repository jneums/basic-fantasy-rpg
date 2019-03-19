import spellHitTable from '../../../hitTables/spellHitTable';
import { getConsumableByName } from '../../../loot/consumables';
import wand from '../wand';
import lesserHeal from './abilities/lesserHeal';
import renew from './abilities/renew';



export default class PriestAbilities {
  constructor(character) {
    let abilities = ['wand'];

    this.wand = wand.bind(character);
    this.lesserHeal = lesserHeal.bind(character);
    this.renew = renew.bind(character);

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
