
/**
 * Movement Manager - Sets movement speed and
 * target coordinates.
 */
export default class Movement {
  constructor(character, x, y) {
    // how fast you move. default is 100
    let movementSpeed = 30;

    // where to move to
    let moveTargetCoords = [x, y];


    /**
     * faceTarget - evaluates which side of character
     * the target is on, then faces that side.
     *
     * @param  {Character} target
     * @returns {void}
     */
    this.faceTarget = function(target = {}) {
      const sign = Math.sign(character.x - target.x)
      if(sign > 0) {
        character.flipX = true;
        character.hands.flipX = true;
      } else {
        character.flipX = false;
        character.hands.flipX = false;
      }
    }

    /**
     * stop - sets moveTargetCoords to current position.
     *
     * @returns {void}
     */
    this.stop = function() {
      moveTargetCoords = [character.x, character.y];
    }

    /**
    * getMovementSpeed
    *
    * @returns {number}  characters walking speed
    */
    this.getMovementSpeed = function() {
      return movementSpeed;
    }

    /**
     * getMoveTargetCoords
     *
     * @returns {array} [x, y]
     */
    this.getMoveTargetCoords = function() {
      return moveTargetCoords;
    }

    /**
    * setMovementSpeed
    *
    * @param  {number} newSpeed
    * @returns {void}
    */
    this.setMovementSpeed = function(newSpeed) {
      movementSpeed = newSpeed;
    }

    /**
     * setMoveTargetCoords
     *
     * @param  {array} newMoveTargetCoords
     * @returns {void}
     */
    this.setMoveTargetCoords = function(newMoveTargetCoords) {
      moveTargetCoords = newMoveTargetCoords;
    }
  }
}
