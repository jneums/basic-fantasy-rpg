
/**
 * Movement Manager - Sets movement speed and
 * target coordinates.
 */
export default class Movement {
  constructor(character, x, y) {
    // how fast you move. default is 100
    let movementSpeed = 60;

    // where to move to
    let moveTargetCoords = [x, y];

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
