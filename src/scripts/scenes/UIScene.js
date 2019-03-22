const ACTION_BAR_WIDTH = 70;
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
    // quest log:
    this.questLogContainer = this.add.container((this.scale.width - ACTION_BAR_WIDTH) /2, this.scale.height /2);
    const questLogBackground = this.add.image( 0, 0, 'questLog');
    questLogBackground.scaleX = 4;
    questLogBackground.scaleY = 4;

    const questLogTitle = this.add.bitmapText(0, -200,  'font', 'Quests', 24);
    questLogTitle.setOrigin(0.5);
    this.questLogContainer.setVisible(false);
    this.questLogContainer.add(questLogBackground);
    this.questLogContainer.add(questLogTitle);


    this.questListContainer = this.add.container(this.questLogContainer.x, this.questLogContainer.y);
    this.questList = this.add.dynamicBitmapText(-402, -138, 'font', '', 16);
    this.questList.setOrigin(0);
    this.questListContainer.add(this.questList);


    // dialogue box:
    this.dialogueBoxContainer = this.add.container((this.scale.width - ACTION_BAR_WIDTH) /2, this.scale.height /2);
    const dialogueBoxBackground = this.add.image(0, 0, 'dialogueBox');
    dialogueBoxBackground.scaleX = 4;
    dialogueBoxBackground.scaleY = 4;

    this.dialogueBoxContainer.setVisible(false);

    this.dialogueText = this.add.dynamicBitmapText(
      0,
      0,
      'font',
       '',
       24
     );

    this.dialogueText.setOrigin(.5).setCenterAlign();

    this.dialogueBoxContainer.add(dialogueBoxBackground);
    this.dialogueBoxContainer.add(this.dialogueText);

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

    } else if (key === 'openDialogueBox') {
      this.dialogueBoxContainer.setVisible(true);
      this.dialogueText.setText(data);

    } else if (key === 'closeDialogueBox') {
      this.dialogueText.setText('');
      this.dialogueBoxContainer.setVisible(false);

    } else if (key === 'openQuestLog') {
      this.questLogContainer.setVisible(true);
      loadQuestLog(this, data);

    } else if (key === 'closeQuestLog') {
      this.questLogContainer.setVisible(false);
      clearQuestLog(this);
    } else if (key === 'selectQuest') {
      selectQuest(scene, data);
    }
  }
}

function selectQuest(scene, quest) {
  // set active indicator for quest list:
  console.log(scene.questList)
  // update description text:
}

function clearQuestLog(scene) {
  scene.questList.setText('');
}

function loadQuestLog(scene, quests) {
  if (!quests[0]) return;
  const questTitles = quests.map(quest => {
    return quest.title;
  })
  scene.questList.setText(questTitles);
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
    if (i === 7) {
      x = 1124;
      y += 108;
    } else if (i % 2 === 0) {
      x += 80;
    } else {
      x = 1124;
      y += 80;
    }
  })
}
