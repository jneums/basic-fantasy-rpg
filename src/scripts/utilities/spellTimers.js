/**
 * checkSpellTimer
 *
 * @param  {Character} character owning spell
 * @param  {object} spell to check
 * @returns {bool} true if can be cast
 */
function checkSpellTimer(character = {}, spell = {}) {
  const spellTimer = character.getSpellTimers()
    .filter(a => a.name === spell.name)[0].time;
  const spellSpeed = spell.speed;
  const spellSpeedToFrames = spellSpeed * 60;
  return (spellTimer > spellSpeedToFrames);
}

/**
 * updateSpellTimers - increment each timer
 *
 * @param  {Character} character
 * @returns {array} of spell timers
 */
function updateSpellTimers(character = {}) {
  const oldSpellTimers = character.getSpellTimers();
  const newSpellTimers = oldSpellTimers.map((timer) => {
    const newTime = timer.time + 1;
    const newTimer = Object.assign({}, { name: timer.name, time: newTime });
    return newTimer;
  })
  character.setSpellTimers(newSpellTimers);
  return newSpellTimers;
}

/**
 * resetSpellTimer
 *
 * @param  {Character} character who owns timer
 * @param  {string} spell name of spell
 * @returns {object} new timer object
 */
function resetSpellTimer(character = {}, spell = '') {
  const oldSpellTimers = character.getSpellTimers();
  const newTimer = Object.assign({}, { name: spell, time: 0 });
  const newSpellTimers = oldSpellTimers.filter(a => a.name !== spell);
  newSpellTimers.push(newTimer);
  character.setSpellTimers(newSpellTimers);
  return newTimer;
}

export { 
  checkSpellTimer,
  updateSpellTimers,
  resetSpellTimer
};
