
/**
 * getClericSpellByName
 *
 * @param  {string} name of spell
 * @returns {object} spell
 */
function getClericSpellByName(name = '') {
  return clericSpells.filter(spell => spell.name === name)[0];
}

export { getClericSpellByName };

const clericSpells = [
  {
    name: 'cure-light-wounds',
    range: 50,
    speed: 3,
    type: 'heal',
    healing: { min: 1, max: 6 },
    cooldown: 0
  }

]
