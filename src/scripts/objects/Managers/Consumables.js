
import CombatObject from '../CombatSystem/CombatObject';
/**
 * Consumables Manager - In charge of providing
 * each character with the eat and drink abilities.
 * Also creates the buff and combat objects which
 * get consumed to provide the specific changes to
 * the characters state.
 */
export default class Consumables {
  constructor(character) {

    /**
     * eat - consume food and gain hit points
     * during the process. Must be stationary,
     * and heal increments in intervals instead of
     * a steady stream.
     *
     * @param  {number} foodLevel determines how much hp to gain
     * @returns {void}
     */
    this.eat = function(foodLevel = 1) {
      // channeled, so movement will break it
      // out of combat only:
      if (character.combat.isInCombat()) return console.log('You are in combat')
      // hp gained depends on the foodLevel
      const healing = 29;
      // create combat object:
      const combatObject = new CombatObject(character, character);
      combatObject.setStatus(null);
      combatObject.setType('eat');
      combatObject.setAmount(-healing);
      // create buff
      // buff manager knows about channeling: set flag to true
      const buff = {
        name: 'eating',
        duration: 30 * 60, // 30 secs * 60 fps update time
        interval: 3 * 60,
        channel: true,
        combatObject,
        attacker: character
      }
      // check if already has, if so replace it instead
      // of adding another one
      if (character.buffs.has('eating'))
        character.buffs.replace(buff);
      else
        character.buffs.add(buff);
    }

    /**
     * drink - consume water in exchange for
     * mana regeneration. Must be stationary.
     *
     * @param  {number} waterLevel, determines amount of regen
     * @returns {void}
     */
    this.drink = function(waterLevel = 1) {
      // channeled, so movement will break it
      // out of combat only:
      if (character.combat.isInCombat()) return console.log('You are in combat')
      // mana gained depends on the water Level
      const regen = 29;
      // create combat object:
      const combatObject = new CombatObject(character, character);
      combatObject.setStatus('null');
      combatObject.setType('drink');
      combatObject.setAmount(-regen);
      // create buff
      // buff manager needs to know about channeling
      const buff = {
        name: 'drinking',
        duration: 30 * 60,
        interval: 3 * 60,
        channel: true,
        combatObject,
        attacker: character
      }
      // replace instead of adding duplicate:
      if (character.buffs.has('drinking'))
        character.buffs.replace(buff);
      else
        character.buffs.add(buff);
    }
  }
}
