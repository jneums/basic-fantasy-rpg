
/**
 * playAnims - run on update, decides which animations
 * to play, as well as keeping weapons in sync with position.
 *
 * @param  {Character} character
 * @returns {void}
 */
export default function playAnims(character = {}) {
  // keep weapon next to body:
  if (character.buffs.has('eating')) {
    // if eating, show anim and move hand a little:
  } else if (character.body.velocity.x || character.body.velocity.y) {
    // if moving:
    character.anims.play('player-walk', true)
  } else {
    // not doing anything, stop animation
    character.anims.stop('player-walk')
    character.setTexture('player', 0);
  }
}
