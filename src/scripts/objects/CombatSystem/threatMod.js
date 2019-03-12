export default function threatMod (attacker = {}, target = {}, combatObject = {}) {
  if (combatObject.type() === 'eat' || combatObject.type() === 'drink') {
    return;
  } else if (combatObject.type() === 'heal') {
    // split threat between allies threat table:
    const targets = target.threat.threatTable().map(entry => entry.character);
    targets.forEach(enemy => {
      attacker.threat.updateTargetThreatTable(enemy, combatObject);
    })
  } else {
    attacker.threat.updateTargetThreatTable(target, combatObject);

  }
}
