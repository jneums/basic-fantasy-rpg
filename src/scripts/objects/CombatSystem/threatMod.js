export default function threatMod (attacker = {}, target = {}, combatObject = {}) {
  attacker.threat.updateTargetThreatTable(target, combatObject);
}
