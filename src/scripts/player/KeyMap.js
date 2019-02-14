export default class KeyMap {
  constructor(character) {
    let one = character.ability.heroicStrike;
    let two = character.combat.setAutoAttackToggle;
    let three = '';
    let four = '';
    let five = '';
    let six = '';
    let seven = '';
    let eight = '';
    let nine = '';

    this.executeOne = function() {
      one.call(character)
    }

    this.executeTwo = function() {
      two.call(character)
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
