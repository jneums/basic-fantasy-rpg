import actionPointerDown from './actionPointerDown';
import inventoryPointerDown from './inventoryPointerDown';
import toggleControl from './toggleControl';


function actionBar(pointer, player) {
  // is the pointer in the left or right column:
  if (pointer.downX > 1120 && pointer.downX < 1192) {
    // position vertically:
    if (pointer.downY > 192 && pointer.downY < 256) {
      return player.keyMap.executeOne();
    } else if (pointer.downY > 268 && pointer.downY < 340) {
      return player.keyMap.executeTwo();
    } else if (pointer.downY > 348 && pointer.downY < 420) {
      return player.keyMap.executeThree();
    } else if (pointer.downY > 428 && pointer.downY < 496) {
      return player.keyMap.executeFour();
    } else if (pointer.downY > 508 && pointer.downY < 580) {
      return player.keyMap.executeFive();
    }
  } else if (pointer.downX > 1200 && pointer.downX < 1272){
    // vertically in the right column:
    if (pointer.downY > 192 && pointer.downY < 256) {
      return player.keyMap.executeSix();
    } else if (pointer.downY > 268 && pointer.downY < 340) {
      return player.keyMap.executeSeven();
    } else if (pointer.downY > 348 && pointer.downY < 420) {
      return player.keyMap.executeEight();
    } else if (pointer.downY > 428 && pointer.downY < 496) {
      return player.keyMap.executeNine();
    } else if (pointer.downY > 508 && pointer.downY < 580) {
      return player.keyMap.executeZero();
    }
  }
}


export default function inputListeners(player = {}) {
  let inventoryToggle = false;

  player.scene.input.on('pointerdown', (pointer) => {
    // is the pointer on the ui or the dungeon?
    if (pointer.downX > 1110) {
      actionBar(pointer, player);
    } else {
      actionPointerDown(pointer, player);
    }
  })


  /**
   * toggle characters
   */
  player.scene.input.keyboard.on('keyup_SPACE', (event) => {
    // switch players control:
    toggleControl(player.scene);

  })

  player.scene.input.keyboard.on('keydown_SHIFT', (event) => {
    // enables shift combo keys to register.
  })

  /**
   * perform ability linked to key: 1
   */
  player.scene.input.keyboard.on('keyup_ONE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryOne();
    } else {
      return player.keyMap.executeOne();
    }
  })


  /**
   * perform ability linked to key: 2
   */
  player.scene.input.keyboard.on('keyup_TWO', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryTwo();
    } else {
      return player.keyMap.executeTwo();
    }  })

  /**
   * perform ability linked to key: 3
   */
  player.scene.input.keyboard.on('keyup_THREE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryThree();
    } else {
      return player.keyMap.executeThree();
    }  })

  /**
   * perform ability linked to key: 4
   */
  player.scene.input.keyboard.on('keyup_FOUR', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryFour();
    } else {
      return player.keyMap.executeFour();
    }
  })

  /**
   * perform ability linked to key: 5
   */
  player.scene.input.keyboard.on('keyup_FIVE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryFive();
    } else {
      return player.keyMap.executeFive();
    }
  })

  /**
   * perform ability linked to key: 6
   */
  player.scene.input.keyboard.on('keyup_SIX', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventorySix();
    } else {
      return player.keyMap.executeSix();
    }  })

  /**
   * perform ability linked to key: 7
   */
  player.scene.input.keyboard.on('keyup_SEVEN', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventorySeven();
    } else {
      return player.keyMap.executeSeven();
    }  })

  /**
   * perform ability linked to key: 8
   */
  player.scene.input.keyboard.on('keyup_EIGHT', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryEight();
    } else {
      return player.keyMap.executeEight();
    }  })

  /**
   * perform ability linked to key: 9
   */
  player.scene.input.keyboard.on('keyup_NINE', (event) => {
    if (event.shiftKey) {
      return player.keyMap.executeInventoryNine();
    } else {
      return player.keyMap.executeNine();
    }  })
}
