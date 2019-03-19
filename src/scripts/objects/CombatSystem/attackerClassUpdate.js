/**
 * attackerClassUpdate - specific modifiacations to combat
 *
 * @param  {Character} attacker
 * @param  {CombatObject} combatObject
 * @returns {void}
 */
export default function attackerClassUpdate (attacker = {}, combatObject = {}) {
  if (!attacker.getCharacterClass()) return;
  const attackerClass = attacker.getCharacterClass();

  if (combatObject.type() === 'eat' || combatObject.type() === 'drink') return;
  switch(attackerClass) {
    case 'barbarian':
      // add heroic strike onto next melee hit
      const onNextAttack = attacker.combat.getOnNextAttack();
      // on each auto attack:
      if (combatObject.type() === 'autoAttack') {
        // except if the next auto attack has a heroic strike
        if (onNextAttack === 'heroicStrike') {
          // spend rage, if there is not enough, dont do anything
          if (attacker.rage.spendRage(15)) {
            // heroic strike deals increased threat, and 11
            // extra damage:
            combatObject.setAmount(combatObject.amount() + 11);
            combatObject.setBonusThreat(combatObject.bonusThreat() + 20);
            // reset, so nextAttack doenst trigger
            const newOnNextAttack = '';
            attacker.combat.setOnNextAttack(newOnNextAttack);
            break;
          }
        }
        // generate rage on auto attacks, not on specials
        attacker.rage.processRage(combatObject, 'attacker');
      }
      break;
    default:
      break;
  }
}
