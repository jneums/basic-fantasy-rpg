import standGuard from './standGuard';
import moveToMoveTarget from './moveToMoveTarget';

/**
 * PlayerUpdate - update() to run on player
 * controlled character.
 *
 * Handles animations based on the state of the
 * character.
 *
 * Attacks if enemy in range.
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PlayerUpdate() {
  const update = function() {
    const moving = moveToMoveTarget(this);
    const attacking = standGuard(this);
    if (moving) this.animations.run();
    if (attacking) this.animations.combat();
    if (!attacking && !moving) this.animations.idle();

  }
  return update;
}
