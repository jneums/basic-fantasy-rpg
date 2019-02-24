import Warrior from '../objects/classTemplates/warrior/Warrior';
import Rogue from '../objects/classTemplates/Rogue';
import Priest from '../objects/classTemplates/Priest';
import Mage from '../objects/classTemplates/mage/Mage';
import KoboldMiner from '../objects/mobTemplates/KoboldMiner';
import playerInput from '../player/playerInput';
import playerUpdate from '../player/playerUpdate';
import updateUI from '../updates/updateUI';
import updateLiveCharacters from '../updates/updateLiveCharacters';
import updateDeadCharacters from '../updates/updateDeadCharacters';
import { getConsumableByName } from '../loot/consumables';
import { getWeaponByName } from '../loot/weapons';




export default class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }
  preload() {

  }
  create() {
    this.anims.create({
      key: 'player-walk',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
      frameRate: 7,
      yoyo: false,
      repeat: -1
    })
    this.anims.create({
      key: 'stab',
      frames: this.anims.generateFrameNumbers('sword-stab', {frames: [4, 3, 2, 1, 0]}),
      frameRate: 25,
      yoyo: false,
      repeat: 0,
    })
    this.anims.create({
      key: 'sword-walk',
      frames: this.anims.generateFrameNumbers('sword-walk', {frames: [0,1]}),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    })
    this.anims.create({
      key: 'small-red',
      frames: this.anims.generateFrameNumbers('small-red', {frames: [0,1, 1, 0, 0, 0]}),
      frameRate: 2,
      yoyo: false,
      repeat: -1,
    })

    const map = this.make.tilemap({ key: 'map' })
    const floor = map.addTilesetImage('dungeon', 'v4')
    const colliderLayer = map.createStaticLayer("colliders", floor, 0, 0)
    const floorLayer = map.createStaticLayer("floor", floor, 0, 0)
    const wallLayer = map.createStaticLayer("walls", floor, 0, 0)
    const specials = map.createStaticLayer("specials", floor, 0, 0)
    colliderLayer.setCollisionByProperty({ collides: true });
    wallLayer.setCollisionByProperty({ collides: true });
    specials.setCollisionByProperty({ collides: true });
    // group to hold all characters
    this.characters = this.add.group();
    this.physics.add.collider(this.characters, wallLayer);
    this.physics.add.collider(this.characters, specials);
    this.physics.add.collider(this.characters, colliderLayer);
    this.physics.add.collider(this.characters, this.characters);

    map.getObjectLayer('spawns').objects.forEach(spawnPoint => {
      let npc;
      if (spawnPoint.type === 'kobold-miner') {
        npc = new KoboldMiner(this, spawnPoint.x, spawnPoint.y);
      }
      npc.setTexture('characters', 161).setOrigin(.5).setSize(24, 16);
      this.characters.add(npc);
    })

    this.player = new Warrior(this, 60, 110);
    this.player.setTexture('player', 0).setOrigin(.5).setSize(24, 16)
    this.player.inventory.add(getConsumableByName('Tough Jerky'))
    this.player.inventory.add(getConsumableByName('Tough Jerky'))
    this.player.inventory.add(getConsumableByName('Tough Jerky'))
    this.player.AI = playerUpdate();
    playerInput(this.player);

    this.cameras.main.startFollow(this.player)
    this.cameras.main.setZoom(4)
    this.characters.add(this.player)

  }

  update() {
    // update managers:
    updateUI(this);
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
