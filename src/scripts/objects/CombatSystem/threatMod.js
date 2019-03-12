export default function threatMod (attacker = {}, target = {}, combatObject = {}) {
  if (combatObject.type() === 'eat' || combatObject.type() === 'drink') return;
  attacker.threat.updateTargetThreatTable(target, combatObject);
}
