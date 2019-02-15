export default class KeyMap {
  constructor(character) {
    let one = character.ability.charge;
    let two = character.ability.rend;
    let three = character.ability.heroicStrike;
    let four = character.combat.setAutoAttackToggle;
    let five = character.ability.battleShout;
    let six = character.ability.thunderClap;
    let seven = '';
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
