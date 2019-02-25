import standGuard from './standGuard';
import moveToMoveTarget from './moveToMoveTarget';

/**
 * PlayerUpdate - update() to run on player
 * controlled character.
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PlayerUpdate() {
  const update = function() {
    standGuard(this);
    moveToMoveTarget(this);
  }
  return update;
}
