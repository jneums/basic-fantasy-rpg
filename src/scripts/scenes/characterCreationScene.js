import Barbarian from '../objects/classTemplates/barbarian/Barbarian';
import Mage from '../objects/classTemplates/mage/Mage';
import Priest from '../objects/classTemplates/priest/Priest';
import Orc from '../objects/mobTemplates/Orc';
import OrcArcher from '../objects/mobTemplates/OrcArcher';
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
      }
    })
    // use map object to spawn mobs:
    map.getObjectLayer('spawns').objects.forEach(spawnPoint => {
      let npc;
      if (spawnPoint.type === 'orc') {
        npc = new OrcArcher(this, spawnPoint.x + 20, spawnPoint.y);
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


    // set follow to current player controlled character:
    this.cameras.main.setRoundPixels(true)
      .startFollow(this.mage, true, .05, .05)
      .setZoom(4)

  }

  update() {
    // update managers:
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
