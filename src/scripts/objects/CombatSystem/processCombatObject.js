import pushCombatObjectToLog from './pushCombatObjectToLog';
import attackerClassUpdate from './attackerClassUpdate';
import targetClassUpdate from './targetClassUpdate';
import processHealth from './processHealth';
import processStatus from './processStatus';
import createFloatingText from './createFloatingText';

/**
 * processCombatObject - take dmg, add to log, add rage,
 * modify threat table, create scrolling text, etc.
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {object} combatObject
 * @returns {void}
 */
export default function processCombatObject (attacker = {}, target = {}) {
  // if target is not already tapped,
  setTapped(attacker, target);


  // update combat object based on status e.g. mitigation, resistances:
  processStatus(attacker, target, this);

  // give combatants a chance to modify the combat object
  attackerClassUpdate(attacker, this);
  targetClassUpdate(target, this);

  // now that updates to object are done, use final object to
  // modify the characters:
  createFloatingText(attacker, target, this);
  // add object to the combat logs
  pushCombatObjectToLog(attacker, this);
  pushCombatObjectToLog(target, this);
  // update threat table
  attacker.threat.updateTargetThreatTable(target, this);
  // take dmg according to the final combat object
  processHealth(attacker, target, this);
}

function setTapped(attacker, target) {
  const owner = target.tapped();
  if (!owner) {
    target.setTapped(attacker);
  }
}
