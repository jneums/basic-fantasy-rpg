export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.spritesheet('player',
    './assets/anims/spritesheet.png',
    { frameWidth: 16, frameHeight: 21 }
    )
    this.load.image('v4', './assets/map/0x72_16x16DungeonTileset.v4.png')
    this.load.spritesheet('characters',
      './assets/map/0x72_16x16DungeonTileset.v4.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('sword-stab',
      './assets/anims/sword_stab.png',
      { frameWidth: 55, frameHeight: 6 }
    )
    this.load.spritesheet('sword-walk',
      './assets/anims/vert_sword_spritesheet.png',
      { frameWidth: 40, frameHeight: 22 }
    )
    this.load.spritesheet('small-red',
      './assets/anims/red_potion_small_spritesheet.png',
      { frameWidth: 40, frameHeight: 16 }
    )
    this.load.spritesheet('kobold',
      './assets/anims/kobold_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.tilemapTiledJSON('map', './assets/map/combat.json')

  this.load.bitmapFont('font',
  './assets/fonts/font.png',
  './assets/fonts/font.fnt');
  this.load.on('complete', ()=> {
    this.scene.start('MainScene')
  })
  }

  create() {
  }
}
