import CONST from './Const';

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
    // lootBox:
    this.lootBoxContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);


    // inventory:
    this.inventoryContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);


    // quest log:
    this.questLogContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);
    const questLogBackground = this.add.image( 0, 0, 'questLog');
    questLogBackground.scaleX = CONST.SCALE;
    questLogBackground.scaleY = CONST.SCALE;

    const questLogTitle = this.add.bitmapText(0, -208,  'font', 'Quests', CONST.TXT_L);
    questLogTitle.setOrigin(0.5);
    this.questDescription = this.add.bitmapText( -40,-158, 'font', '', CONST.TXT_M);
    this.questStatus = this.add.bitmapText( -40,0, 'font', '', CONST.TXT_M);


    this.questLogContainer.setVisible(false);
    this.questLogContainer.add([questLogBackground, questLogTitle, this.questDescription, this.questStatus]);


    this.questListContainer = this.add.container(this.questLogContainer.x, this.questLogContainer.y);


    // dialogue box:
    this.dialogueBoxContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);
    const dialogueBoxBackground = this.add.image(0, 0, 'dialogueBox');
    dialogueBoxBackground.scaleX = CONST.SCALE;
    dialogueBoxBackground.scaleY = CONST.SCALE;

    this.dialogueBoxContainer.setVisible(false);

    this.dialogueText = this.add.dynamicBitmapText( 0, 0, 'font', '', CONST.TXT_S);

    this.dialogueText.setOrigin(.5).setCenterAlign();

    this.dialogueBoxContainer.add([dialogueBoxBackground, this.dialogueText]);

    // icons:
    this.icons = this.add.group();
    // action bars:
    this.actionBars = this.add.image(0,0,'ui');
    this.actionBars.setOrigin(0);
    this.actionBars.scaleX = CONST.SCALE;
    this.actionBars.scaleY = CONST.SCALE;

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

    } else if (key === 'openInventory') {
      showInventory(this, data);

    } else if (key === 'closeInventory') {
      clearInventory(this);

    } else if (key === 'openLootBox') {
      showLoot(this, data);

    } else if (key === 'closeLootBox') {

      hideLoot(this);

    }
  }
}


function clearInventory(scene) {
  scene.inventoryContainer.removeAll(true);
  scene.inventoryContainer.setVisible(false);

}


function buildLoot(scene, item, index) {

  let _x = 0;
  let _y = 0;
  let _xOffset = 0;
  let _yOffset = 0;


  // looting position:
  if (index > 5) {
    _xOffset = 360 / 2;
    _yOffset = (-126 / 2) - 13;
    _x = _xOffset;
    _y = (-376 / 2) + ((-index + 6) * _yOffset);
  } else if (index > 0) {
    _xOffset = -512 / 2;
    _yOffset = (-126 / 2) - 13;
    _x = _xOffset;
    _y = (-376 / 2) + (-index * _yOffset);
  } else if (index > -1) {
    _x = -512 / 2;
    _y = -376 / 2;
  }



  // add colored bg:
  const bg = scene.add.image(_x, _y, item.color + '-bg');
  bg.scaleX = CONST.SCALE;
  bg.scaleY = CONST.SCALE;

  // set loot icon over bg:
  const lootIcon = scene.add.image(_x -136, _y, item.icon);
  lootIcon.scaleX = CONST.SCALE;
  lootIcon.scaleY = CONST.SCALE;

  // name:

  // qty:
  let qtyText = item.quantity ? `x${item.quantity}` : ''

  const lootName = scene.add.bitmapText(_x - 100, _y - 18, 'font', item.name + ' ' + qtyText, 16);

   if (index > -1) {
     scene.inventoryContainer.add([bg, lootIcon, lootName]);

   } else {
     scene.lootBoxContainer.add([bg, lootIcon, lootName]);

   }

}


function showInventory(scene, inventory) {
  if (!inventory) return;

  const inventoryBackground = scene.add.image(0, 0, 'inventory-background');
  inventoryBackground.scaleX = CONST.SCALE;
  inventoryBackground.scaleY = CONST.SCALE;

  scene.inventoryContainer.add([inventoryBackground]);

  inventory.forEach((item, i) => {
    buildLoot(scene, item, i);
  })

  scene.inventoryContainer.setVisible(true);

}

function hideLoot(scene) {
  scene.lootBoxContainer.removeAll(true);
}


function showLoot(scene, loot) {

  const lootBoxBackground = scene.add.image(0, -8, 'loot-box-background');
  lootBoxBackground.scaleX = CONST.SCALE;
  lootBoxBackground.scaleY = CONST.SCALE;

  scene.lootBoxContainer.add(lootBoxBackground);

  buildLoot(scene, loot, -1);

  scene.lootBoxContainer.setVisible(true);
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
      const title = scene.add.bitmapText(bg.x, bg.y, 'font', quest.title, CONST.TXT_M)
        .setOrigin(0.5)
      bg.scaleX = CONST.SCALE;
      bg.scaleY = CONST.SCALE;
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
      const title = scene.add.bitmapText(bg.x, bg.y, 'font', quest.title, CONST.TXT_M)
        .setOrigin(0.5)
      bg.scaleX = CONST.SCALE;
      bg.scaleY = CONST.SCALE;
      scene.questListContainer.add(bg);
      scene.questListContainer.add(title);

      _y += _yIncrement;
    })
  }

  const active = quests[questLog.getActiveQuestIndex()];
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
