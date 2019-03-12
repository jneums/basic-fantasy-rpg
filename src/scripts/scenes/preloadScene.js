

/**
 * load assets here:
 */
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // priest anims:
    this.load.spritesheet('priest-idle',
      './assets/anims/priest_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )

    // mage amims:
    this.load.spritesheet('mage-idle',
      './assets/anims/mage_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('mage-run',
      './assets/anims/mage_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('mage-combat',
      './assets/anims/mage_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    // mage sword anims (i know, its not a sword, TODO: change character.ANIM):
    this.load.spritesheet('mage-sword-idle',
      './assets/anims/mage_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    )
    this.load.spritesheet('mage-sword-run',
      './assets/anims/mage_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    )
    this.load.spritesheet('mage-sword-stab',
      './assets/anims/mage_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    )

    // barbarian anims:
    this.load.spritesheet('barbarian-idle',
      './assets/anims/barbarian_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    )
    this.load.spritesheet('barbarian-run',
      './assets/anims/barbarian_run_spritesheet.png',
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

    // barbarian sword anims:
    this.load.spritesheet('barbarian-sword-idle',
      './assets/anims/barbarian_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    )
    this.load.spritesheet('barbarian-sword-stab',
      './assets/anims/barbarian_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    )
    this.load.spritesheet('barbarian-sword-run',
      './assets/anims/barbarian_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    )

    // orc anims:
    this.load.spritesheet('orc-mask-idle',
      './assets/anims/orc_mask_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
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

    // orc sword anims:
    this.load.spritesheet('orc-sword-idle',
      './assets/anims/orc_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    )
    this.load.spritesheet('orc-sword-stab',
      './assets/anims/orc_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    )
    this.load.spritesheet('orc-sword-run',
      './assets/anims/orc_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    )

    // drink anim:
    this.load.spritesheet('small-red',
      './assets/anims/red_potion_small_spritesheet.png',
      { frameWidth: 40, frameHeight: 16 }
    )

    // blood spray anim:
    this.load.spritesheet('blood',
      './assets/anims/blood_spritesheet.png',
      { frameWidth: 32, frameHeight: 32 }
    )
    // snow? spell effect that kind of looks like snow...
    this.load.spritesheet('snow',
      './assets/anims/snow_spritesheet.png',
      { frameWidth: 32, frameHeight: 32 }
    )

    // map data:
    this.load.tilemapTiledJSON('map', './assets/map/combat.json')
    this.load.image('v4', './assets/map/0x72_16x16DungeonTileset_extruded.v4.png')


    // bitmap data:
    this.load.bitmapFont('font',
    './assets/fonts/font.png',
    './assets/fonts/font.fnt');

    // load event:
    this.load.on('complete', ()=> {
      this.scene.start('MainScene')
    })
  }

  create() {
  }
}
