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

  create() {
    // group to hold all characters
    this.characters = this.add.group();
    // player controlled character, warrior or mage are playable so far
    this.player = new Warrior(this, 'player');
    this.characters.add(this.player);
    // needs some health restoring food for testing
    this.player.inventory.add(getConsumableByName('Tough Jerky'));
    this.player.inventory.add(getConsumableByName('Tough Jerky'));
    this.player.inventory.add(getConsumableByName('Tough Jerky'));
    // and a wand for testing
    this.player.inventory.add(getWeaponByName('Fire Wand'));
    // allow for listening to input
    this.player.AI = playerUpdate();
    playerInput(this.player);
    // bad guy
    const mob = new KoboldMiner(this);
    this.characters.add(mob);

    // spawn timer
    const timer = this.time.addEvent({
        delay: 50000,                // ms
        callback: () => {
          for (let i = 0; i < 1; i++) {
            const mob = new KoboldMiner(this);
            this.characters.add(mob);
          }
        },
        //args: [],
        callbackScope: this,
        repeat: 4
    });

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
    const keysText = this.player.keys.map((key, i) => i + 1 + ': ' + key).join(" | ")
    this.keyMapText.setText(keysText)

  }

  update() {
    // update managers:
    updateUI(this);
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
