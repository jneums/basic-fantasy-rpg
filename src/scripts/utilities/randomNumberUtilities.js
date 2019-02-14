/**
 * getRandomIntInclusive
 *
 * @param  {number} min minimum in range
 * @param  {number} max maximum in range
 * @returns {number} random number
 */
function getRandomIntInclusive(min = 0, max = 6) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * getRandomCoordsOnCanvas - generate valid random x, y
 *
 * @param  {number} width of game object
 * @param  {number} height of game object
 * @returns {array} array[0] = x, array[1] = y
 */
function getRandomCoordsOnCanvas(width = 0, height = 0) {
  const x = getRandomIntInclusive(0, width);
  const y = getRandomIntInclusive(0, height);
  return [x,y];
}

export { getRandomIntInclusive, getRandomCoordsOnCanvas }
