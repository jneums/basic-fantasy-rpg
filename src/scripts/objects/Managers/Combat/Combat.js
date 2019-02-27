import meleeAttackObject from './meleeAttack';
import buildCombatObject from './buildCombatObject';
import processCombatObject from './processCombatObject';


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
        if (canAttackWithMainHand) {
          const meleeCombatObject = meleeAttackObject(character, target, 'main', 'autoAttack');
          // send combatObject to be used:
          processCombatObject(character, target, meleeCombatObject);
          // return object for debugging
        }
        const canAttackWithOffHand = character.timer.checkSwingTimer('off');
        // if offhand has damage key, must be a weapon.
        if (canAttackWithOffHand && character.equipment.isDualWielding()) {
          meleeAttackObject(character, target, 'off', 'autoAttack');
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
    * inCombat - based on threat tables.
    * if threat tables are not working, this will
    * not work either.
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

  /**
   * setCombatLog
   *
   * @param  {array} newCombatLog
   * @returns {void}
   */
  setCombatLog (newCombatLog) {
    this.combatLog = newCombatLog;
  }


}
