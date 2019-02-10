/**
 * getMeleeAttackPower - of character
 *
 * @param  {character} character to parse
 * @returns {number} total attack power from stats
 */
function getMeleeAttackPower(character = {}) {
  let total = 0;
  const strength = character.getStrength();
  const agility = character.getAgility();
  const characterClass = character.getCharacterClass();
  switch(characterClass) {
    case 'druid':
    case 'paladin':
    case 'shaman':
    case 'warrior':
      total += strength * 2;
      break;
    case 'hunter':
    case 'mage':
    case 'priest':
    case 'rogue':
    case 'warlock':
      total += strength * 1;
      break;
    default:
      break;
  }
  switch(characterClass) {
    case 'druid':
    case 'hunter':
    case 'rogue':
      total += agility * 1;
      break;
    default:
      break;
  }
  return total;

}

export { getMeleeAttackPower };
