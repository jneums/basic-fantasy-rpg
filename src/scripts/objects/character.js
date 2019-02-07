
export default class character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    let name = '';
    let race = '';
    let job = '';
    let level = 1;
    let experience = 0;
    let str = 0;
    let dex = 0;
    let con = 0;
    let int = 0;
    let wis = 0;
    let cha = 0;
    let equipment = [];
    let money = 0;
    let ac = 11;
    let hp = 0;
    let ap = 0;
    let ab = 1;
    let spellbook = [];

    let leftHand = {
      name: 'fist',
      dmg: { min: 1, max: 2 }
    };

    let rightHand = {
      name: 'fist',
      dmg: { min: 1, max: 2 }
    };

    this.getName = () =>  name;
    this.getRace = () => race;
    this.getLevel = () => level;
    this.getExperience = () => experience;
    this.getJob = () => job;
    this.getStr = () => str;
    this.getDex = () => dex;
    this.getCon = () => con;
    this.getInt = () => int;
    this.getWis = () => wis;
    this.getCha = () => cha;
    this.getEquipment = () => equipment;
    this.getMoney = () => money;
    this.getAc = () => ac;
    this.getHp = () => hp;
    this.getLeftHand = () => leftHand;
    this.getRightHand = () => rightHand;
    this.getAb = () => ab;
    this.getSpellbook = () => spellbook;

    this.setName = (newName) => name = newName;
    this.setRace = (newRace) => race = newRace;
    this.setLevel = (newLevel) => level = newLevel;
    this.setExperience = (newExperience) => level = newExperience;
    this.setJob = (newJob) => job = newJob;
    this.setStr = (newStr) => str = newStr;
    this.setDex = (newDex) => dex = newDex;
    this.setCon = (newCon) => con = newCon;
    this.setInt = (newInt) => int = newInt;
    this.setWis = (newWis) => wis = newWis;
    this.setCha = (newCha) => cha = newCha;
    this.setEquipment = (newEquipment) => equipment = newEquipment;
    this.setMoney = (newMoney) => money = newMoney;
    this.setAc = (newAc) => ac = newAc;
    this.setHp = (newHp) => hp = newHp;
    this.setLeftHand = (newLeftHand) => leftHand = newLeftHand;
    this.setRightHand = (newRightHand) => rightHand = newRightHand;
    this.setAb = (newAb) => ab = newAb;
    this.setSpellbook = (newSpellbook) => spellbook = newSpellbook;
  }
}

const races = ['dwarf', 'elf', 'halfling', 'gnome', 'human'];
const jobs = ['cleric', 'fighter', 'magic-user', 'thief'];
