/**
 * PlayerUpdate - update() to run on player
 * controlled character.
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function PlayerUpdate() {
  const update = function() {
    this.playerWeapon.x = this.x;
    this.playerWeapon.y = this.y - 4;
    if (this.buffs.has('eating')) {
      this.playerWeapon.x = this.x;
      this.playerWeapon.y = this.y + 2;
      this.playerWeapon.anims.play('small-red', true)
    } else if (this.body.velocity.x || this.body.velocity.y) {
      this.anims.play('player-walk', true)
      this.playerWeapon.anims.play('sword-walk', true)
    } else {
      this.anims.stop('player-walk')
      this.playerWeapon.anims.stop('sword-walk')
      this.setTexture('player', 0);
      this.playerWeapon.setTexture('sword-walk', 0);
    }
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
  const target = character.target.currentTarget();
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
  ) < 10;
  if (isMoveTargetWithinDistance) {
    character.movement.setMovementSpeed(40);
    character.setVelocity(0, 0);
    return false;
  } else {
    character.scene.physics.moveTo(character, moveTargetCoords[0], moveTargetCoords[1], speed);
    return true;
  }
}
