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

function addPlayer(scene = {}, playerObject = {}) {
  // player controlled character, warrior or mage are playable so far
  scene.player = new Warrior(scene, playerObject.x, playerObject.y, playerObject.playerId);
  scene.characters.add(scene.player);

  // allow for listening to input
  scene.player.AI = playerUpdate();
  playerInput(scene.player);

  const keysText = scene.player.keys.map((key, i) => i + 1 + ': ' + key).join(" | ")
  scene.keyMapText.setText(keysText)
}

function addOtherPlayers(scene = {}, playerObject = {}) {
  // player controlled character, warrior or mage are playable so far
  const otherPlayer = new Warrior(scene, playerObject.x, playerObject.y, playerObject.playerId);
  scene.characters.add(otherPlayer);
}

export default class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    // create socket.io object:
    this.socket = io();
    // group to hold all characters
    this.characters = this.add.group();
    this.socket.on('currentPlayers', (players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {
          addPlayer(this, players[id]);
        } else {
          addOtherPlayers(this, players[id]);
        }
      })
    })
    
    this.socket.on('newPlayer', (playerInfo) => {
      addOtherPlayers(this, playerInfo);
    })

    this.socket.on('playerMoved', (playerInfo) => {
      this.characters.getChildren().forEach(child => {
        if (playerInfo.playerId === child.getName()) {
          child.setPosition(playerInfo.x, playerInfo.y);
        }
      })
    })

    this.socket.on('disconnect', (playerId) => {
      this.characters.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.getName()) {
          otherPlayer.destroy();
        }
      })
    })


    // ui stuff, used for debugging right now
    this.inventoryText = this.add.text(10, 420, '', {fontFamily: 'Arial', fontSize: 18, color: '#000000'})
    this.hpText = this.add.text(10, 20, '0', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
    this.resourceText = this.add.text(10, 50, '0', { fontFamily: 'Arial', fontSize: 32, color: '#ff0000' });
    this.mySwingTimer = this.add.text(10, 90, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
    this.myBuffs = this.add.text(10, 110, '', { fontFamily: 'Arial', fontSize: 16, color: '#0000ff' });
    this.myStats = this.add.text(10, 220, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' })

    this.enemyNameText = this.add.text(260, 2, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' })
    this.enemyHpText = this.add.text(260, 20, '', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
    this.enemySwingTimer = this.add.text(260, 90, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
    this.enemyBuffs = this.add.text(260, 110, '', { fontFamily: 'Arial', fontSize: 16, color: '#0000ff' });
    this.keyMapText = this.add.text(10, 680, '', { fontFamily: 'Arial', fontSize: 26, color: '#000000' });


  }

  update() {
    if (!this.player) return;
    // update managers:
    updateUI(this);
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
