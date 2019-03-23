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

  // keeps barbarian from gaining rage from eating/drinking:
  if (combatObject.type() === 'eat' || combatObject.type() === 'drink') return;

  switch(attackerClass) {

    case 'barbarian':

      // on each auto attack:
      if (combatObject.type() === 'autoAttack') {

        // except if the next auto attack has a savage blow:
        const onNextAttack = attacker.combat.getOnNextAttack();

        if (onNextAttack === 'savageBlow') {
          if(!attacker.rage.spendRage(15)) return;
          // savage blow deals increased threat, and 11 extra damage:
          combatObject.setAmount(combatObject.amount() + 11);
          combatObject.setBonusThreat(combatObject.bonusThreat() + 20);

          // reset, so nextAttack doenst trigger again:
          const newOnNextAttack = '';
          attacker.combat.setOnNextAttack(newOnNextAttack);
          break;

        }
        // generate rage on auto attacks, not on specials
        attacker.rage.processRage(combatObject, 'attacker');
        break;
      }

    default:
      break;
    }

}
