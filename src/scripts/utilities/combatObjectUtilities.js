import { armorMitigationPercent } from './calculators';
import { attackerClassUpdate, targetClassUpdate } from './combatUpdates';
/**
 * buildMeleeCombatObject - contains info about attack
 *
 * @param  {Character} attacker
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
function buildMeleeCombatObject(attacker = {}, target = {}, status = '', type = '', damageAmount = 0, hand = '') {
  // destructure
  let result = {
    attacker: attacker.getName(),
    target: target.getName(),
    status: status,
    type: type,
    damageType: 'physical',
    damageAmount: damageAmount,
    mitigationAmount: 0,
    hand: hand,
    time: Date.now()  // add time from Phaser?
  }
  const mitigatedByArmor = damageAmount * armorMitigationPercent(attacker, target);
  const blockValue = target.getBlockValue();
  switch(status) {
    case 'miss':
      result.status = 'miss';
      result.mitigationAmount = damageAmount;
      return result;
    case 'dodge':
      result.status = 'dodge';
      result.mitigationAmount = damageAmount;
      return result;
    case 'parry':
      result.status = 'parry';
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
function pushCombatObjectToLog(character = {}, combatObject = {}) {
  // add object to combat log
  const oldCombatLog = character.getCombatLog();
  const newCombatLog = oldCombatLog.splice([]).concat([combatObject]);
  character.setCombatLog(newCombatLog);
  return newCombatLog;
}

/**
 * processDamageFromCombatObject
 *
 * @param  {Character} character
 * @param  {object} combatObject
 * @returns {void}
 */
function processDamageFromCombatObject(attacker = {}, target = {}, combatObject = {} ) {
  const damage = combatObject.damageAmount;
  const oldHp = target.getHp();
  const newHp = oldHp - damage;
  target.setHp(newHp);
  console.log(`${target.getName()} took ${damage} dmg, has ${newHp} hp left`)
}

/**
 * processCombatObject - take dmg,to log, add rage, etc.
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {object} combatObject
 * @returns {void}
 */
function processCombatObject(attacker = {}, target = {}, combatObject = {}) {
  let newCombatObject = Object.assign({}, combatObject);
  // perform changes on attacker
  newCombatObject = attackerClassUpdate(attacker, newCombatObject);
  newCombatObject = targetClassUpdate(target, newCombatObject);
  // perform changes on target
  pushCombatObjectToLog(attacker, newCombatObject);
  pushCombatObjectToLog(target, newCombatObject);
  processDamageFromCombatObject(attacker, target, newCombatObject);
}

export { buildMeleeCombatObject, processCombatObject };
