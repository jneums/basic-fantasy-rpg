export default class Target {
  constructor(character) {
    let currentTarget;
    let previousTarget;
    let focusTarget;

    /**
     * getClosestEnemy
     *
     * @param  {array} enemies character array
     * @returns {Character} reference to closest enemy
     */
    this.getClosestEnemy = function(enemies = []) {
      const myCoords = [ character.x, character.y];
      const enemyArray = enemies.concat([]);
      enemyArray.sort((a, b) => {
        const distanceToAX = Math.abs(a.x - myCoords[0]);
        const distanceToBX = Math.abs(b.x - myCoords[0]);
        const distanceToAY = Math.abs(a.y - myCoords[1]);
        const distanceToBY = Math.abs(b.y - myCoords[1]);
        const totalDistanceToA = distanceToAX + distanceToAY;
        const totalDistanceToB = distanceToBX + distanceToBY;
        return totalDistanceToA - totalDistanceToB;
      })
      const closestEnemy = enemyArray[0];
      return closestEnemy;
    }

    /**
     * getLowestHealthAlly
     *
     * @param  {array} allies character array
     * @returns {Character} lowest health ally
     */
    this.getLowestHealthAlly = function(allies = []) {
      const allyArray = allies.concat([]);
      allyArray.sort((a, b) => a.stat.hp() - b.stat.hp());
      const lowestHealthAlly = allyArray[0];
      return lowestHealthAlly;
    }

    /**
     * scanForEnemies - alive only
     *
     * @param  {Character} character who performs scan
     * @param  {number} range max distance to scan
     * @returns {array} array of enemies
     */
    this.scanForEnemies = function(range = 0) {
      const allEnemies = character.scene.characters.children.entries.filter(child =>
        child.team() !== character.team());
      const enemiesInRange = allEnemies.filter(enemy =>
          this.rangeCheck(enemy, range));
      const aliveEnemies = enemiesInRange.filter(enemy => !enemy.combat.isDead())
      return aliveEnemies;
    }

    /**
     * scanForAllies
     *
     * @returns {array} array of visible allies
     */
    this.scanForAllies = function() {
      return character.scene.characters.children.entries.filter(child =>
        child.team() === character.team())
    }

    /**
     * rangeCheck - is target close enough
     *
     * @param  {Character} target is wihin distance?
     * @param  {number} distance to check
     * @returns {bool} whether or not target is in distance
     */
    this.rangeCheck = function(target = {}, distance = 0) {
      const distanceToCheck = distance;
      const isTargetWithinDistance =
        Phaser.Math.Distance.Between(
          character.x, character.y,
          target.x, target.y
        ) < distanceToCheck;
      return isTargetWithinDistance;
    }

    /**
     * currentTarget
     *
     * @returns {Character} target reference
     */
    this.currentTarget = function() {
      return currentTarget;
    }

    /**
     * getPreviousTarget
     *
     * @returns {Character} target reference
     */
    this.getPreviousTarget = function() {
      return previousTarget;
    }

    /**
     * getFocusTarget
     *
     * @returns {Character} target reference
     */
    this.getFocusTarget = function() {
      return focusTarget;
    }


    /**
     * setCurrentTarget
     *
     * @param  {Character} newTarget
     * @returns {void}
     */
    this.setCurrentTarget = function(newTarget) {
      previousTarget = currentTarget;
      if (currentTarget) {
        currentTarget.healthBar.setBackgroundColor();
      }
      if (newTarget) {
        newTarget.healthBar.setBackgroundColor(0xaa3333);
      }
      currentTarget = newTarget;
    }


    /**
     * setFocusTarget
     *
     * @param  {Character} newTarget
     * @returns {void}
     */
    this.setFocusTarget = function(newTarget) {
      focusTarget = newTarget;
    }
  }
}
