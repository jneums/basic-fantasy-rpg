
/**
 * targetClassUpdate - specific reactions for taking dmg
 *
 * @param  {Character} character
 * @returns {void}
 */
export default function targetClassUpdate (character = {}, combatObject = {}) {
  const targetClass = character.getCharacterClass();
  switch(targetClass) {
    case 'barbarian':
      // dont gain rage from being healed
      if (combatObject.type() !== 'heal')
        character.rage.processRage(combatObject, 'target');
      break;
    default:
      break;
  }
  return combatObject;
}
