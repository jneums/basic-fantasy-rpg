
/**
 * targetClassUpdate - specific reactions for taking dmg
 *
 * @param  {Character} character
 * @returns {void}
 */
export default function targetClassUpdate (character = {}, combatObject = {}) {
  if (!character.getCharacterClass()) return;
  const targetClass = character.getCharacterClass();
  if (combatObject.type() === 'eat' || combatObject.type() === 'drink') return;


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
