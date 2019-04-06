import Item from './Item';

const COLORS = {
  0: 'grey',
  1: 'yellow',
  2: 'green',
  3: 'blue',
  4: 'purple',
  5: 'red',
}

const TINTS = {
  'grey': 0x88776f,
  'yellow': 0xdbc244,
  'green': 0x649154,
  'blue': 0x5ba3c7,
  'purple': 0x944a9c,
  'red': 0xaa3333,
}

export default class Armor extends Item {
  constructor(
    _name,
    _description,
    _armor,
    _statBonus,
    _ilvl,
    _cost,
    _sell,
    _slot,
    _skillType,
    _durability,
    _repairCost,
    _icon
  ) {
    super(
      _name,
      _description,
      _ilvl,
      _cost,
      _sell,
      'armor',
      1,
      1,
      _icon
    );


    this.armor = function() {
      return _armor;

    }

    this.statBonus = function() {
      return _statBonus;
    }

    this.slot = function() {
      return _slot;
    }

    this.skillType = function() {
      return _skillType;
    }

    this.upgrade = function(crystals) {
      let result = {
        data: '',
        success: false
      }
      
      if (_colorIndex === 5) {
        result.data = 'no more upgrades';
        return result;
      };

      if (_colorIndex === 5) return;

      // rand:
      const rand = Phaser.Math.Between(0, 101);
      const crystalCoEf = crystals * .01;

      // each possible outcome:
      const insaneChange = .05 + crystalCoEf;
      const largeChange = insaneChange + 1.5 + crystalCoEf;
      const mediumChange = largeChange + 2.5 + crystalCoEf;
      const smallChange = mediumChange + 5 + crystalCoEf;

      // hit table:
      switch (true) {
        case (rand < insaneChange):
          _statBonus.main.val += 2;
          _statBonus.secondary.val += 1;
          _armor += 5;
          _colorIndex++;
          this.setSell(_sell += 4);

          result.data = `armor + 5, ${_statBonus.main.stat} + 2, ${_statBonus.secondary.stat} + 1.`
          result.success = true;
          return result;


        case (rand < largeChange):
          _statBonus.main.val += 1;
          _statBonus.secondary.val += 1;
          _armor += 5;
          _colorIndex++;
          this.setSell(_sell += 3);

          result.data = `armor + 1, ${_statBonus.main.stat} + 1, ${_statBonus.secondary.stat} + 1.`
          result.success = true;
          return result;


        case (rand < mediumChange):
          _statBonus.main.val += 1;
          _armor += 5;
          _colorIndex++;
          this.setSell(_sell += 2);

          result.data = `armor + 1, ${_statBonus.main.stat} + 1.`
          result.success = true;
          return result;

        case (rand < smallChange):
          _armor += 5;
          _colorIndex++;
          this.setSell(_sell += 1);

          result.data = `armor + 1.`
          result.success = true;
          return result;

        default:
          //
          result.data = `failed.`
          return result;
      }

    }


    this.getColor = function() {
      return COLORS[_colorIndex];
    }

    this.getTint = function() {
      return TINTS[COLORS[_colorIndex]]
    }


    let _colorIndex = 0;


  }
}
