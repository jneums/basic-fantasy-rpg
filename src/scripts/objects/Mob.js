export default class Mob extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, 'no-texture')

    let ac = 0;
    let hitDice = 0;
    let hp = 0;
    let numOfAttacks = 0;
    let damage = '';
    let speed = 0;
    let numAppearing = 0;
    let saveAs = '';
    let morale = 0;
    let treasureType = 0;
    let xp = 0;

    this.getAc = function() {
      return ac;
    }

    this.getHitDice = function() {
      return hitDice;
    }

    this.getHp = function() {
      return hp;
    }

    this.getNumOfAttacks = function() {
      return numOfAttacks;
    }

    this.getDamage = function() {
      return damage;
    }

    this.getSpeed = function() {
      return speed;
    }

    this.getNumAppearing = function() {
      return numAppearing;
    }

    this.getSaveAs = function() {
      return saveAs;
    }

    this.getMorale = function() {
      return morale;
    }

    this.getTreasureType = function() {
      return treasureType;
    }

    this.getXp = function() {
      return xp;
    }
  }
}
