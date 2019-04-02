import CONST from '../scenes/Const';

const LOOT_BOX_HEIGHT = 16 * 4;
const LOOT_BOX_WIDTH = 86 * 4;
const LOOT_BOX_TOP = CONST.GAME_VIEW_CENTER_Y - (LOOT_BOX_HEIGHT / 2);
const LOOT_BOX_BOTTOM = CONST.GAME_VIEW_CENTER_Y + (LOOT_BOX_HEIGHT / 2);
const LOOT_BOX_LEFT = CONST.GAME_VIEW_CENTER_X - (LOOT_BOX_WIDTH / 2);
const LOOT_BOX_RIGHT = CONST.GAME_VIEW_CENTER_X + (LOOT_BOX_WIDTH / 2);


export default function lootBoxPointerDown(pointer, player) {



  // if pointer is on the loot:
  if (pointer.downX > LOOT_BOX_LEFT && pointer.downX < LOOT_BOX_RIGHT
        && pointer.downY > LOOT_BOX_TOP && pointer.downY < LOOT_BOX_BOTTOM) {
          if (!player.target.currentTarget().loot()) return;
          player.target.currentTarget().takeLoot(player);
          player.scene.lootBoxActive = false;
          player.scene.registry.set('closeLootBox');

  } else {
    player.scene.lootBoxActive = false;
    player.scene.registry.set('closeLootBox');
  }
}
