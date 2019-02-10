
/**
 * getMageSpellByName
 *
 * @param  {string} name of spell
 * @returns {object} spell
 */
function getMageSpellByName(name = '') {
  return mageSpells.filter(spell => spell.name === name)[0];
}

export { getMageSpellByName };

const mageSpells = [
  {
    name: 'magic-missile',
    range: 200,
    speed: 3,
    type: 'damage',
    die: { sides: 6, quantity: 1, bonus: 1 },
  }
]
