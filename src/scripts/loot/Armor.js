import Item from './Item';

const COLORS = {
  0: 'grey',
  1: 'yellow',
  2: 'green',
  3: 'blue',
  4: 'purple',
  5: 'red',
  6: 'brown'
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

    // increase lvl:
    this.lvlUp = function() {
      _ilvl += 1;
      _sell *= 1.5;
      _color.inc();
    }


    this.getColor = function() {
      return _color.current;
    }


    let _colorIndex = 0;

    let _color = {
      current: COLORS[_colorIndex],
      inc: () => _colorIndex++
    };

  }
}
