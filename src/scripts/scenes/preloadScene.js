export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.spritesheet('barbarian-run',
      './assets/anims/barbarian_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('barbarian-idle',
      './assets/anims/barbarian_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('barbarian-combat',
      './assets/anims/barbarian_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('barbarian-die',
      './assets/anims/barbarian_die_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('barbarian-sword-run',
      './assets/anims/barbarian_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    )
    this.load.spritesheet('barbarian-sword-idle',
      './assets/anims/barbarian_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    )
    this.load.spritesheet('barbarian-sword-stab',
      './assets/anims/barbarian_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    )
    this.load.spritesheet('orc-mask-idle',
      './assets/anims/orc_mask_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('orc-sword-idle',
      './assets/anims/orc_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    )
    this.load.spritesheet('orc-mask-run',
      './assets/anims/orc_mask_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('orc-mask-combat',
      './assets/anims/orc_mask_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('orc-mask-die',
      './assets/anims/orc_mask_die_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('orc-mask-stun',
      './assets/anims/orc_mask_stun_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.image('v4', './assets/map/0x72_16x16DungeonTileset_extruded.v4.png')

    this.load.spritesheet('orc-sword',
      './assets/anims/orc_sword_spritesheet.png',
      { frameWidth: 40, frameHeight: 22 }
    )
    this.load.spritesheet('orc-sword-stab',
      './assets/anims/orc_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    )
    this.load.spritesheet('orc-sword-run',
      './assets/anims/orc_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    )
    this.load.spritesheet('small-red',
      './assets/anims/red_potion_small_spritesheet.png',
      { frameWidth: 40, frameHeight: 16 }
    )
    this.load.spritesheet('blood',
      './assets/anims/blood_spritesheet.png',
      { frameWidth: 32, frameHeight: 32 }
    )
    this.load.spritesheet('snow',
      './assets/anims/snow_spritesheet.png',
      { frameWidth: 32, frameHeight: 32 }
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
