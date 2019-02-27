/**
 * buildMeleeCombatObject - contains info about attack
 *
 * @param  {attacker} target
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
 export default function buildCombatObject (
   attacker = {},
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
    attacker: attacker.getName(),
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
  const mitigatedByArmor = amount * attacker.stat.armorMitigationPercent(target);
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
