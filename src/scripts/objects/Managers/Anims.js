export default class Anims {
  constructor(character = {}, run = '', combat = '', drink = '', idle = '', die = '') {

    this.run = function() {
      character.flipX = (character.x - character.movement.getMoveTargetCoords()[0] > 0)
        ? true
        : false;
      character.anims.play(run, true);
    }

    this.combat = function() {
      character.anims.play(combat, true);
    }

    this.drink = function() {
      character.anims.play(drink, true);
    }

    this.idle = function() {
      character.anims.play(idle, true);
    }

    this.die = function() {
      character.anims.play(die, true);
    }
  }
}
