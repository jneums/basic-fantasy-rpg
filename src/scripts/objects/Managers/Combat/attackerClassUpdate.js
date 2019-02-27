/**
 * attackerClassUpdate - specific modifiacations to combat
 *
 * @param  {Character} attacker
 * @param  {object} combatObject info about attack
 * @returns {object} modified combatObject
 */
export default function attackerClassUpdate (attacker = {}, newCombatObject = {}) {
  const attackerClass = attacker.getCharacterClass();
  switch(attackerClass) {
    case 'barbarian':
      // add heroic strike onto next melee hit
      const onNextAttack = attacker.combat.getOnNextAttack();
      // on each auto attack:
      if (newCombatObject.type === 'autoAttack') {
        // except if the next auto attack has a heroic strike
        if (onNextAttack === 'heroicStrike') {
          // spend rage, if there is not enough, dont do anything
          if (attacker.rage.spendRage(15)) {
            // heroic strike deals increased threat, and 11
            // extra damage:
            newCombatObject.amount += 11;
            newCombatObject.bonusThreat += 20;
            // reset, so nextAttack doenst trigger
            const newOnNextAttack = '';
            attacker.combat.setOnNextAttack(newOnNextAttack);
            return newCombatObject;
          }
        }
        // generate rage on auto attacks, not on specials
        attacker.rage.processRage(newCombatObject, 'attacker');
      }
      return newCombatObject;
    default:
      return newCombatObject;
  }
}
