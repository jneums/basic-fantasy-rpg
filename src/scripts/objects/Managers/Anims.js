export default class Anims {
  constructor(character = {}, characterType ='', handType = '') {

    function transition (anim, frame) {
      if (anim.key === handType + '-stab') {
        this.anims.play(handType + '-idle', true)
      }
    }

    character.hands.on('animationcomplete', transition, character.hands);

    this.run = function() {
      const shouldFlip = (character.x - character.movement.getMoveTargetCoords()[0] > 0)
        ? true
        : false;
      character.flipX = shouldFlip;
      character.hands.flipX = shouldFlip;
      character.anims.play(characterType + '-run', true);
      character.hands.anims.play(handType + '-run', true);
    }

    this.combat = function() {
      character.anims.play(characterType + '-combat', true);
    }

    this.swing = function() {
      character.hands.anims.play(handType + '-stab', false);
    }

    this.drink = function() {
      character.anims.play('redSmall', true);
    }

    this.idle = function() {;
      character.anims.play(characterType + '-idle', true);
      character.hands.anims.play(handType + '-idle', true);
    }

    this.die = function() {
      character.anims.play(characterType + '-die', true);
    }

    this.stun = function() {
      character.hands.setTexture(handType + '-idle', 0)
      character.anims.play(characterType + '-stun', true);
    }

    this.cast = function(school = '') {
      character.hands.anims.play(handType + '-' + school + '-cast', true)
    }

    this.poly = function() {
      character.hands.setTexture('hidden')
      character.anims.play('polymorph', true)
    }
  }

}
