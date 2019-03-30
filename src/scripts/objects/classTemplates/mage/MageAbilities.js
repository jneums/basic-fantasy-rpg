import spellHitTable from '../../../hitTables/spellHitTable';
import { getConsumableByName } from '../../../loot/consumableAPI';
import wand from '../wand';
import arcaneIntellect from './abilities/arcaneIntellect';
import conjureWater from './abilities/conjureWater';
import conjureFood from './abilities/conjureFood';
import arcaneMissiles from './abilities/arcaneMissiles';
import polymorph from './abilities/polymorph';
import fireball from './abilities/fireball';
import fireBlast from './abilities/fireBlast';
import frostArmor from './abilities/frostArmor';
import frostbolt from './abilities/frostbolt';


export default class MageAbilities {
  constructor(character) {
    let abilities = ['wand'];

    this.wand = wand.bind(character);
    this.arcaneIntellect = arcaneIntellect.bind(character);
    this.arcaneMissiles = arcaneMissiles.bind(character);
    this.polymorph = polymorph.bind(character);
    this.fireball = fireball.bind(character);
    this.fireBlast = fireBlast.bind(character);
    this.frostArmor = frostArmor.bind(character);
    this.frostbolt = frostbolt.bind(character);
    this.conjureWater = conjureWater.bind(character);
    this.conjureFood = conjureFood.bind(character);



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
