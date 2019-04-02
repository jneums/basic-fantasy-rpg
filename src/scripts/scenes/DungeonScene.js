import Barbarian from '../objects/classTemplates/barbarian/Barbarian';
import Mage from '../objects/classTemplates/mage/Mage';
import Priest from '../objects/classTemplates/priest/Priest';
import Orc from '../objects/mobTemplates/Orc';
import OrcArcher from '../objects/mobTemplates/OrcArcher';
import NPC from '../objects/NPC';
import Trainer from '../objects/Trainer';
import inputListeners from '../player/inputListeners';
import playerUpdate from '../player/playerUpdate';
import updateLiveCharacters from '../updates/updateLiveCharacters';
import updateDeadCharacters from '../updates/updateDeadCharacters';
import { getConsumableByName } from '../loot/consumableAPI';
import { getWeaponByName } from '../loot/weaponAPI';
import animationCreator from './animationCreator';
import mapCreator from './mapCreator';

import Weapon from '../loot/Weapon';

import CONST from './Const';
import formatDialogue from './formatDialogue';


export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DungeonScene' })
  }


  init(data) {
    this.registry.set('reloadUI', 'init');
    this.registry.set('refreshXpBar');


    // holds all characters:
    this.characters = this.add.group();


    // add animations to scene:
    animationCreator(this);



    // create selected character class:
    this.player = {};
    switch (data.class) {

      default:
      case 'barbarian':
      this.player = new Barbarian(this, 0, 0);
      break;

      case 'mage':
      this.player = new Mage(this, 0, 0);
      break;

      case 'priest':
      this.player = new Priest(this, 0, 0);
      break;

    }

    // init starting characters input:
    inputListeners(this.player);
    this.registry.set('reloadUI', this.player);
    this.registry.set('refreshXpBar', this.player.lvl.lvlInfo());


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

    const abilities = {
      rush: {
        name: 'rush',
        instructions: formatDialogue("Welcome to the training grounds. It is here that the greatest champions of the Labyrinth begin their journey. The first thing you must learn is to take your enemy by surprise. Use 'rush' to charge your enemy and knock him off balance.")
      },
      hobble: {
        name: 'hobble',
        instructions: formatDialogue("You have made it this far, so you are probably wondering how to put distance between yourself and your enemy! Now I will teach you the art of 'hobble'. By striking your opponent precicely at this point in their leg, they will be unable to move at their normal speed.")
      },
      gore: {
        name: 'gore',
        instructions: formatDialogue("Well done! That was quicker than most students, you show great promise! I will now teach you the art of making your opponent bleed. Use 'gore' to inflict a painful wound that will cause periodic damage over time. Go ahead and try it out.")
      },
      precision: {
        name: 'precision',
        instructions: formatDialogue("In order to be a great fighter, you must control your fury, and aim carefully for the head. Enable 'precision' and your next blow will be perfectly aimed, dealing much more damage. Take note, it will only occur if you have enough rage.")
      },
      shout: {
        name: 'shout',
        instructions: formatDialogue("In battle, the importance of fearlesness cannot be stated enough. I will teach you how to 'shout', letting out a fierce cry, motivating and encouraging not only you, but your close friends and allies as well! Do not underestimate its value.")
      }
    }


    // create map:
    const map = mapCreator(this);

    // use map object to spawn mobs:
    map.getObjectLayer('spawns').objects.forEach(spawnPoint => {

      let npc;

      if (spawnPoint.type === 'orc') {

        npc = new Orc(this, spawnPoint.x, spawnPoint.y);


      } else if (spawnPoint.type === 'quest') {

        npc = new NPC(this, spawnPoint.x, spawnPoint.y);


      } else if (spawnPoint.name === 'trainer') {

        npc = new Trainer(this, spawnPoint.x, spawnPoint.y, spawnPoint.type + '-' + spawnPoint.name, abilities[spawnPoint.properties[0].value]);

      } else if (spawnPoint.name === 'player') {

        this.player.x = spawnPoint.x;
        this.player.y = spawnPoint.y;
        this.player.movement.setMoveTargetCoords([spawnPoint.x, spawnPoint.y])

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

    this.registry.set('selectItem');
    this.registry.set('showComparison');
    this.registry.set('selectQuest');
    this.registry.set('selectEquipment');
    this.registry.set('targetChange');

    this.player.controller = 'player';

    this.player.inventory.add(getConsumableByName('Spring Water'));
    this.player.inventory.add(getConsumableByName('Orc Jerky'));
    this.player.inventory.add(getConsumableByName('Orc Jerky'));
    this.player.inventory.add(getWeaponByName('Shadow Wand'));
    this.player.inventory.add(getWeaponByName('Short Sword'));

    const tarnishedSword = new Weapon(
      'Tarnished Sword',
      'Beat up training sword.',
      { strength: 1 },
      1,
      1,
      1,
      'mainHand',
      'twoHandSword',
      3.2,
      25,
      20,
      { min: 4, max: 6 },
      'item-44'
    )

    tarnishedSword.lvlUp()
    tarnishedSword.lvlUp();
    tarnishedSword.lvlUp()
    tarnishedSword.lvlUp()

    this.player.inventory.add(tarnishedSword);

    this.player.equipment.equipped().mainHand.lvlUp()
    this.player.equipment.equipped().mainHand.lvlUp()

    this.player.skills.levelUpSkill('twoHandSword')
    this.player.skills.levelUpSkill('twoHandSword')
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
    .setZoom(3)
    .fadeIn(500)

}
