import Warrior from '../objects/classTemplates/warrior/Warrior';
import KoboldMiner from '../objects/mobTemplates/KoboldMiner';
import playerInput from '../player/playerInput';
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
    // use map to spawn mobs:
    map.getObjectLayer('spawns').objects.forEach(spawnPoint => {
      let npc;
      if (spawnPoint.type === 'kobold-miner') {
        npc = new KoboldMiner(this, spawnPoint.x, spawnPoint.y);
      }
      npc.setTexture('orc-mask-idle', 0).setOrigin(.5).setSize(22, 16);
      this.characters.add(npc);
    })

    this.player = new Warrior(this, 60, 110);
    this.player.setTexture('barbarian-run', 0).setSize(22, 16);
    this.player.inventory.add(getConsumableByName('Tough Jerky'))
    this.player.inventory.add(getConsumableByName('Tough Jerky'))
    this.player.inventory.add(getConsumableByName('Tough Jerky'))
    // player update will be handled by user input:
    this.player.AI = playerUpdate();
    playerInput(this.player);
    this.characters.add(this.player)

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.player, true, .05, .05)
    this.cameras.main.setZoom(4)
  }

  update() {
    // update managers:
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
