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
    console.log(event);
  })
  player.scene.input.keyboard.on('keydown_SHIFT', (event) => {

  })

  /**
   * attempt to perform ability linked to key: 1
   */
  player.scene.input.keyboard.on('keyup_ONE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryOne();
    } else {
      return player.keyMap.executeOne();
    }
  })


  /**
   * attempt to perform ability linked to key: 2
   */
  player.scene.input.keyboard.on('keyup_TWO', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryTwo();
    } else {
      return player.keyMap.executeTwo();
    }  })

  /**
   * attempt to perform ability linked to key: 3
   */
  player.scene.input.keyboard.on('keyup_THREE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryThree();
    } else {
      return player.keyMap.executeThree();
    }  })

  /**
   * attempt to perform ability linked to key: 4
   */
  player.scene.input.keyboard.on('keyup_FOUR', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryFour();
    } else {
      return player.keyMap.executeFour();
    }
  })

  /**
   * attempt to perform ability linked to key: 5
   */
  player.scene.input.keyboard.on('keyup_FIVE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryFive();
    } else {
      return player.keyMap.executeFive();
    }
  })

  /**
   * attempt to perform ability linked to key: 6
   */
  player.scene.input.keyboard.on('keyup_SIX', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventorySix();
    } else {
      return player.keyMap.executeSix();
    }  })

  /**
   * attempt to perform ability linked to key: 7
   */
  player.scene.input.keyboard.on('keyup_SEVEN', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventorySeven();
    } else {
      return player.keyMap.executeSeven();
    }  })

  /**
   * attempt to perform ability linked to key: 8
   */
  player.scene.input.keyboard.on('keyup_EIGHT', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryEight();
    } else {
      return player.keyMap.executeEight();
    }  })

  /**
   * attempt to perform ability linked to key: 9
   */
  player.scene.input.keyboard.on('keyup_NINE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryNine();
    } else {
      return player.keyMap.executeNine();
    }  })
}
