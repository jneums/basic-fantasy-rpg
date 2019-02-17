import meleeAutoAttackHitTable from '../../hitTables/meleeAutoAttackHitTable';

export default class Combat {
  constructor(character) {

    // array of combat objects
    let combatLog = [];
    // que an event to land on next auto attack
    let onNextAttack = '';
    // should auto attack or not
    let autoAttackToggle = true;
    // should auto shoot or not
    let autoShootToggle = true;
    // attack speed modifier
    let attackSpeed = 1;

    /**
     * meleeAttack
     *
     * @param  {Character} target
     * @param  {string} hand left or right
     * @returns {object} damage information
     */
    this.meleeAttack = function(target = {}, hand = '', type = '') {
      character.timer.resetSwingTimer(hand);
      const attackStatus = meleeAutoAttackHitTable(character, target, hand);
      const weaponsDamageRange = character.equipment.getWeaponDmg(hand);
      let weaponDmg = Phaser.Math.Between(weaponsDamageRange.min, weaponsDamageRange.max);
      if (hand === 'off') weaponDmg /= 2;
      const damageAmount = weaponDmg + character.stat.APBonus(hand);
      const combatObject = this.buildCombatObject(
        target,
        attackStatus,
        'autoAttack',
        'melee',
        'physical',
        damageAmount,
        hand
      );
      this.processCombatObject(target, combatObject);
      return combatObject;
    }

    /**
     * meleeAutoAttack - wrapper for melee attack.
     * checks each hand swing timer,
     * checks to see if two handed weapon is being used.
     *
     * @param  {Character} character attacking
     * @returns {void}
     */
    this.meleeAutoAttack = function(target = {}) {
      if (!target.combat.isDead()) {
        const canAttackWithMainHand = character.timer.checkSwingTimer('main');
        if (canAttackWithMainHand) this.meleeAttack(target, 'main', 'autoAttack');
        const canAttackWithOffHand = character.timer.checkSwingTimer('off');
        // if offhand has damage key, must be a weapon.
        if (canAttackWithOffHand && character.equipment.isDualWielding()) {
          meleeAttack(character, target, 'off', 'autoAttack');
        }
      }
    }


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
     * setAttackSpd - default at 100%
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
     * @returns {bool}
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
          // add heroic strike onto next melee hit
          const onNextAttack = character.combat.getOnNextAttack();
          if (newCombatObject.type === 'autoAttack') {
            if (onNextAttack === 'heroicStrike') {
              newCombatObject.damageAmount += 11;
              newCombatObject.bonusThreat += 20;
              const oldRage = character.rage.rage();
              const rageCost = 15;
              const newRage = oldRage - rageCost;
              character.rage.setRage(newRage)
              const newOnNextAttack = '';
              character.combat.setOnNextAttack(newOnNextAttack);
              return newCombatObject;
            }
            // generate rage on auto attacks, not on specials
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
          // dont gain rage from being healed
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
      // if player is not tapped,
      const owner = target.tapped();
      if (!owner) {
        target.setTapped(character);
      }
      let newCombatObject = Object.assign({}, combatObject);
      // give combatants a chance to modify the combat object
      newCombatObject = this.attackerClassUpdate(newCombatObject);
      newCombatObject = this.targetClassUpdate(newCombatObject);
      // add object to the combat logs
      character.combat.pushCombatObjectToLog(newCombatObject);
      target.combat.pushCombatObjectToLog(newCombatObject);
      // update threat table
      character.threat.updateTargetThreatTable(target, newCombatObject);
      // take dmg according to the final combat object
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
        character.target.set.currentTarget(undefined);
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
     * @param  {string} range e.g. 'melee', 'ranged'
     * @param  {number} damageAmount
     * @param  {number} mitigationAmount
     * @param  {string} hand
     * @param  {number} time
     * @returns {object}
     * {attacker: "monstrum", target: "leslie", status: "hit",
     *  type: "melee", damageType: "physical", …}
     */
    this.buildCombatObject = function(
      target = {},
      status = '',
      type = '',
      range = '',
      damageType = '',
      damageAmount = 0,
      hand = ''
    ) {
      // destructure
      let result = {
        attacker: character.getName(),
        target: target.getName(),
        status: status,
        type: type, // physical, spell, dot, heal
        range: range,
        damageType: damageType, // physical, frost, holy
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
          if (result.type === 'wand') {
            result.damageAmount = (damageAmount * 2);
          } else {
            result.damageAmount = (damageAmount * 2) - mitigatedByArmor;
            result.mitigationAmount = mitigatedByArmor;
          }
        return result;
        case 'hit':
          result.status = 'hit';
          if (result.type === 'wand') {
            result.damageAmount = damageAmount;
          } else {
            result.damageAmount = damageAmount - mitigatedByArmor;
            result.mitigationAmount = mitigatedByArmor;
          }
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
    * inCombat - flag
    *
    * @returns {bool} true = in combat
    */
    this.inCombat = function() {
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
    this.autoAttack = function() {
      return autoAttackToggle;
    }

    /**
     * getAutoShootToggle
     *
     * @returns {bool}
     */
    this.autoShoot = function() {
      return autoShootToggle;
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
     * setAutoAttack - switch auto attack on
     * or off
     *
     * @returns {void}
     */
    this.setAutoAttack = function() {
      autoAttackToggle = !autoAttackToggle;
    }

    /**
     * setAutoShoot - switch auto shoot on
     * or off
     *
     * @returns {void}
     */
    this.setAutoShoot = function() {
      autoShootToggle = !autoShootToggle;
    }
  }
}
