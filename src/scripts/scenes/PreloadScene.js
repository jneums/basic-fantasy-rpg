

/**
 * load assets here:
 */
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // bitmap data:
    this.load.bitmapFont('font',
    './assets/fonts/font.png',
    './assets/fonts/font.fnt');


    const loadingText = this.make.text({
    x: width / 2,
    y: height / 2,
    text: 'Loading...',
    style: {
        font: '28px monospace',
        fill: '#ffffff'
      }
    });

    loadingText.setOrigin(0.5, 0.5);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(380, 270, 520, 50);

    // casting animations:
    this.load.spritesheet('mage-sword-frost-cast',
      './assets/anims/mage_sword_frost_cast_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('priest-sword-nature-cast',
      './assets/anims/priest_sword_nature_cast_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    // npc anims:
    this.load.spritesheet('npc-idle',
      './assets/anims/npc_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('npc-unarmed-idle',
      './assets/anims/npc_unarmed_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    // npc anims:
    this.load.spritesheet('guard-idle',
      './assets/anims/guard_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('guard-sword-idle',
      './assets/anims/guard_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    );


    // priest anims:
    this.load.spritesheet('priest-idle',
      './assets/anims/priest_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // red mage:
    this.load.spritesheet('archmage-idle',
      './assets/anims/red_mage_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // mage amims:
    this.load.spritesheet('mage-idle',
      './assets/anims/mage_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('mage-run',
      './assets/anims/mage_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('mage-combat',
      './assets/anims/mage_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // mage sword anims (i know, its not a sword, TODO: change character.ANIM):
    this.load.spritesheet('mage-sword-idle',
      './assets/anims/mage_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('mage-sword-run',
      './assets/anims/mage_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('mage-sword-stab',
      './assets/anims/mage_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    );


    // barbarian anims:
    this.load.spritesheet('barbarian-idle',
      './assets/anims/barbarian_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('barbarian-run',
      './assets/anims/barbarian_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('barbarian-combat',
      './assets/anims/barbarian_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('barbarian-die',
      './assets/anims/barbarian_die_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // barbarian sword anims:
    this.load.spritesheet('barbarian-sword-idle',
      './assets/anims/barbarian_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('barbarian-sword-stab',
      './assets/anims/barbarian_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    );

    this.load.spritesheet('barbarian-sword-run',
      './assets/anims/barbarian_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    // orc anims:
    this.load.spritesheet('orc-mask-idle',
      './assets/anims/orc_mask_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-run',
      './assets/anims/orc_mask_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-combat',
      './assets/anims/orc_mask_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-die',
      './assets/anims/orc_mask_die_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-stun',
      './assets/anims/orc_mask_stun_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // orc sword anims:
    this.load.spritesheet('orc-sword-idle',
      './assets/anims/orc_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    );

    this.load.spritesheet('orc-sword-stab',
      './assets/anims/orc_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    );

    this.load.spritesheet('orc-sword-run',
      './assets/anims/orc_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    );

    // drink anim:
    this.load.spritesheet('small-red',
      './assets/anims/red_potion_small_spritesheet.png',
      { frameWidth: 40, frameHeight: 16 }
    );

    // poly anim:
    this.load.spritesheet('polymorph',
      './assets/anims/poly_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );


    // map data:
    this.load.tilemapTiledJSON('map', './assets/map/combat.json');
    this.load.image('v4', './assets/map/0x72_16x16DungeonTileset_extruded.v4.png');

    // icons:
    // barbarian:
    this.load.image('rush', './assets/icons/rush.png');
    this.load.image('gore', './assets/icons/gore.png');
    this.load.image('precision', './assets/icons/precision.png');
    this.load.image('shout', './assets/icons/shout.png');
    this.load.image('intimidate', './assets/icons/intimidate.png');
    this.load.image('hobble', './assets/icons/hobble.png');

    // mage:
    this.load.image('wand', './assets/icons/wand.png');
    this.load.image('focus', './assets/icons/focus.png');
    this.load.image('bomb', './assets/icons/bomb.png');
    this.load.image('frostbolt', './assets/icons/frostbolt.png');
    this.load.image('poly', './assets/icons/poly.png');

    //priest:
    this.load.image('heal', './assets/icons/heal.png');
    this.load.image('renew', './assets/icons/renew.png');

    // large item bg's:
    this.load.image('brown-bg', 'assets/icons/brown_bg.png');
    this.load.image('green-bg', 'assets/icons/green_bg.png');
    this.load.image('yellow-bg', 'assets/icons/yellow_bg.png');
    this.load.image('blue-bg', 'assets/icons/blue_bg.png');
    this.load.image('purple-bg', 'assets/icons/purple_bg.png');
    this.load.image('red-bg', 'assets/icons/red_bg.png');
    this.load.image('grey-bg', 'assets/icons/grey_bg.png');

    // small item bg's:
    this.load.image('brown-sm-bg', 'assets/icons/brown_small_bg.png');
    this.load.image('green-sm-bg', 'assets/icons/green_small_bg.png');
    this.load.image('yellow-sm-bg', 'assets/icons/yellow_small_bg.png');
    this.load.image('blue-sm-bg', 'assets/icons/blue_small_bg.png');
    this.load.image('purple-sm-bg', 'assets/icons/purple_small_bg.png');
    this.load.image('red-sm-bg', 'assets/icons/red_small_bg.png');
    this.load.image('grey-sm-bg', 'assets/icons/grey_small_bg.png');

    // items:
    this.load.image('leather_scraps', './assets/icons/leather_scraps.png');
    this.load.image('ichor', './assets/icons/ichor.png');
    this.load.image('ore', './assets/icons/ore.png');

    this.load.image('white_shirt', './assets/icons/white_shirt.png');
    this.load.image('shadow_staff', './assets/icons/shadow_staff.png');
    this.load.image('ring_01', './assets/icons/ring_01.png');
    this.load.image('slippers', './assets/icons/slippers.png');
    this.load.image('cloth', './assets/icons/cloth.png');
    this.load.image('water', './assets/icons/water.png');
    this.load.image('cheese', './assets/icons/cheese.png');
    this.load.image('frost_wand', './assets/icons/frost_wand.png');
    this.load.image('shadow_wand', './assets/icons/shadow_wand.png');
    this.load.image('short_sword', './assets/icons/short_sword.png');
    this.load.image('mail_chest', './assets/icons/mail_chest.png');
    this.load.image('mail_boots', './assets/icons/mail_boots.png');
    this.load.image('leather', './assets/icons/leather.png');
    this.load.image('tarnished_sword', './assets/icons/tarnished_sword.png');
    this.load.image('gold_dagger', './assets/icons/gold_dagger.png');

    this.load.image('nature-ball', './assets/anims/nature_ball.png');
    this.load.image('frost-ball', './assets/anims/frost_ball.png');
    this.load.image('fire-ball', './assets/anims/fire_ball.png');
    this.load.image('arcane-ball', './assets/anims/arcane_ball.png');
    this.load.image('shadow-ball', './assets/anims/shadow_ball.png');


    this.load.image('inventory', './assets/icons/inventory.png');
    this.load.image('quest', './assets/icons/quest.png');
    this.load.image('equipment', './assets/icons/equipment.png');

    // ui:
    this.load.image('ui', './assets/ui/ui.png');
    this.load.image('dialogueBox', './assets/ui/dialogue.png');
    this.load.image('questLog', './assets/ui/quest_log.png');
    this.load.image('inventory-background', './assets/ui/inventory.png');
    this.load.image('equipment-background', './assets/ui/equipment.png');
    this.load.image('loot-box-background', './assets/ui/loot_box.png');


    // character selection screen:
    this.load.image('character-select', './assets/ui/character_selection.png');

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xbf7b3f, 1);
      progressBar.fillRect(390, 280, 500 * value, 30);
    });


    this.registry.set('reloadUI');
    this.registry.set('refreshXpBar');

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

    this.registry.set('selectItem');
    this.registry.set('showComparison');
    this.registry.set('selectQuest');
    this.registry.set('selectEquipment');
    this.registry.set('targetChange');
    this.registry.set('error');


    // load event:
    this.load.on('complete', ()=> {
      loadingText.destroy();
      progressBar.destroy();
      progressBox.destroy();
      this.scene.start('CharacterSelectionScene')
    })

  }

}
