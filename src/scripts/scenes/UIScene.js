
/**
 * UI:
 */
export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
    // options:
    // warnings:
  }

  create() {
    // dialogue box:
    this.dialogueBox = this.add.image(100, 20, 'dialogueBox');
    this.dialogueBox.setOrigin(0);
    this.dialogueBox.scaleX = 4;
    this.dialogueBox.scaleY = 4;
    this.dialogueBox.setVisible(false);

    this.dialogueText = this.add.dynamicBitmapText(130, 50, 'font', '', 24);

    // icons:
    this.icons = this.add.group();
    // action bars:
    this.actionBars = this.add.image(0,0,'ui');
    this.actionBars.setOrigin(0);
    this.actionBars.scaleX = 4;
    this.actionBars.scaleY = 4;

    // events:
    this.registry.events.on('changedata', this.updateData, this);

  }

  updateData(parent, key, data) {
    // if key says the character switched, reload action bars
    if (key === 'reloadUI') {
      clearActionBar(this);
      const icons = data.keyMap.getIcons();
      loadActionBar(this, icons)

    } else if (key === 'closeDialogueBox') {
      this.dialogueText._text = '';
      this.dialogueBox.setVisible(false);
    } else if (key === 'openDialogueBox') {
      this.dialogueBox.setVisible(true);
      this.dialogueText._text = data;
    }
  }
}


function clearActionBar(scene) {
  scene.icons.clear(true, true)
}

// load icons onto action bars:
function loadActionBar(scene, abilities) {
  let x = 1124;
  let y = 192;
  abilities.forEach((ability, i) => {
    if (!ability) ability = 'empty'
    let icon = scene.add.image(x, y, ability)
      .setOrigin(0)
    scene.icons.add(icon);
    icon.scaleX = 4
    icon.scaleY = 4
    if (i % 2 === 0) {
      x += 80;
    } else {
      x = 1124;
      y += 80;
    }
  })
}
