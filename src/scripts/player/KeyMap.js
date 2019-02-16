export default class KeyMap {
  constructor(character) {
    let inventory = character.inventory.use
    let one = character.ability.charge;
    let two = character.ability.rend;
    let three = character.ability.heroicStrike;
    let four = character.combat.setAutoAttack;
    let five = character.ability.battleShout;
    let six = character.ability.thunderClap;
    let seven = character.ability.hamstring;
    let eight = '';
    let nine = '';

    this.executeOne = function() {
      one.call(character)
    }

    this.executeTwo = function() {
      two.call(character)
    }

    this.executeThree = function() {
      three.call(character)
    }

    this.executeFour = function() {
      four.call(character)
    }
    this.executeFive = function() {
      five.call(character)
    }

    this.executeSix = function() {
      six.call(character)
    }

    this.executeSeven = function() {
      seven.call(character)
    }

    this.executeEight = function() {
      eight.call(character)
    }

    this.executeNine = function() {
      nine.call(character)
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
      one = newKey;
    }

    this.setTwo = function(newKey) {
      two = newKey;
    }

    this.setThree = function(newKey) {
      three = newKey;
    }

    this.setFour = function(newKey) {
      four = newKey;
    }

    this.setFive = function(newKey) {
      five = newKey;
    }

    this.setSix = function(newKey) {
      six = newKey;
    }

    this.setSeven = function(newKey) {
      seven = newKey;
    }

    this.setEight = function(newKey) {
      eight = newKey;
    }

    this.setNine = function(newKey) {
      nine = newKey;
    }
  }
}
