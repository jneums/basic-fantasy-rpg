export default class Movement {
  constructor(character, x, y) {
    let movementSpeed = 0;

    // movement
    let moveTargetCoords = [x, y];

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
