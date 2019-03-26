import Barbarian from '../objects/classTemplates/barbarian/Barbarian';
import Mage from '../objects/classTemplates/mage/Mage';
import Priest from '../objects/classTemplates/priest/Priest';
import Orc from '../objects/mobTemplates/Orc';
import OrcArcher from '../objects/mobTemplates/OrcArcher';
import NPC from '../objects/NPC';
import inputListeners from '../player/inputListeners';
import playerUpdate from '../player/playerUpdate';
import updateLiveCharacters from '../updates/updateLiveCharacters';
import updateDeadCharacters from '../updates/updateDeadCharacters';
import { getConsumableByName } from '../loot/consumables';
import { getWeaponByName } from '../loot/weapons';
import animationCreator from './animationCreator';
import mapCreator from './mapCreator';

import CONST from './Const';



export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DungeonScene' })
  }


  init(data) {
    this.registry.set('reloadUI', 'init');

    // holds all characters:
    this.characters = this.add.group();


    // add animations to scene:
    animationCreator(this);



    // create selected character class:
    this.player = {};
    switch (data.class) {

      default:
      case 'barbarian':
      this.player = new Barbarian(this, 110, 110);
      break;

      case 'mage':
      this.player = new Mage(this, 90, 130);
      break;

      case 'priest':
      this.player = new Priest(this, 76, 110);
      break;

    }

    // init starting characters input:
    inputListeners(this.player);
    this.registry.set('reloadUI', this.player);



  }



  create() {

    // is equipped open:
    this.equipmentActive = false;
    // is lootBoxOpen:
    this.lootBoxActive = false;
    // is inventory open:
    this.inventoryActive = false;
    // is quest log open:
    this.questLogActive = false;
    // is dialogue box open:
    this.dialogueBoxActive = false;


    // create map:
    const map = mapCreator(this);
    // use map object to spawn mobs:
    map.getObjectLayer('spawns').objects.forEach(spawnPoint => {
      let npc;
      if (spawnPoint.type === 'orc') {
        npc = new Orc(this, spawnPoint.x, spawnPoint.y);
      } else if (spawnPoint.type === 'quest') {
        npc = new NPC(this, spawnPoint.x, spawnPoint.y);
      }
    })


    _initCameras(this);

    this.registry.set('openEquipment');
    this.registry.set('closeEquipment');

    this.registry.set('openLootBox');
    this.registry.set('closeLootBox');

    this.registry.set('openInventory');
    this.registry.set('closeInventory');

    this.registry.set('openDialogueBox');
    this.registry.set('closeDialogueBox');

    this.registry.set('openQuestLog');
    this.registry.set('closeQuestLog');

    this.player.controller = 'player';




  }

  update() {
    // update managers:
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }

}




function _initCameras(scene = {}) {

  // set follow to current player controlled character:
  scene.cameras.main.setRoundPixels(true)
    .setSize(1106, 682)
    .startFollow(scene.player, true, .05, .05)
    .setZoom(CONST.SCALE)

  // mini-map:
  scene.minimap = scene.cameras.add(1110, 0, 200, 200)
    .setName('mini')
    .setBackgroundColor(0x1c1117)
    .startFollow(scene.player, true, .05, .05)
    .setZoom(.2)
}
