export default class Combat {
  constructor(character) {
    let combatLog = [];
    let onNextAttack = '';
    let autoAttackToggle = true;
    // [{ name: 'charlie', threat: 120 }, { name: 'kobold', threat: 20 }]
    let threatTable = [];

    this.getThreatTable = function() {
      return threatTable;
    }

    this.setThreatTable = function(newThreatTable) {
      threatTable = newThreatTable;
    }

    this.updateTargetThreatTable = function(target = {}, combatObject = {}) {
      // scan my table for enemy entry.
      const threat = combatObject.damageAmount + combatObject.threatAmount;
      const oldTable = target.combat.getThreatTable()
      const myName = character.getName();

      // get previous threat
      const oldEntry = oldTable.filter(entry => entry.name === myName)[0];
      const newTable = oldTable.filter(entry => entry.name !== myName);

      let newEntry = { name: myName, threat: threat };
      if (oldEntry) {
        newEntry.threat += oldEntry.threat;
      }
      target.combat.setThreatTable(newTable.concat([newEntry]))
    }

    /**
     * attackerClassUpdate - specific reactions for causing dmg
     *
     * @param  {object} combatObject info about attack
     * @returns {object} modified combatObject
     */
    this.attackerClassUpdate = function(newCombatObject = {}) {
      const attackerClass = character.getCharacterClass();
      switch(attackerClass) {
        case 'warrior':
          const onNextAttack = character.combat.getOnNextAttack();
          if (onNextAttack === 'heroicStrike') {
            newCombatObject.damageAmount += 11;
            newCombatObject.threatAmount += 20;
            const oldRage = character.rage.getRage();
            const rageCost = 15;
            const newRage = oldRage - rageCost;
            character.rage.setRage(newRage)
            const newOnNextAttack = '';
            character.combat.setOnNextAttack(newOnNextAttack);
            return newCombatObject;
          } else if (!onNextAttack){
            character.rage.processRage(newCombatObject, 'attacker');
            return newCombatObject;
          }
        default:
          return newCombatObject;
      }
    }

    /**
     * targetClassUpdate - specific reactions for taking dmg
     *
     * @param  {object} combatObject info about attack
     * @returns {void}
     */
    this.targetClassUpdate = function(newCombatObject = {}) {
      const targetClass = character.getCharacterClass();
      switch(targetClass) {
        case 'warrior':
          character.rage.processRage(newCombatObject, 'target');
          return newCombatObject;
        default:
          return newCombatObject;
      }
    }

    /**
     * processCombatObject - take dmg,to log, add rage, etc.
     *
     * @param  {Character} target
     * @param  {object} combatObject
     * @returns {void}
     */
    this.processCombatObject = function(target = {}, combatObject = {}) {
      let newCombatObject = Object.assign({}, combatObject);
      // perform changes on attacker
      newCombatObject = this.attackerClassUpdate(newCombatObject);
      newCombatObject = this.targetClassUpdate(newCombatObject);
      character.combat.pushCombatObjectToLog(newCombatObject);
      target.combat.pushCombatObjectToLog(newCombatObject);
      character.combat.updateTargetThreatTable(target, newCombatObject)
      character.combat.processDamageFromCombatObject(target, newCombatObject);
    }

    /**
     * processDamageFromCombatObject
     *
     * @param  {Character} character
     * @param  {object} combatObject
     * @returns {void}
     */
    this.processDamageFromCombatObject = function(target = {}, combatObject = {} ) {
      const damage = combatObject.damageAmount;
      const oldHp = target.stat.getHp();
      if (oldHp - damage < 0) {
        // target died
        target.stat.setHp(0);
        character.target.setCurrentTarget(undefined);
      } else {
        target.stat.setHp(oldHp - damage);
      }
    }

    /**
     * buildMeleeCombatObject - contains info about attack
     *
     * @param  {Character} target
     * @param  {string} status e.g. 'hit', 'miss', 'crit'
     * @param  {string} type e.g. 'melee', 'ranged'
     * @param  {number} damageAmount
     * @param  {number} mitigationAmount
     * @param  {string} hand
     * @param  {number} time
     * @returns {object}
     * {attacker: "monstrum", target: "leslie", status: "hit",
     *  type: "melee", damageType: "physical", …}
     */
    this.buildMeleeCombatObject = function(target = {}, status = '', type = '', damageAmount = 0, hand = '') {
      // destructure
      let result = {
        attacker: character.getName(),
        target: target.getName(),
        status: status,
        type: type,
        damageType: 'physical',
        damageAmount: damageAmount,
        threatAmount: 0,
        mitigationAmount: 0,
        hand: hand,
        time: Date.now()  // add time from Phaser?
      }
      const mitigatedByArmor = damageAmount * character.stat.armorMitigationPercent(target);
      const blockValue = target.stat.getBlockValue();
      switch(status) {
        case 'miss':
          result.status = 'miss';
          result.damageAmount = 0;
          result.mitigationAmount = damageAmount;
          return result;
        case 'dodge':
          result.status = 'dodge';
          result.damageAmount = 0;
          result.mitigationAmount = damageAmount;
          return result;
        case 'parry':
          result.status = 'parry';
          result.damageAmount = 0;
          result.mitigationAmount = damageAmount;
          return result;
        case 'glancing':
          result.status = 'glancing';
          result.mitigationAmount = damageAmount * .3;
          result.damageAmount = damageAmount * .7;
          return result;
        case 'blocked':
          result.status = 'blocked';
          result.mitigationAmount = blockValue; // get block from stats/items/talents as well!
          result.damageAmount = damageAmount - blockValue;
          return result;
        case 'crit':
          result.status = 'crit';
          result.damageAmount = (damageAmount * 2) - mitigatedByArmor;
          result.mitigationAmount = mitigatedByArmor;
          return result;
        case 'hit':
          result.status = 'hit';
          result.damageAmount = damageAmount - mitigatedByArmor;
          result.mitigationAmount = mitigatedByArmor;
          return result;
      }
    }

    /**
     * pushCombatObjectToLog
     *
     * @param  {Character} character
     * @param  {object} combatObject
     * @returns {array} new combat log
     */
    this.pushCombatObjectToLog = function(combatObject = {}) {
      // add object to combat log
      const oldCombatLog = this.getCombatLog();
      const newCombatLog = oldCombatLog.splice([]).concat([combatObject]);
      this.setCombatLog(newCombatLog);
      return newCombatLog;
    }

    /**
    * isInCombat - flag
    *
    * @returns {bool} true = in combat
    */
    this.isInCombat = function() {
      const myName = character.getName();
      let result = false;
      // get list of enemies in area
      const enemies = character.target.scanForEnemies(100);
      enemies.forEach(enemy => {
        // get threat table
        const threatTable = enemy.combat.getThreatTable();
        // search threat table for mention of self
        threatTable.forEach(entry => {
          if (entry.name === myName) result = true;
        })
      })
      // if not on any, return false
      return result;
    }

    /**
     * isDead
     *
     * @returns {bool}
     */
    this.isDead = function() {
      return character.stat.getHp() <= 0;
    }

    /**
     * getCombatLog
     *
     * @returns {array} of combat objects
     */
    this.getCombatLog = function() {
      return combatLog;
    }

    /**
     * getOnNextAttack - applied to next swing
     *
     * @returns {string} 'heroicStrike'
     */
    this.getOnNextAttack = function() {
      return onNextAttack;
    }

    /**
     * getAutoAttackToggle
     *
     * @returns {bool}
     */
    this.getAutoAttackToggle = function() {
      return autoAttackToggle;
    }

    /**
     * setCombatLog
     *
     * @param  {array} newCombatLog
     * @returns {void}
     */
    this.setCombatLog = function(newCombatLog) {
      combatLog = newCombatLog;
    }

    /**
     * setOnNextAttack - only one can be set
     *
     * @param  {string} newOnNextAttack
     * @returns {void}
     */
    this.setOnNextAttack = function(newOnNextAttack) {
      onNextAttack = newOnNextAttack;
    }

    /**
     * setAutoAttackToggle - switch auto attack on
     * or off
     *
     * @returns {void}
     */
    this.setAutoAttackToggle = function() {
      autoAttackToggle = !autoAttackToggle;
    }

  }
}
