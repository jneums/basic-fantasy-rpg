import CONST from '../scenes/Const';

const COL_ONE_L = CONST.GAME_VIEW_CENTER_X - 100 * 4;
const COL_ONE_R = CONST.GAME_VIEW_CENTER_X - 85 * 4;
const COL_TWO_L= CONST.GAME_VIEW_CENTER_X - 78 * 4;
const COL_TWO_R = CONST.GAME_VIEW_CENTER_X - 62 * 4;

const ROW_ONE_T = CONST.GAME_VIEW_CENTER_Y - 40 * 4;
const ROW_ONE_B = CONST.GAME_VIEW_CENTER_Y -24 * 4;
const ROW_TWO_T = CONST.GAME_VIEW_CENTER_Y -20 * 4;
const ROW_TWO_B =  CONST.GAME_VIEW_CENTER_Y -4 * 4;
const ROW_THREE_T = 0;
const ROW_THREE_B = CONST.GAME_VIEW_CENTER_Y + 16 * 4;
const ROW_FOUR_T = CONST.GAME_VIEW_CENTER_Y + 21 * 4 ;
const ROW_FOUR_B = CONST.GAME_VIEW_CENTER_Y + 36 * 4;


export default function equipmentPointerDown(pointer, player) {
  let slot = ''
  if (pointer.downX > COL_ONE_L && pointer.downX < COL_ONE_R) {
    // left column:
    if (pointer.downY > ROW_ONE_T && pointer.downY < ROW_ONE_B) {
      slot = 'head'
    } else if (pointer.downY > ROW_TWO_T && pointer.downY < ROW_TWO_B) {
      slot = 'chest'
    } else if (pointer.downY > ROW_THREE_T && pointer.downY < ROW_THREE_B) {
      slot = 'mainHand'
    } else if (pointer.downY > ROW_FOUR_T && pointer.downY < ROW_FOUR_B) {
      slot = 'ring'
    }
  } else if (pointer.downX > COL_TWO_L && pointer.downX < COL_TWO_R) {
    // right column:
    if (pointer.downY > ROW_ONE_T && pointer.downY < ROW_ONE_B) {
      slot = 'ranged'
    } else if (pointer.downY > ROW_TWO_T && pointer.downY < ROW_TWO_B) {
      slot = 'legs'
    } else if (pointer.downY > ROW_THREE_T && pointer.downY < ROW_THREE_B) {
      slot = 'offhand'
    } else if (pointer.downY > ROW_FOUR_T && pointer.downY < ROW_FOUR_B) {
      slot = 'feet'
    }
  }
  player.equipment.setActive(slot);

  player.scene.registry.set('selectEquipment', player.equipment.getActive());
}
