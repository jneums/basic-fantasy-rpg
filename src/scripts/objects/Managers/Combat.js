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
      // reset timer right away:
      character.timer.resetSwingTimer(hand);
      // get the attack status roll, e.g. 'hit', 'miss', 'crit'...
      const attackStatus = meleeAutoAttackHitTable(character, target, hand);
      // get the range for the random roll, e.g. { min: 2, max: 5 }
      const weaponsDamageRange = character.equipment.getWeaponDmg(hand);
      // random number between the above range
      let weaponDmg = Phaser.Math.Between(weaponsDamageRange.min, weaponsDamageRange.max);
      // offhand attacks hit for half as much:
      if (hand === 'off') weaponDmg /= 2;
      // formula for auto attack damage:
      const amount = weaponDmg + character.stat.APBonus(hand);
      // build combatObject, used to describe the outcome of the swing
      const combatObject = this.buildCombatObject(
        target,
        attackStatus,
        'autoAttack',
        'melee',
        'physical',
        amount,
        hand
      );
      // send combatObject to be used:
      this.processCombatObject(target, combatObject);
      // return object for debugging
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
          // on each auto attack:
          if (newCombatObject.type === 'autoAttack') {
            // except if the next auto attack has a heroic strike
            if (onNextAttack === 'heroicStrike') {
              // spend rage, if there is not enough, dont do anything
              if (character.rage.spendRage(15)) {
                // heroic strike deals increased threat, and 11
                // extra damage:
                newCombatObject.amount += 11;
                newCombatObject.bonusThreat += 20;
                // reset, so nextAttack doenst trigger
                const newOnNextAttack = '';
                character.combat.setOnNextAttack(newOnNextAttack);
                return newCombatObject;
              }
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
     * processCombatObject - take dmg,to log, add rage, threat table, etc.
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
      character.combat.updateAmount(target, newCombatObject);
    }

    /**
     * updateAmount - modify health and mana for the amount the
     * combat object states
     *
     * @param  {Character} character
     * @param  {object} combatObject
     * @returns {void}
     */
    this.updateAmount = function(target = {}, combatObject = {} ) {
      const amount = combatObject.amount;
      // dont try and restore mana if character doesnt use it
      if (combatObject.type === 'drink' && target.mana) {
        const oldMana = target.mana.mana();
        const maxMana = target.mana.maxMana();
        // make sure there are no overflows
        if (oldMana - amount > maxMana) {
          target.mana.setMana(maxMana);
        } else {
          target.mana.setMana(oldMana - amount);
        }
      } else {
        const oldHp = target.stat.hp();
        const maxHp = target.stat.maxHp();
        if (oldHp - amount < 0) {
          // target died
          target.animations.die();
          target.stat.setHp(0);
          character.target.setCurrentTarget(undefined);
        } else if (oldHp - amount > maxHp) {
          target.stat.setHp(maxHp);
        } else {
          target.stat.setHp(oldHp - amount);
        }
      }
    }

    /**
     * buildMeleeCombatObject - contains info about attack
     *
     * @param  {Character} target
     * @param  {string} status e.g. 'hit', 'miss', 'crit'
     * @param  {string} type e.g. 'melee', 'ranged'
     * @param  {string} range e.g. 'melee', 'ranged'
     * @param  {number} amount
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
      amount = 0,
      hand = ''
    ) {
      // destructure, find a better way to organize this method,
      // split it up into smaller chuncks.
      let result = {
        attacker: character.getName(),
        target: target.getName(),
        status: status,
        type: type, // physical, spell, dot, heal
        range: range,
        damageType: damageType, // physical, frost, holy
        amount: amount,
        bonusThreat: 0,
        mitigationAmount: 0,
        hand: hand,
        time: Date.now()  // add time from Phaser?
      }
      const mitigatedByArmor = amount * character.stat.armorMitigationPercent(target);
      const blockValue = target.stat.baseBlockV();
      switch(status) {
        case 'miss':
          result.status = 'miss';
          result.amount = 0;
          result.mitigationAmount = amount;
        return result;
        case 'dodge':
          result.status = 'dodge';
          result.amount = 0;
          result.mitigationAmount = amount;
        return result;
        case 'parry':
          result.status = 'parry';
          result.amount = 0;
          result.mitigationAmount = amount;
        return result;
        case 'glancing':
          result.status = 'glancing';
          result.mitigationAmount = amount * .3;
          result.amount = amount * .7;
        return result;
        case 'blocked':
          result.status = 'blocked';
          result.mitigationAmount = blockValue; // get block from stats/items/talents as well!
          result.amount = amount - blockValue;
        return result;
        case 'crit':
          result.status = 'crit';
          if (result.type === 'wand') {
            result.amount = (amount * 2);
          } else {
            result.amount = (amount * 2) - mitigatedByArmor;
            result.mitigationAmount = mitigatedByArmor;
          }
        return result;
        case 'hit':
          result.status = 'hit';
          if (result.type === 'wand') {
            result.amount = amount;
          } else {
            result.amount = amount - mitigatedByArmor;
            result.mitigationAmount = mitigatedByArmor;
          }
        return result;
      }
    }

    /**
     * pushCombatObjectToLog - add to the combat log of
     * the character calling
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
    * inCombat - based on threat tables.
    * if threat tables are not working, this will
    * not work either.
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
        const threatTable = enemy.threat.threatTable();
        // search threat table for mention of self
        threatTable.forEach(entry => {
          if (entry.character.getName() === entry.character.getName()) result = true;
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
