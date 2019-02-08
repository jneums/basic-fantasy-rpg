import Character from '../objects/character';
import * as characterCreator from '../characterCreator';
import { meleeAttack } from '../abilities';
import rollDice from '../dice';
import { corpseDisposal } from '../utilities';
import { Fighter, MagicUser, Cleric, Thief } from '../classTemplates';
import { getWeaponByName } from '../items';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    this.charlie = new Fighter(this, 'charlie');
    this.tina = new MagicUser(this, 'tina');
    this.leslie = new Cleric(this, 'leslie');
    this.mancy = new Thief(this, 'mancy');

    this.boss = new MagicUser(this, 'monstrum');
    this.boss.setHp(250);
    this.boss.setTeam('boss')
    const bossWeapon = getWeaponByName('foam-sword');
    this.boss.setRightHand(bossWeapon)

    this.charlie.setTeam('red');
    this.tina.setTeam('red');
    this.leslie.setTeam('red');
    this.mancy.setTeam('red');
  }

  update() {
    this.children.list.forEach(child => child.update());
    const theDead = corpseDisposal(this);
    if (theDead.length !== 0) {
      theDead.forEach(dead => console.log(dead.getName() + ' died'))
    };
  }
}
