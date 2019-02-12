/**
 * checkSwingTimer
 *
 * @param  {Character} character to check
 * @param  {string} hand to use
 * @returns {bool} can attack or not
 */
function checkSwingTimer(character = {}, hand = '') {
  const mainHandSpeed = character.getEquipped().mainHand.speed;
  const offHandSpeed = character.getEquipped().offHand.speed;
  const swingTimer = (hand === 'main')
    ? character.getSwingTimerMainHand()
    : character.getSwingTimerOffHand();
  const weaponSpeed = (hand === 'main')
    ? mainHandSpeed
    : offHandSpeed;
  const weaponSpeedToFrames = weaponSpeed * 60;
  return (swingTimer > weaponSpeedToFrames);
}

/**
 * updateSwingTimers - run on character update
 *
 * @param  {Character} character to update
 * @returns {void}
 */
function updateSwingTimers(character = {}) {
  const swingTimerMainHand = character.getSwingTimerMainHand();
  const swingTimerOffHand = character.getSwingTimerOffHand();
  const newSwingTimerMainHand = swingTimerMainHand + 1;
  const newSwingTimerOffHand = swingTimerOffHand + 1;
  character.setSwingTimerMainHand(newSwingTimerMainHand);
  character.setSwingTimerOffHand(newSwingTimerOffHand);
}

/**
 * resetSwingTimer - resets timer to zero
 *
 * @param  {Character} attacker
 * @param  {string} hand to reset
 * @returns {void}
 */
function resetSwingTimer(attacker = {}, hand = '') {
  if (hand === 'main') {
    attacker.setSwingTimerMainHand(0);
  } else if (hand === 'off') {
    attacker.setSwingTimerOffHand(0);
  }
}

export {
  checkSwingTimer,
  updateSwingTimers,
  resetSwingTimer,
};
