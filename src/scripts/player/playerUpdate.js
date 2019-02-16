/**
 * PlayerUpdate - update() to run on player
 * controlled character.
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PlayerUpdate() {
  const meleeRange = 50;

  const update = function() {
    moveToMoveTarget(this);
    standGuard(this);
  }
  return update;
}


/**
 * standGuard - idle state, awaiting player input
 * will attack if in melee range.
 *
 * @param  {type} character = {} description
 * @returns {type}                description
 */
function standGuard(character = {}) {
  const range = 50;
  const target = character.target.getCurrentTarget();
  if (target) {
    const inRange = character.target.rangeCheck(target, range);
    const targetIsEnemy = (character.team() !== target.team());
    if (inRange && targetIsEnemy) {
      if (character.combat.autoAttack()) {
        character.combat.meleeAutoAttack(target);
      }
    };
  }
}

/**
 * moveToMoveTarget - used in update()
 *
 * @param  {Character} character body to move
 * @returns {void}
 */
function moveToMoveTarget(character = {}) {
  // step 1: move to the move target regardless
  const speed = character.movement.getMovementSpeed();
  const currentPosition = [character.x, character.y];
  const moveTargetCoords = character.movement.getMoveTargetCoords();
  const isMoveTargetWithinDistance = Phaser.Math.Distance.Between(
    currentPosition[0], currentPosition[1],
    moveTargetCoords[0], moveTargetCoords[1]
  ) < 50;
  if (isMoveTargetWithinDistance) {
    character.movement.setMovementSpeed(60);
    return character.setVelocity(0, 0);
  } else {
    return character.scene.physics.moveTo(character, moveTargetCoords[0], moveTargetCoords[1], speed);
  }
}
