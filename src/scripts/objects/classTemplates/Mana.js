export default class ManaMechanic {
  constructor(character) {
    // total in mana pool
    let mana = 0;

    /**
     * mana - get current amount
     *
     * @returns {number}
     */
    this.mana = function() {
      return mana;
    }

    this.maxMana = function() {
      // get total intellect
      const totalInt = character.stat.intellect();
      return totalInt * 15;
    }

    /**
     * spendMana - reduce mana by cost amount
     *
     * @param  {number} cost of ability
     * @returns {bool} success
     */
    this.spendMana = function(cost = 0) {
      // check if there is enough
      if (this.mana() - cost < 0) {
        console.log('Not enough mana');
        return false;
      } else {
        this.setMana(this.mana() - cost);
        return true;
      }
    }

    /**
     * setMana
     *
     * @param  {number} newMana
     * @returns {void}
     */
    this.setMana = function(newMana) {
      mana = newMana;
    }
  }
}
