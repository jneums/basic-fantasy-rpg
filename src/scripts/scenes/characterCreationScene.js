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



export default class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    // is inventory open:
    this.inventoryActive = false;
    // is quest log open:
    this.questLogActive = false;
    // is dialogue box open:
    this.dialogueBoxActive = false;


    // holds all characters:
    this.characters = this.add.group();

    // add animations to scene:
    animationCreator(this);

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


    // add some characters:
    this.mage = new Mage(this, 90, 130);
    this.barbarian = new Barbarian(this, 110, 110);
    this.priest = new Priest(this, 76, 110);



    // start as mage:
    inputListeners(this.mage);
    this.mage.controller = 'player';

    // initialize registry onChange listeners:
    _initRegistry(this);

    _initCameras(this);

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
    .startFollow(scene.mage, true, .05, .05)
    .setZoom(4)

  // mini-map:
  scene.minimap = scene.cameras.add(1110, 0, 200, 200)
    .setName('mini')
    .setBackgroundColor(0x1c1117)
    .startFollow(scene.mage, true, .05, .05)
    .setZoom(.2)
}


function _initRegistry(scene = {}) {
  // called twice to force update...better way??
  scene.registry.set('reloadUI', scene.mage)
  scene.registry.set('reloadUI', scene.mage)

  scene.registry.set('openDialogueBox');
  scene.registry.set('closeDialogueBox');

  scene.registry.set('openQuestLog');
  scene.registry.set('closeQuestLog');
}
