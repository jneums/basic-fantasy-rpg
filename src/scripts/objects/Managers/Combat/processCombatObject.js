import pushCombatObjectToLog from './pushCombatObjectToLog';
import attackerClassUpdate from './attackerClassUpdate';
import targetClassUpdate from './targetClassUpdate';
import processHealth from './processHealth';
import FloatingText from '../FloatingText/FloatingText';


/**
 * processCombatObject - take dmg, add to log, add rage,
 * modify threat table, create scrolling text, etc.
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {object} combatObject
 * @returns {void}
 */
export default function processCombatObject (attacker = {}, target = {}, combatObject = {}) {
  // if player is not tapped,
  const owner = target.tapped();
  if (!owner) {
    target.setTapped(attacker);
  }
  let newCombatObject = Object.assign({}, combatObject);
  // give combatants a chance to modify the combat object
  newCombatObject = attackerClassUpdate(attacker, newCombatObject);
  newCombatObject = targetClassUpdate(target, newCombatObject);
  // create floating text:
  const text = new FloatingText(attacker.scene, {
      text: -1 * Math.round(newCombatObject.amount),
      animation: "physics",
      parentObj: target,
      combatObject: newCombatObject,
      side: (attacker.flipX) ? -1: 1
  });
  // add object to the combat logs
  pushCombatObjectToLog(attacker, newCombatObject);
  pushCombatObjectToLog(target, newCombatObject);
  // update threat table
  attacker.threat.updateTargetThreatTable(target, newCombatObject);
  // take dmg according to the final combat object
  processHealth(attacker, target, newCombatObject);
}
