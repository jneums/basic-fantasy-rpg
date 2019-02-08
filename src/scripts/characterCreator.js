// helper functions for character creation.
import { getRandomIntInclusive } from './randomNumberUtilities';
// takes char object, minimum and maximum
// range for random numbers
// no return
function randomizeAllStats(char = {}, min = 1, max = 18) {
  char.setStr(getRandomIntInclusive(min, max))
  char.setDex(getRandomIntInclusive(min, max))
  char.setCon(getRandomIntInclusive(min, max))
  char.setInt(getRandomIntInclusive(min, max))
  char.setWis(getRandomIntInclusive(min, max))
  char.setCha(getRandomIntInclusive(min, max))
}

// takes char object and string representing which stat
// to randomize. takes min and max for random number
// range.
function randomizeSpecificStat(char = {}, stat = '', min = 1, max = 18) {
  let newNumber = getRandomIntInclusive(min, max)
  switch(stat) {
    case 'str':
      char.setStr(newNumber);
      break;
    case 'dex':
      char.setDex(newNumber);
      break;
    case 'con':
      char.setCon(newNumber);
      break;
    case 'int':
      char.setInt(newNumber);
      break;
    case 'wis':
      char.setWis(newNumber);
      break;
    case 'cha':
      char.setCha(newNumber);
      break;
    default:
      break;
  }
}

export { randomizeAllStats, randomizeSpecificStat }
