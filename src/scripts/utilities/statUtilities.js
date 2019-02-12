/**
 * getStatFromEquipped - equipped
 *
 * @param  {Character} character
 * @param  {string} stat e.g. 'armor', 'stamina', etc...
 * @returns {number} total of stat equipped
 */
function getStatFromEquipped(character = {}, stat = '') {
  let total = 0;
  const equipped = character.getEquipped();
  for (let item in equipped) {
    if (equipped[item][stat]) {
      total += equipped[item][stat];
    }
  }
  return total;
}

function getStatFromTalents(character = {}) {
  return 0;
}

function getStatFromRace(character = {}) {
  return 0;
}

export {
  getStatFromEquipped,
  getStatFromTalents,
  getStatFromRace
};
