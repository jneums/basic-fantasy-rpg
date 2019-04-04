export default function skillMod(attacker, target, combatObject) {
  // get weapon type attacker was using:
  if (combatObject.status() !== 'hit' && combatObject.status() !== 'crit') return;

  if (!attacker.equipment.equipped()) return;

  const skillType = attacker.equipment.equipped().mainHand.skillType();
  if (!skillType) return;

  // send lvl up signal to skill manager:
  attacker.skills.levelUpSkill(skillType);
}
