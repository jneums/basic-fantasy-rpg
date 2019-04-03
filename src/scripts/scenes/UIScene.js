import { clearDialogue, loadDialogue } from './UI/dialogue';
import { hideLoot, showLoot, buildLoot } from './UI/loot';
import { clearInventory, showInventory } from './UI/inventory';
import { selectQuest, clearQuestLog, loadQuestLog } from './UI/quest';
import { clearActionBar, loadActionBar } from './UI/actionBar';
import itemTooltip from './UI/itemTooltip';
import displayBuffs from './UI/displayBuffs';

import XpBar from './UI/XpBar';
import NameBar from './UI/NameBar';
import ErrorLog from './UI/ErrorLog';


import CONST from './Const';

/**
 * UI:
 */
export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });

  }

  create() {

    this.errorLog = new ErrorLog(this);

    this.selfBuffs = this.add.container(0, 0);

    this.targetBuffs = this.add.container(CONST.GAME_VIEW_WIDTH, 0);
    // xp bar:
    this.XpBar = new XpBar(this);

    this.playerName = new NameBar(this, 'player');
    this.targetName = new NameBar(this, 'target');

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

    // equipment item holder:
    this.invTooltip = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);
    this.compTooltip = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y)
    this.itemContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);
  }


  updateData(parent, key, data) {

    if (key === 'reloadUI') {
      clearActionBar(this);
      const icons = data.keyMap.getIcons();
      loadActionBar(this, icons)
      const info = {
        name: data.getName(),
        level: data.lvl.getLevel()
      }
      this.playerName.set(info);

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


      showEquipment(this, data);

    } else if (key === 'closeEquipment') {
      clearEquipment(this);

    } else if (key === 'selectItem') {
      itemTooltip(this, data, 'inventory')

    } else if (key === 'showComparison') {
      itemTooltip(this, data, 'compare');

    } else if (key == 'selectEquipment') {
      itemTooltip(this, data, 'equip');

    } else if (key === 'refreshXpBar') {
      this.XpBar.set(data);

    } else if (key === 'playerBuffs') {
      displayBuffs(this, data, 'player');

    } else if (key === 'targetBuffs') {
      displayBuffs(this, data, 'target');

    } else if (key === 'targetChange') {
      this.targetName.set(data);

    } else if (key === 'error') {
      this.errorLog(data);
    }
  }
}




function showEquipment(scene, {stats, equipment, crystals}) {
  if (!stats) return;

  const equipmentBackground = scene.add.image(0, 0, 'equipment-background');
  equipmentBackground.scaleX = CONST.SCALE;
  equipmentBackground.scaleY = CONST.SCALE;


  const crystalsText = scene.add.bitmapText(-36 * 4, 46 * 4, 'font', crystals, 36)
    .setOrigin(1, 0)
    .setTint(CONST.TXT_COLOR);

  const statKeyArr = [
    'MaxHP: ',
    'Armr: ',
    'Ddge: ',
    'Str: ',
    'Agi: ',
    'Stam: ',
    'Int: ',
    'Spir: ',
    'Crit: ',
    'Attk: '
  ]


  const statArr = [
    stats.hp,
    stats.armor,
    stats.dodge * 100 + '%',
    stats.str,
    stats.agi,
    stats.sta,
    stats.int,
    stats.spi,
    stats.crit * 100 + '%',
    stats.ap
  ]

  const statsHeader = scene.add.bitmapText(52 * 4, -40 * 4, 'font', statKeyArr, 16).setTint(CONST.TXT_COLOR)
  const statsInfo = scene.add.bitmapText(94 * 4, -40 * 4, 'font', statArr, 16)
    .setTint(CONST.TXT_COLOR)
    .setRightAlign()
    .setOrigin( 1, 0)


  // add equipped items:
  scene.equipmentContainer.add([equipmentBackground, statsHeader, statsInfo, crystalsText]);
  buildCharacter(scene, equipment);


}


function buildCharacter(scene, equipment) {
  const _xLeft = -93 * 4;
  const _xRight = -71 * 4;

  const _y1 = -32 * 4;
  const _y2 = -12 * 4;
  const _y3 = 8 * 4;
  const _y4 = 28 * 4;


  for (let item in equipment) {

    if (equipment[item].hasOwnProperty('slot')) {
      let bg = {};
      switch (equipment[item].slot()) {
        case 'head':
          const head = scene.add.image(_xLeft, _y1, equipment[item].getIcon()).setOrigin(.5);
          head.scaleX = 4;
          head.scaleY = 4;

          bg = scene.add.image(_xLeft, _y1, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, head]);
        break;
        case 'chest':
          const chest = scene.add.image(_xLeft, _y2, equipment[item].getIcon()).setOrigin(.5);
          chest.scaleX = 4;
          chest.scaleY = 4;

          bg = scene.add.image(_xLeft, _y2, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, chest]);
        break;
        case 'legs':
          const legs = scene.add.image(_xRight, _y2, equipment[item].getIcon()).setOrigin(.5);
          legs.scaleX = 4;
          legs.scaleY = 4;

          bg = scene.add.image(_xRight, _y2, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, legs]);
        break;
        case 'feet':
          const feet = scene.add.image(_xRight, _y4, equipment[item].getIcon()).setOrigin(.5);
          feet.scaleX = 4;
          feet.scaleY = 4;

          bg = scene.add.image(_xRight, _y4, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, feet]);
        break;
        case 'mainHand':
          const mainHand = scene.add.image(_xLeft, _y3, equipment[item].getIcon()).setOrigin(.5);
          mainHand.scaleX = 4;
          mainHand.scaleY = 4;

          bg = scene.add.image(_xLeft, _y3, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, mainHand]);
        break;
        case 'offHand':
          const offHand = scene.add.image(_xRight, _y3, equipment[item].getIcon()).setOrigin(.5);
          offHand.scaleX = 4;
          offHand.scaleY = 4;

          bg = scene.add.image(_xRight, _y3, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, offHand]);
        break;
        case 'ranged':
          const ranged = scene.add.image(_xRight, _y1, equipment[item].getIcon()).setOrigin(.5);
          ranged.scaleX = 4;
          ranged.scaleY = 4;

          bg = scene.add.image(_xRight, _y1, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, ranged]);
        break;
        case 'ring':
          const ring = scene.add.image(_xLeft, _y4, equipment[item].getIcon()).setOrigin(.5);
          ring.scaleX = 4;
          ring.scaleY = 4;

          bg = scene.add.image(_xLeft, _y4, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, ring]);
        break;
      }
    }
  }
}

function clearEquipment(scene) {
  scene.equipmentContainer.removeAll(true);
  scene.itemContainer.removeAll(true);

}
