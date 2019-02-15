/**
 * getRandomCoordsOnCanvas - generate valid random x, y
 *
 * @param  {number} width of game object
 * @param  {number} height of game object
 * @returns {array} array[0] = x, array[1] = y
 */
function getRandomCoordsOnCanvas(width = 0, height = 0) {
  const x = Phaser.Math.Between(0, width);
  const y = Phaser.Math.Between(0, height);
  return [x,y];
}

export { getRandomCoordsOnCanvas }
