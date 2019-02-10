
/**
 * getPriestSpellByName
 *
 * @param  {string} name of spell
 * @returns {object} spell
 */
function getPriestSpellByName(name = '') {
  return priestSpells.filter(spell => spell.name === name)[0];
}

export { getPriestSpellByName };

const priestSpells = [
  {
    name: 'cure-light-wounds',
    range: 50,
    speed: 3,
    type: 'heal',
    die: { sides: 6, quantity: 1, bonus: 1 },
    cooldown: 0
  }

]
