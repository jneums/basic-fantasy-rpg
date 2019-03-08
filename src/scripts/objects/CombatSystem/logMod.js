export default function logMod (attacker = {}, target = {}, combatObject = {}) {
  attacker.combat.addToLog(combatObject);
  target.combat.addToLog(combatObject);
}
