export default class KeyMap {
  constructor(character) {
    let keys = {
      inventory: {
        ability: character.inventory.use,
        icon: null
      },
      one: {
        ability: character.combat.setAutoAttack,
        icon: 'auto-attack'
      },
      two: {
        ability: null,
        icon: null
      },
      three: {
        ability: null,
        icon: null
      },
      four: {
        ability: null,
        icon: null
      },
      five: {
        ability: null,
        icon: null
      },
      six: {
        ability: null,
        icon: null
      },
      seven: {
        ability: null,
        icon: null
      },
      eight: {
        ability: null,
        icon: null
      },
      nine: {
        ability: null,
        icon: null
      },
      zero: {
        ability: null,
        icon: null
      }
    }

    this.getIcons = function() {
      return Object.keys(keys).filter(key => key !== 'inventory').map(obj => keys[obj].icon);
    }
    this.executeOne = function() {
      keys.one.ability.call(character)
    }

    this.executeTwo = function() {
      keys.two.ability.call(character)
    }

    this.executeThree = function() {
      keys.three.ability.call(character)
    }

    this.executeFour = function() {
      keys.four.ability.call(character)
    }

    this.executeFive = function() {
      keys.five.ability.call(character)
    }

    this.executeSix = function() {
      keys.six.ability.call(character)
    }

    this.executeSeven = function() {
      keys.seven.ability.call(character)
    }

    this.executeEight = function() {
      keys.eight.ability.call(character)
    }

    this.executeNine = function() {
      keys.nine.ability.call(character)
    }

    this.executeInventoryOne = function() {
      inventory.call(character.inventory, 0)
    }

    this.executeInventoryTwo = function() {
      inventory.call(character, 1)
    }

    this.executeInventoryThree = function() {
      inventory.call(character.inventory, 2)
    }

    this.executeInventoryFour = function() {
      inventory.call(character.inventory, 3)
    }

    this.executeInventoryFive = function() {
      inventory.call(character.inventory, 4)
    }

    this.executeInventorySix = function() {
      inventory.call(character.inventory, 5)
    }

    this.executeInventorySeven = function() {
      inventory.call(character.inventory, 6)
    }

    this.executeInventoryEight = function() {
      inventory.call(character.inventory, 7)
    }

    this.executeInventoryNine = function() {
      inventory.call(character.inventory, 8)
    }

    this.getOne = function() {
      return one;
    }

    this.getTwo = function() {
      return two;
    }

    this.getThree = function() {
      return three;
    }

    this.getFour = function() {
      return four;
    }

    this.getFive = function() {
      return five;
    }

    this.getSix = function() {
      return six;
    }

    this.getSeven = function() {
      return seven;
    }

    this.getEight = function() {
      return eight;
    }

    this.getNine = function() {
      return nine;
    }

    this.setOne = function(newKey) {
      keys.one = newKey;
    }

    this.setTwo = function(newKey) {
      keys.two = newKey;
    }

    this.setThree = function(newKey) {
      keys.three = newKey;
    }

    this.setFour = function(newKey) {
      keys.four = newKey;
    }

    this.setFive = function(newKey) {
      keys.five = newKey;
    }

    this.setSix = function(newKey) {
      keys.six = newKey;
    }

    this.setSeven = function(newKey) {
      keys.seven = newKey;
    }

    this.setEight = function(newKey) {
      keys.eight = newKey;
    }

    this.setNine = function(newKey) {
      keys.nine = newKey;
    }
  }
}
