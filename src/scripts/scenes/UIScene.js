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
      showEquipment(this, data);

    } else if (key === 'closeEquipment') {
      clearEquipment(this);

    } else if (key === 'selectItem') {
      selectItem(this, data)
    }
  }
}

function showEquipment(scene, stats) {
  if (!stats) return;

  const equipmentBackground = scene.add.image(0, 0, 'equipment-background');
  equipmentBackground.scaleX = CONST.SCALE;
  equipmentBackground.scaleY = CONST.SCALE;


  const statsHeader = scene.add.bitmapText(-420, -176, 'font', ['Strength: ', 'Agility: ', 'Stamina: ', 'Intellect: ', 'Spirit: '], 18)
  const statsInfo = scene.add.bitmapText(-216, -176, 'font', [stats.str, stats.agi, stats.sta, stats.int, stats.spi], 18)
  statsInfo.setRightAlign()
  // add equipped items:
  scene.equipmentContainer.add([equipmentBackground, statsHeader, statsInfo]);


}

function clearEquipment(scene) {
  scene.equipmentContainer.removeAll(true);

}
