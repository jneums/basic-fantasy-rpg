import { getRandomIntInclusive } from './randomNumberUtilities';


/**
 * selectDie - pick how many sides
 *
 * @param  {number} sides of die
 * @returns {function}
 */
function selectDie(sides = 6) {
  let min = 1;
  let max = sides;

  /**
   * rollDice - pick how many dice
   *
   * @param  {number} quantity of dice
   * @returns {type} sum of dice rolled
   */
  return function(quantity = 1) {
    let total = 0;
    while (quantity--) {
      total += getRandomIntInclusive(min, max);
    }
    return total;
  }
}


export default selectDie;
