

export default class Item {
  constructor(
    _name,
    _description,
    _ilvl,
    _cost,
    _sell,
    _type,
    _qty,
    _max,
    _icon,
    _action = null
  ) {

    this.getAction = function() {
      return _action;
    }

    this.lvl = function() {
      return _ilvl;
    }
    this.setSell = function(sell) {
      _sell = sell;
    }
    this.sellPrice = function() {
      return _sell;
    }

    this.getDescription = function() {
      return _description;
    }

    this.getType = function() {
      return _type;
    }

    this.getColor = function() {
      return 'brown';
    }

    this.getTint = function() {
      // light brown;
      return 0x8d6845;
    }

    this.getIcon = function() {
      return _icon;
    }


    this.getName = function() {
      return _name;
    }

    this.getQty = function() {
      return _qty;
    }

    this.getMax = function() {
      return _max;
    }


    // buy:
    this.buy = function(buyer) {
      buyer.inventory.removeCrystals(_cost);
      buyer.inventory.add(this);

    }

    // sell:
    this.sell = function(seller) {
      seller.inventory.discardActive();
      seller.inventory.addCrystals(_sell);
    }

    this.setQty = function(qty) {
      _qty = qty;
    }

    // inc:
    this.inc = function() {
      ++_qty;
    }

    // dec:
    this.dec = function() {
      --_qty;
    }

  }
}
