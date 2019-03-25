export default class Quest {
  constructor(
    id = 1,
    title = "",
    difficulty = "",
    type = "",
    amount = 0,
    target = "",
    initText = [],
    inProgressText = [],
    finishText = [],
    description = [],
    reward = {}
  ) {

    let _id = id;

    this.getId = function() {
      return _id;
    }

    this.title = title;

    this.description = description;

    // for UI elements:
    this.getColor = function() {
      if (difficulty === 'easy') return 'green';
      else if (difficulty === 'medium') return 'yellow';
      else return 'red';
    }

    let _status = 0;

    this.advanceStatus = function() { _status++ }

    this.getStatus = function() {
      if (_status === 0) return 'not given';
      else if (_status === 1) return 'in progress';
      else if (_status === 2) return 'ready for turn in';
      else return 'completed';
    };

    this.getText = function(phase = 0) {
      if (phase === 0) return initText;
      else if (phase === 1) return inProgressText;
      else return finishText;
    }

    // used for UI:
    this.peekReward = function() {
      return reward;
    }

    this.takeReward = function(character = {}) {
      character.inventory.add(reward);
    }

    let _type = type;

    this.getType = function() {
      return _type;
    }

    // who to kill, or what to aquire:
    this.getTarget = function() {
      return target;
    }

    let _amount = amount;

    let _counter = 0;


    // increment counter:
    this.incCounter = function() {

      // is quest is finished, early return:
      if (this.getStatus() === 'completed') return;

      // this increment will complete requirements:
      if (_counter + 1 === _amount) {

        _counter++;
        this.advanceStatus();

        // otherwise increment normally:
      } else if (_counter + 1 < _amount){

        _counter++;

      }

    };

    this.getCount = function() {
      return `${_counter}/${_amount}`;
    }


    // use for presenting progress to user:
    // plural or singular, and case:
    this.getUIName = function() {
      let formattedName = this.getTarget();

      // plural or singular:
      if (_amount > 1) {
        // append an 's
        formattedName = formattedName.concat("s")
      }

      // uppercase first letter in each word:
      // e.g. shattered crystal goblet -> Shattered Crystal Goblet's
      return toTitleCase(formattedName)
    }

  }

}

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
