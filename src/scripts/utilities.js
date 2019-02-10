/**
 * corpseDisposal
 *
 * @param  {scene} scene which scene to search
 * @returns {array} of characters that were removed
 */
function corpseDisposal(scene = {}) {
  if (scene.children)
    return scene.children.list.filter(child => child.getHp() <= 0)
      .map((deadChild) => {
        const deadChildCopy = Object.assign(deadChild);
        deadChild.destroy()
        return deadChildCopy;
      })
}

/**
 * getClosestEnemy
 *
 * @param  {character} character performing the search
 * @param  {array} enemies character array
 * @returns {character} reference to closest enemy
 */
function getClosestEnemy(character = {}, enemies = []) {
  const myCoords = [ character.x, character.y];
  const enemyArray = enemies.concat([]);
  enemyArray.sort((a, b) => {
    const distanceToAX = Math.abs(a.x - myCoords[0]);
    const distanceToBX = Math.abs(b.x - myCoords[0]);
    const distanceToAY = Math.abs(a.y - myCoords[1]);
    const distanceToBY = Math.abs(b.y - myCoords[1]);
    const totalDistanceToA = distanceToAX + distanceToAY;
    const totalDistanceToB = distanceToBX + distanceToBY;
    return totalDistanceToA - totalDistanceToB;
  })
  const closestEnemy = enemyArray[0];
  return closestEnemy;
}

/**
 * getLowestHealthAlly
 *
 * @param  {character} character performing the search
 * @param  {array} allies character array
 * @returns {character} lowest health ally
 */
function getLowestHealthAlly(character = {}, allies = []) {
  const allyArray = allies.concat([]);
  allyArray.sort((a, b) => a.getHp() - b.getHp());
  const lowestHealthAlly = allyArray[0];
  return lowestHealthAlly;
}

/**
 * scanForEnemies
 *
 * @param  {character} character who performs scan
 * @returns {array} array of visible enemies
 */
function scanForEnemies(character = {}) {
  return character.scene.children.list.filter(child =>
    child.getTeam() !== character.getTeam())
}

/**
 * scanForAllies
 *
 * @param  {character} character who performs scan
 * @returns {array} array of visible allies
 */
function scanForAllies(character = {}) {
  return character.scene.children.list.filter(child =>
    child.getTeam() === character.getTeam())
}

/**
 * updateSwingTimer - run on character update
 *
 * @param  {character} character to update
 * @returns {void}
 */
function updateSwingTimer(character = {}) {
  const swingTimerLeftHand = character.getSwingTimerLeftHand();
  const swingTimerRightHand = character.getSwingTimerRightHand();
  const newSwingTimerLeftHand = swingTimerLeftHand + 1;
  const newSwingTimerRightHand = swingTimerRightHand + 1;
  character.setSwingTimerLeftHand(newSwingTimerLeftHand);
  character.setSwingTimerRightHand(newSwingTimerRightHand);
}

/**
 * rangeCheck - is target close enough
 *
 * @param  {character} character performing range check
 * @param  {character} target is wihin distance?
 * @param  {number} distance to check
 * @returns {bool} whether or not target is in distance
 */
function rangeCheck(character = {}, target = {}, distance = 0) {
  const distanceToCheck = distance;
  const isTargetWithinDistance =
    Phaser.Math.Distance.Between(
      character.x, character.y,
      target.x, target.y
    ) < distanceToCheck;
  return isTargetWithinDistance;
}

/**
 * checkSwingTimer
 *
 * @param  {character} character to check
 * @param  {string} hand to use
 * @returns {bool} can attack or not
 */
function checkSwingTimer(character = {}, hand = '') {
  const swingTimer = (hand === 'right')
    ? character.getSwingTimerRightHand()
    : character.getSwingTimerLeftHand();
  const weaponSpeed = (hand === 'right')
    ? character.getRightHand().speed
    : character.getLeftHand().speed;
  const weaponSpeedToFrames = weaponSpeed * 60;
  return (swingTimer > weaponSpeedToFrames);
}


/**
 * checkSpellTimer
 *
 * @param  {character} character owning spell
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
 * resetSpellTimer
 *
 * @param  {character} character who owns timer
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

/**
 * updateSpellTimers - increment each timer
 *
 * @param  {character} character
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
 * checkForTwoHandWeapon
 *
 * @param  {character} character to check
 * @returns {bool} true if using 2h
 */
function checkForTwoHandWeapon(character = {}) {
  const weaponType = character.getRightHand().type;
  const twoHandWeaponTypes = ['twoHandedAxes', 'twoHandedMaces', 'twoHandedSwords', 'polearms', 'staves'];
  return twoHandWeaponTypes.includes(weaponType);
}

export {
  corpseDisposal,
  getClosestEnemy,
  getLowestHealthAlly,
  updateSwingTimer,
  updateSpellTimers,
  resetSpellTimer,
  scanForEnemies,
  scanForAllies,
  rangeCheck,
  checkSwingTimer,
  checkSpellTimer,
  checkForTwoHandWeapon
};
