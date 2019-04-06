export default function statusMod(attacker = {}, target = {}, combatObject = {}) {
  // values used to determine mitigation amount
  const amount = combatObject.amount();
  const mitigatedByArmor = amount * attacker.stat.armorMitigationPercent(target);
  const blockValue = target.stat.baseBlockV();
  // updates combatObject depending on status of the attack:
  switch(combatObject.status()) {
    case 'miss':
      combatObject.setAmount(0);
      combatObject.setMitigationAmount(amount);
      break;
    case 'dodge':
      combatObject.setAmount(0);
      combatObject.setMitigationAmount(amount);
      break;
    case 'parry':
      combatObject.setAmount(0);
      combatObject.setMitigationAmount(amount);
      break;
    case 'glancing':
      combatObject.setMitigationAmount(amount * .3);
      combatObject.setAmount(amount * .7);
      break;
    case 'blocked':
      combatObject.setMitigationAmount(blockValue); // get block from stats/items/talents as well!
      combatObject.setAmount(amount - blockValue);
      break;
    case 'crit':
      if (combatObject.type() === 'wand' || combatObject.type() === 'magic') {
        combatObject.setAmount(amount * 2);
      } else {
        combatObject.setAmount((amount * 2) - mitigatedByArmor);
        combatObject.setMitigationAmount(mitigatedByArmor);
      }
      break;
    case 'hit':
      if (combatObject.type() === 'wand') {
        combatObject.setAmount(amount);
      } else {
        combatObject.setAmount(amount - mitigatedByArmor);
        combatObject.setMitigationAmount(mitigatedByArmor);
      }
    break;
    default:
      break;
  }
  return combatObject;
}
