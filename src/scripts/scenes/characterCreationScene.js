import { corpseDisposal } from '../utilities/utilities';
import Warrior from '../objects/classTemplates/Warrior';
import Rogue from '../objects/classTemplates/Rogue';
import Priest from '../objects/classTemplates/Priest';
import Mage from '../objects/classTemplates/Mage';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    this.charlie = new Warrior(this, 'charlie');
    this.leslie = new Priest(this, 'leslie');
    this.mancy = new Rogue(this, 'mancy');
    this.tina = new Mage(this, 'tina');

    // this.charlie.setTeam('red');
    // this.tina.setTeam('red');
    // this.leslie.setTeam('red');
    // this.mancy.setTeam('red');
  }

  update() {
    this.children.list.forEach(child => child.update())

    const theDead = corpseDisposal(this);
    if (theDead.length !== 0) {
      theDead.forEach(dead => console.log(dead.getName() + ' died'))
    };
  }
}
