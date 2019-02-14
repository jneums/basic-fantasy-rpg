import { meleeAutoAttack } from '../globalAbilities/meleeAttack';
import heroicStrike from '../warriorAbilities/heroicStrike';

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
    const rage = this.rage.getRage();
    // go out of combat
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
  // step 2: if at move target, check melee range for enemies
  const enemies = character.target.scanForEnemies(50);
  if (enemies.length) {
    // step 2a: if enemies, set target and start autoattacking
    const target = character.target.getClosestEnemy(enemies);
    character.target.setCurrentTarget(target);
    if (character.combat.getAutoAttackToggle()) {
      meleeAutoAttack(character, target);
    }
  };
}

/**
 * moveToMoveTarget - used in update()
 *
 * @param  {Character} character body to move
 * @returns {void}
 */
function moveToMoveTarget(character = {}) {
  // step 1: move to the move target regardless
  const currentPosition = [character.x, character.y];
  const moveTargetCoords = character.movement.getMoveTargetCoords();
  const isMoveTargetWithinDistance = Phaser.Math.Distance.Between(
    currentPosition[0], currentPosition[1],
    moveTargetCoords[0], moveTargetCoords[1]
  ) < 1;
  if (isMoveTargetWithinDistance) {
    return character.setVelocity(0, 0);
  } else {
    return character.scene.physics.moveTo(character, moveTargetCoords[0], moveTargetCoords[1]);
  }
}
