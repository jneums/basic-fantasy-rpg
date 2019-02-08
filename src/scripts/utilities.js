
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

export { corpseDisposal, getClosestEnemy, getLowestHealthAlly };
