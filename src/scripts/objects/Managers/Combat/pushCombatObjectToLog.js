/**
 * pushCombatObjectToLog - add to the combat log of
 * the character calling
 *
 * @param  {Character} character
 * @param  {object} combatObject
 * @returns {array} new combat log
 */
export default function pushCombatObjectToLog (character = {}, combatObject = {}) {
  // add object to combat log
  const oldCombatLog = character.combat.getCombatLog();
  const newCombatLog = oldCombatLog.splice([]).concat([combatObject]);
  character.combat.setCombatLog(newCombatLog);
  return newCombatLog;
}
