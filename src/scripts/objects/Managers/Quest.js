export default class Quest {
  constructor(
    title = "",
    type = "",
    amount = 0,
    target = "",
    initText = [],
    inProgressText = [],
    finishText = [],
    description = [],
    reward = {}
  ) {
    this.id = 1;

    this.title = title;
    this.description = description;

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

    this.peekReward = function() {
      return reward;
    }

    this.takeReward = function(character = {}) {
      character.inventory.add(reward);
    }

    let _type = type;
    this.changeType = function(newType = "") {
      _type === newType;
    }
    this.getType = function() {
      return _type;
    }

    this.getTarget = function() {
      return target;
    }

    let _amount = amount;
    let _counter = 0;
    this.incCounter = function() {
      if (_counter + 1 === _amount) {
        _counter++;
        this.advanceStatus();
      } else if (_counter + 1 < _amount){
        _counter++;
      } else {
        return;
      }
    };

    this.getCount = function() {
      return `${_counter} / ${_amount}`;
    }

  }

}
