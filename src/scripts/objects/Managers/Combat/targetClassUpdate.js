
/**
 * targetClassUpdate - specific reactions for taking dmg
 *
 * @param  {object} combatObject info about attack
 * @returns {void}
 */
export default function targetClassUpdate (character = {}, newCombatObject = {}) {
  const targetClass = character.getCharacterClass();
  switch(targetClass) {
    case 'barbarian':
      // dont gain rage from being healed
      if (newCombatObject.type !== 'heal')
        character.rage.processRage(newCombatObject, 'target');
      return newCombatObject;
    default:
      return newCombatObject;
  }
}
