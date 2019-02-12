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
 * @param  {Character} character performing the search
 * @param  {array} enemies character array
 * @returns {Character} reference to closest enemy
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
 * @param  {Character} character performing the search
 * @param  {array} allies character array
 * @returns {Character} lowest health ally
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
 * @param  {Character} character who performs scan
 * @returns {array} array of visible enemies
 */
function scanForEnemies(character = {}) {
  return character.scene.children.list.filter(child =>
    child.getTeam() !== character.getTeam())
}

/**
 * scanForAllies
 *
 * @param  {Character} character who performs scan
 * @returns {array} array of visible allies
 */
function scanForAllies(character = {}) {
  return character.scene.children.list.filter(child =>
    child.getTeam() === character.getTeam())
}

/**
 * rangeCheck - is target close enough
 *
 * @param  {Character} character performing range check
 * @param  {Character} target is wihin distance?
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
 * checkForTwoHandWeapon
 *
 * @param  {Character} character to check
 * @returns {bool} true if using 2h
 */
function checkForTwoHandWeapon(character = {}) {
  const weaponSlot = character.getEquipped().mainHand.slot;
  return weaponSlot === 'two-hand';
}

export {
  corpseDisposal,
  getClosestEnemy,
  getLowestHealthAlly,
  scanForEnemies,
  scanForAllies,
  rangeCheck,
  checkForTwoHandWeapon
};
