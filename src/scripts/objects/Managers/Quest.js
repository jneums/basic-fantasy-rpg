import formatDialogue from '../../scenes/formatDialogue';


export default class Quest {
  constructor(
    _id = 1,
    _name = "",
    _difficulty = "",
    _type = "", // kill or find
    _amount = 0,
    _target = "",
    _initText = [],
    _inProgressText = [],
    _finishText = [],
    _description = [],
    _reward = {},
    _xp = 0
  ) {

    this.getId = function() {
      return _id;
    }

    this.getName = function() {
      return _name;
    }

    this.getDescription = function() {
      return formatDialogue(_description, 'quest');
    }

    let _active = false;

    this.setActive = function(bool) {
      _active = bool;
    }

    this.isActive = function() {
      return _active;
    }

    // for UI elements:
    this.getColor = function() {
      if (_difficulty === 'easy') return 'green';
      else if (_difficulty === 'medium') return 'yellow';
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
      if (phase === 0) return formatDialogue(_initText);
      else if (phase === 1) return formatDialogue(_inProgressText);
      else return  formatDialogue(_finishText);
    }

    // used for UI:
    this.peekReward = function() {
      return _reward;
    }

    this.takeReward = function(character = {}) {
      character.inventory.add(_reward);
      character.lvl.gainXP(_xp)
    }

    this.getType = function() {
      return _type;
    }

    // who to kill, or what to aquire:
    this.getTarget = function() {
      return _target;
    }

    this.getAmount = function() {
      return _amount;

    }

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
