const ACTION_BAR_WIDTH = 70;
const QUEST_LIST_X = -248;
const QUEST_LIST_Y = -144;
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

    const questLogTitle = this.add.bitmapText(0, -208,  'font', 'Quests', 24);
    questLogTitle.setOrigin(0.5);
    this.questDescription = this.add.bitmapText( -40,-158, 'font', '', 18);
    this.questStatus = this.add.bitmapText( -40,0, 'font', '', 18);


    this.questLogContainer.setVisible(false);
    this.questLogContainer.add(questLogBackground);
    this.questLogContainer.add(questLogTitle);
    this.questLogContainer.add(this.questDescription);
    this.questLogContainer.add(this.questStatus);


    this.questListContainer = this.add.container(this.questLogContainer.x, this.questLogContainer.y);


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
  // update description text:
  scene.questDescription.setText(quest.description)
  scene.questStatus.setText(`Current Progress: ${quest.getCount()}`);

}

function clearQuestLog(scene) {
  scene.questDescription.setText('');
  scene.questStatus.setText('');
  scene.questListContainer.removeAll(true);
}

function loadQuestLog(scene, questLog) {
  let _x = QUEST_LIST_X;
  let _y = QUEST_LIST_Y;
  const _yIncrement = 64;

  const quests = questLog.getAll();
  if (!quests[0]) return;

  const questsInProgress = questLog.getByStatus('in progress');

  if (questsInProgress[0]) {
    questsInProgress.forEach(quest => {
      // add background:
      const difficultyColor = quest.getColor();
      const bg = scene.add.image(_x, _y, difficultyColor + "-quest");
      // add text:
      const title = scene.add.bitmapText(bg.x, bg.y, 'font', quest.title, 16)
        .setOrigin(0.5)
      bg.scaleX = 4;
      bg.scaleY = 4;
      scene.questListContainer.add(bg);
      scene.questListContainer.add(title);

      _y += _yIncrement;
    })
  }

  const turnIns = questLog.getByStatus('ready for turn in');

  if (turnIns) {
    turnIns.forEach(quest => {
      // add background:
      const difficultyColor = quest.getColor();
      const bg = scene.add.image(_x, _y, difficultyColor + "-quest");
      // add text:
      const title = scene.add.bitmapText(bg.x, bg.y, 'font', quest.title, 16)
        .setOrigin(0.5)
      bg.scaleX = 4;
      bg.scaleY = 4;
      scene.questListContainer.add(bg);
      scene.questListContainer.add(title);

      _y += _yIncrement;
    })
  }

  const active = quests[questLog.getActive()];
  if (active.getStatus() === 'completed') return;
  selectQuest(scene, active);
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
