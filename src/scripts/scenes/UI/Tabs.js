import CONST from '../Const';

export default function Tabs(scene) {

  const labels = scene.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

  this.init = function (active) {

    const inventoryLabel = scene.add.bitmapText(-29 * 4, -62 * 4, 'font', 'inventory', 18)
      .setOrigin(0.5)
      .setTint(CONST.TXT_COLOR);

    const equipLabel = scene.add.bitmapText(-82 * 4, -62 * 4, 'font', 'character', 18)
      .setOrigin(0.5)
      .setTint(CONST.TXT_COLOR);

    const questLabel = scene.add.bitmapText(25 * 4, -62 * 4, 'font', 'quests', 18)
      .setOrigin(0.5)
      .setTint(CONST.TXT_COLOR);

    labels.setDepth(1000)
    labels.add([inventoryLabel, equipLabel, questLabel]);
  }



  this.destroy = function() {
    labels.removeAll(true);
  }

}
