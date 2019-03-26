import { clearDialogue, loadDialogue } from './UI/dialogue';
import { hideLoot, showLoot, buildLoot } from './UI/loot';
import { clearInventory, showInventory, selectItem } from './UI/inventory';
import { selectQuest, clearQuestLog, loadQuestLog } from './UI/quest';
import { clearActionBar, loadActionBar } from './UI/actionBar';


import CONST from './Const';



/**
 * UI:
 */
export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });

  }

  create() {
    // lootBox:
    this.lootBoxContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // equipment:
    this.equipmentContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // inventory:
    this.inventoryContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // quest log:
    this.questLogContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // dialogue box:
    this.dialogueBoxContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // icons:
    this.icons = this.add.group();

    // events:
    this.registry.events.on('changedata', this.updateData, this);

  }

  updateData(parent, key, data) {

    if (key === 'reloadUI') {
      clearActionBar(this);
      const icons = data.keyMap.getIcons();
      loadActionBar(this, icons)

    } else if (key === 'openDialogueBox') {
      loadDialogue(this, data);

    } else if (key === 'closeDialogueBox') {
      clearDialogue(this);

    } else if (key === 'openQuestLog') {
      loadQuestLog(this, data);

    } else if (key === 'closeQuestLog') {
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

    } else if (key === 'openEquipment') {
      showEquipment(this, data.stats, data.equipment);

    } else if (key === 'closeEquipment') {
      clearEquipment(this);

    } else if (key === 'selectItem') {
      selectItem(this, data)
    }
  }
}

function showEquipment(scene, stats, equipment) {
  if (!stats) return;

  const equipmentBackground = scene.add.image(0, 0, 'equipment-background');
  equipmentBackground.scaleX = CONST.SCALE;
  equipmentBackground.scaleY = CONST.SCALE;


  const statsHeader = scene.add.bitmapText(-58, 12 * 4, 'font', ['Str: ', 'Agi: ', 'Sta: ', 'Int: ', 'Spi: ', 'Crit: ', 'AP: '], 18)
  const statsInfo = scene.add.bitmapText(38, 12 * 4, 'font', [stats.str, stats.agi, stats.sta, stats.int, stats.spi, stats.crit * 100 + '%', stats.ap], 18)
  statsInfo.setRightAlign()
  // add equipped items:
  scene.equipmentContainer.add([equipmentBackground, statsHeader, statsInfo]);
  buildCharacter(scene, equipment);


}

function buildCharacter(scene, equipment) {
  const _xLeft = -93 * 4;
  const _xRight = -37 * 4;

  const _y1 = -32 * 4;
  const _y2 = -5 * 4;
  const _y3 = 22 * 4;
  const _y4 = 49 * 4;




  for (let item in equipment) {

    let bg = {};

    switch (equipment[item].slot) {
      case 'head':
        const head = scene.add.image(_xLeft, _y1, equipment[item].icon).setOrigin(.5);
        head.scaleX = 4;
        head.scaleY = 4;

        bg = scene.add.image(_xLeft, _y1, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;

        scene.equipmentContainer.add([bg, head]);
      break;
      case 'chest':
        const chest = scene.add.image(_xLeft, _y2, equipment[item].icon).setOrigin(.5);
        chest.scaleX = 4;
        chest.scaleY = 4;

        bg = scene.add.image(_xLeft, _y2, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;


        scene.equipmentContainer.add([bg, chest]);
      break;
      case 'legs':
        const legs = scene.add.image(_xRight, _y2, equipment[item].icon).setOrigin(.5);
        legs.scaleX = 4;
        legs.scaleY = 4;

        bg = scene.add.image(_xRight, _y2, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;

        scene.equipmentContainer.add([bg, legs]);
      break;
      case 'feet':
        const feet = scene.add.image(_xRight, _y4, equipment[item].icon).setOrigin(.5);
        feet.scaleX = 4;
        feet.scaleY = 4;

        bg = scene.add.image(_xRight, _y4, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;


        scene.equipmentContainer.add([bg, feet]);
      break;
      case 'mainHand':
        const mainHand = scene.add.image(_xLeft, _y3, equipment[item].icon).setOrigin(.5);
        mainHand.scaleX = 4;
        mainHand.scaleY = 4;

        bg = scene.add.image(_xLeft, _y3, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;


        scene.equipmentContainer.add([bg, mainHand]);
      break;
      case 'offHand':
        const offHand = scene.add.image(_xRight, _y3, equipment[item].icon).setOrigin(.5);
        offHand.scaleX = 4;
        offHand.scaleY = 4;

        bg = scene.add.image(_xRight, _y3, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;

        scene.equipmentContainer.add([bg, offHand]);
      break;
      case 'ranged':
        const ranged = scene.add.image(_xRight, _y1, equipment[item].icon).setOrigin(.5);
        ranged.scaleX = 4;
        ranged.scaleY = 4;

        bg = scene.add.image(_xRight, _y1, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;

        scene.equipmentContainer.add([bg, ranged]);
      break;
      case 'ring':
        const ring = scene.add.image(_xLeft, _y4, equipment[item].icon).setOrigin(.5);
        ring.scaleX = 4;
        ring.scaleY = 4;

        bg = scene.add.image(_xLeft, _y4, equipment[item].color + '-sm-bg');
        bg.scaleX = 4;
        bg.scaleY = 4;

        scene.equipmentContainer.add([bg, ring]);
      break;
    }

  }


}

function clearEquipment(scene) {
  scene.equipmentContainer.removeAll(true);

}
