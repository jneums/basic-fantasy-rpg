export default function playerInput(character = {}) {
  /**
   * pointer movement, sets moveTargetCoords
   */
  character.scene.input.on('pointerdown', (pointer) => {
    const oldMoveTargetCoords = character.movement.getMoveTargetCoords();
    const newMoveTargetCoords = [pointer.worldX, pointer.worldY]
    character.movement.setMoveTargetCoords(newMoveTargetCoords);
  })

  /**
   * link to something important
   */
  character.scene.input.keyboard.on('keyup_SPACE', (event) => {
    console.log(character);
  })

  /**
   * attempt to perform ability linked to key: 1
   */
  character.scene.input.keyboard.on('keyup_ONE', (event) => {
    const action = character.keyMap.getOne();
    character.keyMap.executeOne();
  })

  /**
   * attempt to perform ability linked to key: 2
   */
  character.scene.input.keyboard.on('keyup_TWO', (event) => {
    const action = character.keyMap.getTwo();
    character.keyMap.executeTwo();
  })

  /**
   * attempt to perform ability linked to key: 3
   */
  character.scene.input.keyboard.on('keyup_THREE', (event) => {
    console.log('3');
  })

  /**
   * attempt to perform ability linked to key: 4
   */
  character.scene.input.keyboard.on('keyup_FOUR', (event) => {
    console.log('4');
  })

  /**
   * attempt to perform ability linked to key: 5
   */
  character.scene.input.keyboard.on('keyup_FIVE', (event) => {
    console.log('5');
  })

  /**
   * attempt to perform ability linked to key: 6
   */
  character.scene.input.keyboard.on('keyup_SIX', (event) => {
    console.log('6');
  })

  /**
   * attempt to perform ability linked to key: 7
   */
  character.scene.input.keyboard.on('keyup_SEVEN', (event) => {
    console.log('7');
  })

  /**
   * attempt to perform ability linked to key: 8
   */
  character.scene.input.keyboard.on('keyup_EIGHT', (event) => {
    console.log('8');
  })

  /**
   * attempt to perform ability linked to key: 9
   */
  character.scene.input.keyboard.on('keyup_NINE', (event) => {
    console.log('9');
  })
}
