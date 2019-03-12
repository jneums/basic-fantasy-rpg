/**
 * moveToMoveTarget - used in update()
 *
 * @param  {Character} character body to move
 * @returns {bool} true if moving;
 */
export default function moveToMoveTarget(character = {}) {
  // step 1: move to the move target regardless
  const speed = character.movement.getMovementSpeed();
  const currentPosition = [character.x, character.y];
  const moveTargetCoords = character.movement.getMoveTargetCoords();
  const isMoveTargetWithinDistance = Phaser.Math.Distance.Between(
    currentPosition[0], currentPosition[1],
    moveTargetCoords[0], moveTargetCoords[1]
  ) < 5;
  if (isMoveTargetWithinDistance) {
    character.movement.setMovementSpeed(40);
    character.movement.stop();
    return false;
  } else {
    character.scene.physics.moveTo(character, moveTargetCoords[0], moveTargetCoords[1], speed);
    return true;
  }
}
