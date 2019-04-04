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
        instructions: formatDialogue("Welcome to the training grounds. We have no time to finish your formal training, we need you in the fray immediately. The first thing you must learn is to take your enemy by surprise. Use 'rush' to charge your enemy and knock him off balance.")
      },
      hobble: {
        name: 'hobble',
        instructions: formatDialogue("You are incredibly slow, I worry about our odds. Perhaps I should teach you to put distance between yourself and your enemy. Use 'hobble' to crush your victims ankle, preventing them from running at their normal speed.")
      },
      gore: {
        name: 'gore',
        instructions: formatDialogue("We don't have time for your messing around! While you were wasting time, we lost several good men. Perhaps if you use 'gore', it wont take you so long to dispose of one lousy orc.")
      },
      precision: {
        name: 'precision',
        instructions: formatDialogue("In order to be a great fighter, you must use your rage, and aim carefully for the head. Enable 'precision' and your next blow will be perfectly aimed, dealing much more damage. Take note, it will only occur if you have enough rage.")
      },
      shout: {
        name: 'shout',
        instructions: formatDialogue("In battle, the importance of fearlesness cannot be stated enough. I will teach you how to 'shout', letting out a fierce cry, motivating and encouraging not only you, but your close friends and allies as well! Do not underestimate its value.")
      },
      intimidate: {
        name: 'intimidate',
        instructions: formatDialogue("You are almost there friend. The next thing you must learn is the ability to strike fear into the hearts and minds of your enemy. When your enemy is afraid for it's life, he will be slow and clumsy. Use your rage and fury to 'intimidate' your opponents.")
      },
      bomb: {
        name: 'bomb',
        instructions: formatDialogue("The arcane bomb is one of the mages most powerful spells. Place an unstable mass of arcane energy onto your opponent, where it will detonate three times over a short amount of time, dealing high arcane damage and threat. Go ahead and try it out now.")
      },
      frostbolt: {
        name: 'frostbolt',
        instructions: formatDialogue("The mage is a wielder of natural and arcane forces. One of the most popular has been the study of frost and ice, especially amongst combat mages. The 'frostbolt' will cause a moderate amount of damage, but will also slow the target, giving you extra time.")
      },
      focus: {
        name: 'focus',
        instructions: formatDialogue("The primary attribute of the combat mage is a high intellect. High intellect means the mage can not only cast more powerful spells, but can also cast more spells before running out of mana. Use 'focus' on yourself and your allies to grant a temporary intellect boost.")
      },
      wand: {
        name: 'wand',
        instructions: formatDialogue("The wand is the mages primary weapon. Because their source of energy is infused during the creation process, they require no mana to operate. They have a fast use time, and can be used while running. Become well aquinted with your wand, you will use it much.")
      },
      poly: {
        name: 'poly',
        instructions: formatDialogue("The polymorph is one of the mages oldest known spells. Unleashing a gigantic amount of wild magic on your enemy will temporary transform it into a docile creature, unable to fight or harm you. Be carefult though, any damage will break the spell.")
      }
    }


    // create map:
    const map = mapCreator(this);

    // use map object to spawn mobs:
    map.getObjectLayer('spawns').objects.forEach(spawnPoint => {

      let npc;

      if (spawnPoint.type === 'orc') {

        npc = new Orc(this, spawnPoint.x, spawnPoint.y);


      } else if (spawnPoint.name === 'quest') {
        npc = new NPC(this, spawnPoint.x, spawnPoint.y, spawnPoint.type);

      } else if (spawnPoint.name === 'trainer') {
        if (spawnPoint.type === this.player.getCharacterClass()) {
          npc = new Trainer(this, spawnPoint.x, spawnPoint.y, spawnPoint.type + '-' + spawnPoint.name, abilities[spawnPoint.properties[0].value]);

        }

      } else if (spawnPoint.name === 'entrance') {

        this.player.x = spawnPoint.x;
        this.player.y = spawnPoint.y;
        this.player.movement.setMoveTargetCoords([spawnPoint.x, spawnPoint.y])

      } else if (spawnPoint.name === 'exit') {

        // create rectangle with collider, trigger scene shutdown on collide:
        const exit = this.add.rectangle(spawnPoint.x, spawnPoint.y, spawnPoint.width, spawnPoint.height, 0xffffff).setOrigin(0).setVisible(false);


        this.physics.add.existing(exit);

        exit.body.setImmovable()

        const zoneTrigger = this.physics.add.collider(this.player, exit, (a, b) => {
          zoneTrigger.destroy();
          this.cameras.main.fadeOut(1500);
          this.time.delayedCall(1500, () => {

            this.scene.start('CharacterSelectionScene')
            this.scene.stop('UIScene');
            this.scene.stop('DungeonScene');

          });
        });
      }

    })


    _initCameras(this);


    this.player.controller = 'player';

    this.player.inventory.add(getConsumableByName('Spring Water'));
    this.player.inventory.add(getConsumableByName('Orc Jerky'));
    this.player.inventory.add(getConsumableByName('Orc Jerky'));
    this.player.inventory.add(getWeaponByName('Shadow Wand'));
    this.player.inventory.add(getWeaponByName('Short Sword'));

    this.player.inventory.addCrystals(100);

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
