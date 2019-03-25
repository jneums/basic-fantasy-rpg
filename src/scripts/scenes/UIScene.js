import { clearDialogue, loadDialogue } from './UI/dialogue';
import { hideLoot, showLoot, buildLoot } from './UI/loot';
import { clearInventory, showInventory } from './UI/inventory';
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

    }
  }
}
