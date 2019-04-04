import CONST from '../scenes/Const';


const x1_L = CONST.GAME_VIEW_CENTER_X - 99 * 4;
const x1_R = CONST.GAME_VIEW_CENTER_X - 83 * 4;

const x2_L = CONST.GAME_VIEW_CENTER_X - 80 * 4;
const x2_R = CONST.GAME_VIEW_CENTER_X - 65 * 4;

const x3_L = CONST.GAME_VIEW_CENTER_X - 61 * 4;
const x3_R = CONST.GAME_VIEW_CENTER_X - 45 * 4;

const x4_L = CONST.GAME_VIEW_CENTER_X - 42 * 4;
const x4_R = CONST.GAME_VIEW_CENTER_X - 26 * 4;

const y1_T = CONST.GAME_VIEW_CENTER_Y - 37 * 4;
const y1_B = CONST.GAME_VIEW_CENTER_Y - 22 * 4;

const y2_T = CONST.GAME_VIEW_CENTER_Y - 18 * 4;
const y2_B = CONST.GAME_VIEW_CENTER_Y - 3 * 4;

const y3_T = CONST.GAME_VIEW_CENTER_Y + 2 * 4;
const y3_B = CONST.GAME_VIEW_CENTER_Y + 17 * 4;

const y4_T = CONST.GAME_VIEW_CENTER_Y + 20 * 4;
const y4_B = CONST.GAME_VIEW_CENTER_Y + 36 * 4;

const y5_T = CONST.GAME_VIEW_CENTER_Y + 39 * 4;
const y5_B = CONST.GAME_VIEW_CENTER_Y + 54 * 4;

const use_L = CONST.GAME_VIEW_CENTER_X - 25 * 4;
const use_R = CONST.GAME_VIEW_CENTER_X + 10 * 4;

const discard_L = CONST.GAME_VIEW_CENTER_X + 56 * 4;
const discard_R = CONST.GAME_VIEW_CENTER_X + 85 * 4;

const buttons_T = CONST.GAME_VIEW_CENTER_Y;
const buttons_B = CONST.GAME_VIEW_CENTER_Y + 7 * 4;

/**
 * inventoryPointerDown - called when the inventory
 * is open and the user has 'clicked' the screen.
 *
 * useful so the click does not register as a moveToMoveTarget()
 * action.
 *
 * @param  {type} pointer   description
 * @param  {type} character description
 * @return {type}           description
 */
export default function inventoryPointerDown(pointer, character) {
  let index = -1;
  const active = character.inventory.getActive();

  // use:
  if (pointer.downY > buttons_T && pointer.downY < buttons_B) {
    if (pointer.downX > use_L && pointer.downX < use_R) {

      if (active.hasOwnProperty('getType') && active.getType() === 'consumable'
        || active.hasOwnProperty('skillType') && character.skills.canUse(active.skillType())) {
          character.inventory.useActive();

      }
    } else if (pointer.downX > discard_L && pointer.downX < discard_R) {
      if (active.hasOwnProperty('skillType') || active.getType() == 'vendor') {
        character.inventory.dismantleActive();
      } else {
        character.inventory.discardActive();

      }

    }
    const data = {
      inventory: character.inventory.getInventory(),
      crystals: character.inventory.getCrystals()
    }
    character.scene.registry.set('openInventory', data)
  }

  // first column:
  if (pointer.downX > x1_L && pointer.downX < x1_R) {

    // first row:
    if (pointer.downY > y1_T && pointer.downY < y1_B) {
      index = 0;

      // second row:
    } else if (pointer.downY > y2_T && pointer.downY < y2_B) {
      index = 4;

      // third row:
    } else if (pointer.downY > y3_T && pointer.downY < y3_B) {
      index = 8;

      // fourth row:
    } else if (pointer.downY > y4_T && pointer.downY < y4_B) {
      index = 12;

      // fifth row:
    }

  // second column:
  } else if (pointer.downX > x2_L && pointer.downX < x2_R) {
    // first row:
    if (pointer.downY > y1_T && pointer.downY < y1_B) {
      index = 1;

    // second row:
  } else if (pointer.downY > y2_T && pointer.downY < y2_B) {
      index = 5;


    // third row:
  } else if (pointer.downY > y3_T && pointer.downY < y3_B) {
      index = 9;


    // fourth row:
  } else if (pointer.downY > y4_T && pointer.downY < y4_B) {
      index = 13;


    // fifth row:
  }

  // third column:
  } else if (pointer.downX > x3_L && pointer.downX < x3_R) {

    // first row:
    if (pointer.downY > y1_T && pointer.downY < y1_B) {
      index = 2;

    // second row:
  } else if (pointer.downY > y2_T && pointer.downY < y2_B) {
      index = 6;


    // third row:
  } else if (pointer.downY > y3_T && pointer.downY < y3_B) {
      index = 10;


    // fourth row:
  } else if (pointer.downY > y4_T && pointer.downY < y4_B) {
      index = 14;


    // fifth row:
  }
  // fourth column:
  } else if (pointer.downX > x4_L && pointer.downX < x4_R) {
    // first row:
    if (pointer.downY > y1_T && pointer.downY < y1_B) {
      index = 3;

    // second row:
  } else if (pointer.downY > y2_T && pointer.downY < y2_B) {
      index = 7;


    // third row:
  } else if (pointer.downY > y3_T && pointer.downY < y3_B) {
      index = 11;


    // fourth row:
  } else if (pointer.downY > y4_T && pointer.downY < y4_B) {
      index = 15;


    // fifth row:
  }
  }

  if (index < 0) return;

  const filteredInventory = character.inventory.getInventory().map(item => {
    if (item.hasOwnProperty('getType') && item.getType() === 'consumable') {
      item.canUse = true;
      // if cannot use, add field saying so:

    } else if (item.hasOwnProperty('skillType') && character.skills.canUse(item.skillType())) {
      item.canUse = true;

    }


    return item;
  })


  character.inventory.setActive(index);
  const data = {
    inventory: filteredInventory,
    crystals: character.inventory.getCrystals()
  }
  character.scene.registry.set('openInventory', data)

  if (!character.inventory.getInventory()[index] || !character.inventory.getInventory()[index].hasOwnProperty('slot')) return;

  const slot = character.inventory.getInventory()[index].slot();
  const equipped = character.equipment.equipped()[slot];
  character.scene.registry.set('showComparison', equipped)
}
