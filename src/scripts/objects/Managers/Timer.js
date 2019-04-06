export default class Timer {
  constructor(character) {
    let globalCooldown = 0;
    let castTimer = 0;
    let spell = 0;
    let swingTimerMainHand = 0;
    let swingTimerOffHand = 0;
    let swingTimerRanged = 0;
    let abilityTimers = [];
    let corpseTimer = 0;


    /**
     * castTimer - tracks current spell cast
     *
     * @returns {number} frames
     */
    this.castTimer = function() {
      return castTimer;
    }

    /**
     * spell - currently being cast
     *
     * @returns {object}  { name: 'water', castTime: 300, cast: fn() }
     */
    this.spell = function() {
      return spell;
    }

    /**
     * checkAbilityTimer
     *
     * @param  {object} ability to check
     * @returns {bool} true if can be cast
     */
    this.checkAbilityTimer = function(ability = {}) {
      const abilityTimer = this.getAbilityTimers()
        .filter(a => a.name === ability.name)[0].time;
      const spellSpeed = spell.speed;
      const spellSpeedToFrames = spellSpeed * 60;
      return (spellTimer > spellSpeedToFrames);
    }

    /**
     * updateAbilityTimers - increment each timer
     *
     * @returns {array} of ability timers
     */
    this.updateAbilityTimers = function() {
      const oldAbilityTimers = this.getAbilityTimers();
      const newAbilityTimers = oldAbilityTimers.map((timer) => {
        const newTime = timer.time + 1;
        const newTimer = Object.assign({}, { name: timer.name, time: newTime });
        return newTimer;
      })
      this.setAbilityTimers(newAbilityTimers);
      return newAbilityTimers;
    }

    /**
     * resetAbilityTimer
     *
     * @param  {string} ability name of ability
     * @returns {object} new timer object
     */
    this.resetAbilityTimer = function(ability = '') {
      const oldAbilityTimers = this.getAbilityTimers();
      const newTimer = Object.assign({}, { name: ability, time: 0 });
      const newAbilityTimers = oldAbilityTimers.filter(a => a.name !== ability);
      newAbilityTimers.push(newTimer);
      this.setAbilityTimers(newAbilityTimers);
      return newTimer;
    }

    /**
     * resetSwingTimer - resets timer to weapon speed
     *
     * @param  {Character} attacker
     * @param  {string} hand to reset
     * @returns {void}
     */
    this.resetSwingTimer = function(hand = '') {
      const spdModifier = character.combat.attackSpd();
      if (hand === 'main') {
        const mainHandSpeed = character.equipment.getWeaponSpeed('main');
        this.setSwingTimerMainHand(spdModifier * mainHandSpeed * 60);
      } else if (hand === 'off') {
        const offHandSpeed = character.equipment.getWeaponSpeed('off');
        this.setSwingTimerOffHand(spdModifier * offHandSpeed * 60);
      } else if (hand === 'ranged') {
        const rangedSpeed = character.equipment.getWeaponSpeed('ranged');
        this.setSwingTimerRanged(spdModifier * rangedSpeed * 60);
      }
    }

    /**
     * checkSwingTimer
     *
     * @param  {string} hand slot to check
     * @returns {bool} can attack or not
     */
    this.checkSwingTimer = function(hand = '') {
      switch(hand) {
        case 'main':
          return this.getSwingTimerMainHand() === 0;
        case 'off':
          return this.getSwingTimerOffHand() === 0;
        case 'ranged':
          return this.getSwingTimerRanged() === 0;
      }
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
      const swingTimerRanged = this.getSwingTimerRanged();
      const newSwingTimerMainHand = (swingTimerMainHand - 1 > 0)
        ? swingTimerMainHand - 1
        : 0;
      const newSwingTimerOffHand = (swingTimerOffHand - 1 > 0)
        ? swingTimerOffHand - 1
        : 0;
      const newSwingTimerRanged = (swingTimerRanged - 1 > 0)
        ? swingTimerRanged - 1
        : 0;
      this.setSwingTimerMainHand(newSwingTimerMainHand);
      this.setSwingTimerOffHand(newSwingTimerOffHand);
      this.setSwingTimerRanged(newSwingTimerRanged);
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
     * updateCastTimer - used by player updater to keep
     * track of spell casting and staying still while casting
     *
     * @returns {void} executes callback after casting time
     */
    this.updateCastTimer = function() {
      if (!this.spell()) return;
      if (character.body.velocity.x || character.body.velocity.y) {
        return this.setSpell(0);
      }
      const oldCastTimer = this.castTimer();
      const newCastTimer = oldCastTimer - 1;
      if (!newCastTimer) {
        this.spell().cast();
        this.setSpell(0);
      } else {
        this.setCastTimer(newCastTimer);
      }
    }

    this.parried = function(hand = '') {
      if (hand === 'main') {
        // reduce mainhand swing by 40%;
        const mainTime = this.getSwingTimerMainHand();
        const mainWpnSpd = character.equipment.getWeaponSpeed('main')
        if (mainTime - (mainWpnSpd * 60 * .4) > 0) {

          this.setSwingTimerMainHand(mainTime - (mainWpnSpd * 60 * .4));
        } else {
          this.setSwingTimerMainHand(0);
        }
      } else if (hand === 'off') {
        // reduce offhand swing by 40%;
        const offTime = this.getSwingTimerOffHand();
        const offWpnSpd = character.equipment.getWeaponSpeed('off');
        if (offTime - (offWpnSpd * 60 * .4) > 0) {
          this.setSwingTimerOffHand(offTime - (offWpnSpd * 60 * .4));
        } else {
          this.setSwingTimerOffHand(0);
        }
      }
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
     * getSwingTimerRanged
     *
     * @returns {number}  ranged cooldown
     */
    this.getSwingTimerRanged = function() {
      return swingTimerRanged;
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
     * setSwingTimerRanged
     *
     * @param  {number} newSwingTimerRanged
     * @returns {void}
     */
    this.setSwingTimerRanged = function(newSwingTimerRanged) {
      swingTimerRanged = newSwingTimerRanged;
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

    this.setCastTimer = function(newCastTimer) {
      castTimer = newCastTimer;
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

    /**
     * setSpell - initialize a spell cast,
     * starting the count down, and syncing the
     * spell object.
     *
     * @param  {object} spellObject
     * @returns {void}
     */
    this.setSpell = function(spellObject) {
      this.setCastTimer(spellObject.castTime);
      spell = spellObject;
    }

  }
}
