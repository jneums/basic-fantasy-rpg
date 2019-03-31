const FIRST_COL_LEFT   = 1120;
const FIRST_COL_RIGHT  = 1192;

const SECOND_COL_LEFT  = 1200;
const SECOND_COL_RIGHT = 1272;

const FIRST_ROW_TOP    = 35 * 4;
const FIRST_ROW_BOT    = 50 * 4;

const SECOND_ROW_TOP   = 55 * 4;
const SECOND_ROW_BOT   = 70 * 4;

const THIRD_ROW_TOP    = 75 * 4;
const THIRD_ROW_BOT    = 90 * 4;

const FOURTH_ROW_TOP   = 95 * 4;
const FOURTH_ROW_BOT   = 110 * 4;

const FIFTH_ROW_TOP    = 536;
const FIFTH_ROW_BOT    = 600;

const SIXTH_ROW_TOP    = 536;
const SIXTH_ROW_BOT    = 600;

const SEVENTH_ROW_TOP  = 155 * 4;
const SEVENTH_ROW_BOT  = 170 * 4;



/**
 * actionBarDown - map coordinates to action bar icons
 *
 * @param  {Event} pointer
 * @param  {Character} player owns inputListeners
 * @return {void}
 */
export default function actionBarDown(pointer = {}, player = {}) {

  // is the pointer in the left column:
  if (pointer.downX > FIRST_COL_LEFT && pointer.downX < FIRST_COL_RIGHT) {


    // position vertically:
    if (pointer.downY > FIRST_ROW_TOP && pointer.downY < FIRST_ROW_BOT) {
      player.keyMap.executeOne();
    } else if (pointer.downY > SECOND_ROW_TOP && pointer.downY < SECOND_ROW_BOT) {
      player.keyMap.executeThree();
    } else if (pointer.downY > THIRD_ROW_TOP && pointer.downY < THIRD_ROW_BOT) {
      player.keyMap.executeFive();
    } else if (pointer.downY > FOURTH_ROW_TOP && pointer.downY < FOURTH_ROW_BOT) {
      player.keyMap.executeSeven();
    } else if (pointer.downY > FIFTH_ROW_TOP && pointer.downY < FIFTH_ROW_BOT) {
      player.keyMap.executeEleven();
    } else if (pointer.downY > SIXTH_ROW_TOP && pointer.downY < SIXTH_ROW_BOT) {
      //
    } else if (pointer.downY > SEVENTH_ROW_TOP && pointer.downY < SEVENTH_ROW_BOT) {
      player.keyMap.executeMinus();
    }
  // or right column:
  } else if (pointer.downX > SECOND_COL_LEFT && pointer.downX < SECOND_COL_RIGHT){


    // vertically in the right column:
    if (pointer.downY > FIRST_ROW_TOP && pointer.downY < FIRST_ROW_BOT) {
      player.keyMap.executeTwo();
    } else if (pointer.downY > SECOND_ROW_TOP && pointer.downY < SECOND_ROW_BOT) {
      player.keyMap.executeFour();
    } else if (pointer.downY > THIRD_ROW_TOP && pointer.downY < THIRD_ROW_BOT) {
      player.keyMap.executeSix();
    } else if (pointer.downY > FOURTH_ROW_TOP && pointer.downY < FOURTH_ROW_BOT) {
      player.keyMap.executeEight();
    } else if (pointer.downY > FIFTH_ROW_TOP && pointer.downY < FIFTH_ROW_BOT) {
      player.keyMap.executeZero();
    } else if (pointer.downY > SIXTH_ROW_TOP && pointer.downY < SIXTH_ROW_BOT) {
      //
    } else if (pointer.downY > SEVENTH_ROW_TOP && pointer.downY < SEVENTH_ROW_BOT) {
      player.keyMap.executePlus();
    }
  }
}
