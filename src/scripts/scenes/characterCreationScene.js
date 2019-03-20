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

  preload() {}

  create() {

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

    // add some food:
    this.barbarian.inventory.add(getConsumableByName('Tough Jerky'));
    this.barbarian.inventory.add(getConsumableByName('Tough Jerky'));
    this.mage.inventory.add(getConsumableByName('Tough Jerky'));
    this.mage.inventory.add(getConsumableByName('Refreshing Spring Water'));
    this.mage.inventory.add(getConsumableByName('Refreshing Spring Water'));
    this.priest.inventory.add(getConsumableByName('Refreshing Spring Water'));
    this.priest.inventory.add(getConsumableByName('Refreshing Spring Water'));


    // start as mage:
    inputListeners(this.mage);
    this.mage.controller = 'player';

    // called twice to force update...better way??
    this.registry.set('reloadUI', this.mage)
    this.registry.set('reloadUI', this.mage)
    this.registry.set('closeDialogueBox');

    var timer = this.time.addEvent({
        delay: 5000,                // ms
        callback: testDialogue,
        //args: [],
        callbackScope: this,
        loop: false
    });

    function testDialogue() {
      const welcomeText = "GREETINGS ADVENTURER! WELCOME."
      this.dialogueBoxActive = true;
      this.registry.set('openDialogueBox', 'test');
      this.registry.set('openDialogueBox', welcomeText);

    }


    // set follow to current player controlled character:
    this.cameras.main.setRoundPixels(true)
      .startFollow(this.mage, true, .05, .05)
      .setZoom(4)

    // mini-map:
    this.minimap = this.cameras.add(1110, 0, 200, 200)
      .setName('mini')
      .setBackgroundColor(0x1c1117)
      .startFollow(this.mage, true, .05, .05)
      .setZoom(.2)

  }

  update() {
    // update managers:
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
