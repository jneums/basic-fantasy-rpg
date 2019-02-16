export default class Combat {
  constructor(character) {

    // array of combat objects
    let combatLog = [];
    // que an event to land on next auto attack
    let onNextAttack = '';
    // should auto attack or not
    let autoAttackToggle = true;
    // attack speed modifier
    let attackSpeed = 1;

    /**
     * attackSpd - total, used for swing timers
     *
     * @returns {number} modifier for swing time
     */
    this.attackSpd = function() {
      const base = this.baseAttackSpd();
      const equipped = character.equipment.statBonus('attackSpeed')
        ? character.equipment.statBonus('attackSpeed')
        : 1;
      const buffs = character.buffs.statBonus('attackSpeed')
        ? character.buffs.statBonus('attackSpeed')
        : 1;
      // const talents = character.talents.statBonus('attackSpeed');
      return base * equipped * buffs;
    }

    /**
     * baseAttackSpd - used to calculate total
     *
     * @returns {number}  modifier
     */
    this.baseAttackSpd = function() {
      return attackSpeed;
    }

    /**
     * setattackSpd - default at 100%
     *
     * @param  {number} newSpeed percent
     * @returns {void}
     */
    this.setAttackSpd = function(newSpeed = 1) {
      attackSpeed = newSpeed;
    }

    /**
     * isStunned - used by update loop
     *
     * @returns {type}  description
     */
    this.isStunned = function() {
      return character.buffs.has('stun');
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
          if (newCombatObject.type === 'autoAttack') {
            if (onNextAttack === 'heroicStrike') {
              newCombatObject.damageAmount += 11;
              newCombatObject.bonusThreat += 20;
              const oldRage = character.rage.getRage();
              const rageCost = 15;
              const newRage = oldRage - rageCost;
              character.rage.setRage(newRage)
              const newOnNextAttack = '';
              character.combat.setOnNextAttack(newOnNextAttack);
              return newCombatObject;
            }
            character.rage.processRage(newCombatObject, 'attacker');
          }
          return newCombatObject;
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
          if (newCombatObject.type !== 'heal')
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
      character.threat.updateTargetThreatTable(target, newCombatObject)
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
      const oldHp = target.stat.hp();
      const maxHp = target.stat.maxHp();
      if (oldHp - damage < 0) {
        // target died
        target.stat.setHp(0);
        character.target.setCurrentTarget(undefined);
      } else if (oldHp - damage > maxHp) {
        target.stat.setHp(maxHp);
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
        range: 'melee',
        damageType: 'physical',
        damageAmount: damageAmount,
        bonusThreat: 0,
        mitigationAmount: 0,
        hand: hand,
        time: Date.now()  // add time from Phaser?
      }
      const mitigatedByArmor = damageAmount * character.stat.armorMitigationPercent(target);
      const blockValue = target.stat.baseBlockV();
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
      const enemies = character.target.scanForEnemies(500);
      enemies.forEach(enemy => {
        // get threat table
        const threatTable = enemy.threat.getThreatTable();
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
      return character.stat.hp() <= 0;
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
