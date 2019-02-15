export default function playerInput(player = {}) {
  /**
   * pointer movement, sets moveTargetCoords
   */
  player.scene.input.on('pointerdown', (pointer) => {
    const oldMoveTargetCoords = player.movement.getMoveTargetCoords();
    const newMoveTargetCoords = [pointer.worldX, pointer.worldY]
    player.movement.setMoveTargetCoords(newMoveTargetCoords);
  })

  /**
   * link to something important
   */
  player.scene.input.keyboard.on('keyup_SPACE', (event) => {
    console.log(player.target.getCurrentTarget().combat.attackSpd());
  })

  /**
   * attempt to perform ability linked to key: 1
   */
  player.scene.input.keyboard.on('keyup_ONE', (event) => {
    const action = player.keyMap.getOne();
    player.keyMap.executeOne();
  })

  /**
   * attempt to perform ability linked to key: 2
   */
  player.scene.input.keyboard.on('keyup_TWO', (event) => {
    const action = player.keyMap.getTwo();
    player.keyMap.executeTwo();
  })

  /**
   * attempt to perform ability linked to key: 3
   */
  player.scene.input.keyboard.on('keyup_THREE', (event) => {
    const action = player.keyMap.getThree();
    player.keyMap.executeThree();
  })

  /**
   * attempt to perform ability linked to key: 4
   */
  player.scene.input.keyboard.on('keyup_FOUR', (event) => {
    const action = player.keyMap.getFour();
    player.keyMap.executeFour();
  })

  /**
   * attempt to perform ability linked to key: 5
   */
  player.scene.input.keyboard.on('keyup_FIVE', (event) => {
    const action = player.keyMap.getFive();
    player.keyMap.executeFive();
  })

  /**
   * attempt to perform ability linked to key: 6
   */
  player.scene.input.keyboard.on('keyup_SIX', (event) => {
    const action = player.keyMap.getSix();
    player.keyMap.executeSix();
  })

  /**
   * attempt to perform ability linked to key: 7
   */
  player.scene.input.keyboard.on('keyup_SEVEN', (event) => {
    console.log('7');
  })

  /**
   * attempt to perform ability linked to key: 8
   */
  player.scene.input.keyboard.on('keyup_EIGHT', (event) => {
    console.log('8');
  })

  /**
   * attempt to perform ability linked to key: 9
   */
  player.scene.input.keyboard.on('keyup_NINE', (event) => {
    console.log('9');
  })
}
