export default class Timer {
  constructor(character) {
    let globalCooldown = 0;
    let swingTimerMainHand = 0;
    let swingTimerOffHand = 0;
    let spellTimers = [];
    let corpseTimer = 0;



    /**
     * checkSpellTimer
     *
     * @param  {object} spell to check
     * @returns {bool} true if can be cast
     */
    this.checkSpellTimer = function(spell = {}) {
      const spellTimer = this.getSpellTimers()
        .filter(a => a.name === spell.name)[0].time;
      const spellSpeed = spell.speed;
      const spellSpeedToFrames = spellSpeed * 60;
      return (spellTimer > spellSpeedToFrames);
    }

    /**
     * updateSpellTimers - increment each timer
     *
     * @returns {array} of spell timers
     */
    this.updateSpellTimers = function() {
      const oldSpellTimers = this.getSpellTimers();
      const newSpellTimers = oldSpellTimers.map((timer) => {
        const newTime = timer.time + 1;
        const newTimer = Object.assign({}, { name: timer.name, time: newTime });
        return newTimer;
      })
      this.setSpellTimers(newSpellTimers);
      return newSpellTimers;
    }

    /**
     * resetSpellTimer
     *
     * @param  {string} spell name of spell
     * @returns {object} new timer object
     */
    this.resetSpellTimer = function(spell = '') {
      const oldSpellTimers = this.getSpellTimers();
      const newTimer = Object.assign({}, { name: spell, time: 0 });
      const newSpellTimers = oldSpellTimers.filter(a => a.name !== spell);
      newSpellTimers.push(newTimer);
      this.setSpellTimers(newSpellTimers);
      return newTimer;
    }

    /**
     * resetSwingTimer - resets timer to zero
     *
     * @param  {Character} attacker
     * @param  {string} hand to reset
     * @returns {void}
     */
    this.resetSwingTimer = function(hand = '') {
      if (hand === 'main') {
        this.setSwingTimerMainHand(0);
      } else if (hand === 'off') {
        this.setSwingTimerOffHand(0);
      }
    }

    /**
     * checkSwingTimer
     *
     * @param  {Character} character to check
     * @param  {string} hand to use
     * @returns {bool} can attack or not
     */
    this.checkSwingTimer = function(hand = '') {
      const mainHandSpeed = character.equipment.getEquipped().mainHand.speed;
      const offHandSpeed = character.equipment.getEquipped().offHand.speed;
      const swingTimer = (hand === 'main')
        ? this.getSwingTimerMainHand()
        : this.getSwingTimerOffHand();
      const weaponSpeed = (hand === 'main')
        ? mainHandSpeed
        : offHandSpeed;
      const weaponSpeedToFrames = weaponSpeed * 60;
      return (swingTimer > weaponSpeedToFrames);
    }

    /**
     * updateSwingTimers - run on character update
     *
     * @param  {Character} character to update
     * @returns {void}
     */
    this.updateSwingTimers = function() {
      const swingTimerMainHand = this.getSwingTimerMainHand();
      const swingTimerOffHand = this.getSwingTimerOffHand();
      const newSwingTimerMainHand = swingTimerMainHand + 1;
      const newSwingTimerOffHand = swingTimerOffHand + 1;
      this.setSwingTimerMainHand(newSwingTimerMainHand);
      this.setSwingTimerOffHand(newSwingTimerOffHand);
    }

    /**
     * updateGlobalCooldown - increment GCD
     *
     * @param  {Character} character to modify
     * @returns {void}
     */
    this.updateGlobalCooldown = function() {
      const oldGlobalCooldown = this.getGlobalCooldown();
      const newGlobalCooldown = oldGlobalCooldown + 1;
      this.setGlobalCooldown(newGlobalCooldown);
    }

    /**
    * getSwingTimerMainHand
    *
    * @returns {number} main hand cooldown
    */
    this.getSwingTimerMainHand = function() {
      return swingTimerMainHand;
    }

    /**
    * getSwingTimerOffHand
    *
    * @returns {number} off hand cooldown
    */
    this.getSwingTimerOffHand = function() {
      return swingTimerOffHand;
    }

    /**
     * getGlobalCooldown
     *
     * @returns {number} global cooldown
     */
    this.getGlobalCooldown = function() {
      return globalCooldown;
    }

    /**
     * getSpellTimers
     *
     * @returns {array} array of timer objects
     */
    this.getSpellTimers = function() {
      return spellTimers;
    }

    /**
     * getCorpseTimer
     *
     * @returns {number} seconds until destroy
     */
    this.getCorpseTimer = function() {
      return corpseTimer;
    }

    /**
    * setSwingTimerMainHand
    *
    * @param  {number} newSwingTimerMainHand
    * @returns {void}
    */
    this.setSwingTimerMainHand = function(newSwingTimerMainHand) {
      swingTimerMainHand = newSwingTimerMainHand;
    }

    /**
    * setSwingTimerOffHand
    *
    * @param  {number} newSwingTimerOffHand
    * @returns {void}
    */
    this.setSwingTimerOffHand = function(newSwingTimerOffHand) {
      swingTimerOffHand = newSwingTimerOffHand;
    }

    /**
     * setGlobalCooldown
     *
     * @param  {number} newGlobalCooldown
     * @returns {void}
     */
    this.setGlobalCooldown = function(newGlobalCooldown) {
      globalCooldown = newGlobalCooldown;
    }

    /**
     * setSpellTimers
     *
     * @param  {array} newSpellTimers array of timer objects
     * @returns {void}
     */
    this.setSpellTimers = function(newSpellTimers) {
      spellTimers = newSpellTimers;
    }

    /**
     * setCorpseTimer
     *
     * @param  {number} newCorpseTimer
     * @returns {void}
     */
    this.setCorpseTimer = function(newCorpseTimer) {
      corpseTimer = newCorpseTimer;
    }

  }
}
