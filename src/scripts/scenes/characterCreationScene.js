import { corpseDisposal } from '../utilities/utilities';
import Warrior from '../objects/classTemplates/warrior/Warrior';
import Rogue from '../objects/classTemplates/Rogue';
import Priest from '../objects/classTemplates/Priest';
import Mage from '../objects/classTemplates/Mage';
import KoboldMiner from '../objects/mobTemplates/KoboldMiner';
import playerInput from '../player/playerInput';
import playerUpdate from '../player/playerUpdate';
import updateUI from '../../updates/updateUI';
import updateLiveCharacters from '../../updates/updateLiveCharacters';
import updateDeadCharacters from '../../updates/updateDeadCharacters';

export default class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    this.characters = this.add.group();

    this.charlie = new Warrior(this, 'charlie');
    this.characters.add(this.charlie);
    // allow for listening to input
    this.charlie.update = playerUpdate();
    playerInput(this.charlie);

    for (let i = 0; i < 3; i++) {
      const mob = new KoboldMiner(this, 'kobold');
      this.characters.add(mob);
    }

    // this.mancy = new Rogue(this, 'mancy');
    // this.tina = new Mage(this, 'tina');

    // this.charlie.setTeam('red');
    // this.tina.setTeam('red');
    // this.leslie.setTeam('red');
    // this.mancy.setTeam('red');
    //
    this.hpText = this.add.text(80, 60, '0', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.rageText = this.add.text(80, 120, '0', { fontFamily: 'Arial', fontSize: 64, color: '#ff0000' });
    this.enemyHpText = this.add.text(260, 60, '', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
  }


  update() {
    updateUI(this);
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
