import CONST from '../scenes/Const';

const _xQuestL = CONST.GAME_VIEW_CENTER_X - 106 * 4;
const _xQuestR = CONST.GAME_VIEW_CENTER_X - 20 * 4;
const _xDropL = CONST.GAME_VIEW_CENTER_X - 19 * 4;
const _xDropR = CONST.GAME_VIEW_CENTER_X - 4 * 4;

const _y_1_top = CONST.GAME_VIEW_CENTER_Y - 47 * 4;
const _y_1_bot = CONST.GAME_VIEW_CENTER_Y - 31 * 4;

const _y_2_top = CONST.GAME_VIEW_CENTER_Y - 28 * 4;
const _y_2_bot = CONST.GAME_VIEW_CENTER_Y - 13 * 4;

const _y_3_top = CONST.GAME_VIEW_CENTER_Y - 9 * 4;
const _y_3_bot = CONST.GAME_VIEW_CENTER_Y + 7 * 4;

const _y_4_top = CONST.GAME_VIEW_CENTER_Y + 10 * 4;
const _y_4_bot = CONST.GAME_VIEW_CENTER_Y + 25 * 4;

const _y_5_top = CONST.GAME_VIEW_CENTER_Y + 30 * 4;
const _y_5_bot = CONST.GAME_VIEW_CENTER_Y + 45 * 4;

const _y_6_top = CONST.GAME_VIEW_CENTER_Y + 48 * 4;
const _y_6_bot = CONST.GAME_VIEW_CENTER_Y + 63 * 4;



export default function questLogPointerDown(pointer, player) {

  let index = -1;


  // which quest:
  if (pointer.downY > _y_1_top && pointer.downY < _y_1_bot) {
    index = 0;

  } else if (pointer.downY > _y_2_top && pointer.downY < _y_2_bot) {
    index = 1;

  } else if (pointer.downY > _y_3_top && pointer.downY < _y_3_bot) {
    index = 2;

  } else if (pointer.downY > _y_4_top && pointer.downY < _y_4_bot) {
    index = 3;

  } else if (pointer.downY > _y_5_top && pointer.downY < _y_5_bot) {
    index = 4;

  } else if (pointer.downY > _y_6_top && pointer.downY < _y_6_bot) {
    index = 5;

  }

  if (pointer.downX > _xQuestL && pointer.downX < _xQuestR) {

    // quest clicked:
    player.questLog.setActiveQuest(index);

  } else if (pointer.downX > _xDropL && pointer.downX < _xDropR){

    // drop quest was clicked:
    player.questLog.remove(index);

  }

  

  player.scene.registry.set('openQuestLog', player.questLog.getActive());


}
