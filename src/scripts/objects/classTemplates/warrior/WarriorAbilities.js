export default class WarriorAbilities {
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

    /**
     * heroicStrike - A strong attack that increases weapon
     * damage by 11 and causes a hight amount of threat.
     *
     * @returns {void}
     */
    this.heroicStrike = function() {
      // still need to find out about threat
      const rageCost = 15;
      const oldRage = character.rage.getRage();
      const enoughRage = oldRage >= rageCost;
      const onNextAttack = character.combat.getOnNextAttack();
      if (onNextAttack === 'heroicStrike') return;
      if (!enoughRage) return console.log("not enough rage");
      const newOnNextAttack = 'heroicStrike';
      character.combat.setOnNextAttack(newOnNextAttack)
    }
  }
}
