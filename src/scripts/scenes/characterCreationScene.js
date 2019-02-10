import { corpseDisposal } from '../utilities';
import { Warrior, Mage, Priest, Rogue } from '../classTemplates';
import { getWeaponByName } from '../items';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    this.charlie = new Warrior(this, 'charlie');
    this.tina = new Mage(this, 'tina');
    this.leslie = new Priest(this, 'leslie');
    // this.mancy = new Rogue(this, 'mancy');

    this.boss = new Warrior(this, 'monstrum');
    this.boss.setHp(250);
    this.boss.setStrength(12);
    this.boss.setTeam('boss')
    const bossWeapon = getWeaponByName('foam-sword');
    this.boss.setRightHand(bossWeapon)

    this.charlie.setTeam('red');
    this.tina.setTeam('red');
    this.leslie.setTeam('red');
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
