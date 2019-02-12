/**
 * updateGlobalCooldown - increment GCD
 *
 * @param  {Character} character to modify
 * @returns {void}
 */
function updateGlobalCooldown(character = {}) {
  const oldGlobalCooldown = character.getGlobalCooldown();
  const newGlobalCooldown = oldGlobalCooldown + 1;
  character.setGlobalCooldown(newGlobalCooldown);
}


export { updateGlobalCooldown };
