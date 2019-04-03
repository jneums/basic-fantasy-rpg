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

const BUTTON_T = CONST.GAME_VIEW_CENTER_Y - 2 * 4;
const BUTTON_B = CONST.GAME_VIEW_CENTER_Y + 4 * 4;

const UPGRADE_L = CONST.GAME_VIEW_CENTER_X - 52 * 4;
const UPGRADE_R = CONST.GAME_VIEW_CENTER_X - 24 * 4;

const UNEQUIP_L = CONST.GAME_VIEW_CENTER_X + 4 * 4;
const UNEQUIP_R = CONST.GAME_VIEW_CENTER_X + 40 * 4;

export default function equipmentPointerDown(pointer, player) {

  let slot = player.equipment.getActiveSlot();
  let data = {};

  if (pointer.downY > BUTTON_T && pointer.downY < BUTTON_B) {
    if (pointer.downX > UPGRADE_L && pointer.downX < UPGRADE_R) {


      if (!player.equipment.getActive()) {
        player.scene.registry.set('error', 'select an item to upgrade');
        return; // early
      };

      const success = player.inventory.removeCrystals(1);
      if (!success) {
        player.scene.registry.set('error', 'not enough crystals');
        return // early
      };

      player.equipment.getActive().upgrade(1);

      data = {
        stats: player.stat.displayStats(),
        equipment: player.equipment.equipped(),
        crystals: player.inventory.getCrystals()
      }

      player.scene.registry.set('openEquipment', data);


    } else if (pointer.downX > UNEQUIP_L && pointer.downX < UNEQUIP_R) {
      player.equipment.unequipActive();

      data = {
        stats: player.stat.displayStats(),
        equipment: player.equipment.equipped(),
        crystals: player.inventory.getCrystals()
      }

      player.scene.registry.set('openEquipment', data);

    }
  } else if (pointer.downX > COL_ONE_L && pointer.downX < COL_ONE_R) {
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
