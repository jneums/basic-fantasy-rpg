
export default class character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, 'no-texture')
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
    let movementSpeed = 0;
    let team = '';
    let swingTimer = 0;

    let leftHand = {
      name: 'fist',
      dmg: { min: 1, max: 2 }
    };

    let rightHand = {
      name: 'fist',
      dmg: { min: 1, max: 2 }
    };


    /**
     * getName
     *
     * @returns {string} character name
     */
    this.getName = function() {
      return name;
    }


    /**
     * getRace
     *
     * @returns {string} character race
     */
    this.getRace = function() {
      return race;
    }


    /**
     * getLevel
     *
     * @returns {number} character level
     */
    this.getLevel = function() {
      return level;
    }


    /**
     * getExperience
     *
     * @returns {number} character experience
     */
    this.getExperience = function() {
      return experience;
    }


    /**
     * getJob
     *
     * @returns {string} character class
     */
    this.getJob = function() {
      return job;
    }


    /**
     * getStr
     *
     * @returns {number} character strength
     */
    this.getStr = function() {
      return str;
    }


    /**
     * getDex
     *
     * @returns {number}  character dexterity
     */
    this.getDex = function() {
      return dex;
    }


    /**
     * getCon
     *
     * @returns {number}  character constitution
     */
    this.getCon = function() {
      return con;
    }


    /**
     * getInt
     *
     * @returns {number}  character intelligence
     */
    this.getInt = function() {
      return int;
    }


    /**
     * getWis
     *
     * @returns {number}  character wisdom
     */
    this.getWis = function() {
      return wis;
    }



    /**
     * getCha
     *
     * @returns {number}  character wisdom
     */
    this.getCha = function() {
      return cha;
    }


    /**
     * getEquipment
     *
     * @returns {array}  characters items
     */
    this.getEquipment = function() {
      return equipment;
    }


    /**
     * getMoney
     *
     * @returns {number}  characters money
     */
    this.getMoney = function() {
      return money;
    }


    /**
     * getAc
     *
     * @returns {number}  characters armor class
     */
    this.getAc = function() {
      return ac;
    }


    /**
     * getHp
     *
     * @returns {number}  characters health points
     */
    this.getHp = function() {
      return hp;
    }


    /**
     * getLeftHand
     *
     * @returns {object}  equipped in characters left hand
     */
    this.getLeftHand = function() {
      return leftHand;
    }


    /**
     * getRightHand
     *
     * @returns {object}  equipped in characters right hand
     */
    this.getRightHand = function() {
      return rightHand;
    }


    /**
     * getAb
     *
     * @returns {number}  characters attack bonus
     */
    this.getAb = function() {
      return ab;
    }


    /**
     * getSpellbook
     *
     * @returns {array}  characters spells
     */
    this.getSpellbook = function() {
      return spellbook;
    }


    /**
     * getMovementSpeed
     *
     * @returns {number}  characters walking speed
     */
    this.getMovementSpeed = function() {
      return movementSpeed;
    }


    /**
     * getTeam
     *
     * @returns {string}  characters team
     */
    this.getTeam = function() {
      return team;
    }


    /**
     * getSwingTimer
     *
     * @returns {number}  characters swing cooldown
     */
    this.getSwingTimer = function() {
      return swingTimer;
    }

    /**
     * setName
     *
     * @param  {string} newName
     * @returns {void}
     */
    this.setName = function(newName) {
      name = newName;
    }


    /**
     * setRace
     *
     * @param  {string} newRace
     * @returns {void}
     */
    this.setRace = function(newRace) {
      race = newRace;
    }


    /**
     * setLevel
     *
     * @param  {number} newLevel
     * @returns {void}
     */
    this.setLevel = function(newLevel) {
      level = newLevel;
    }


    /**
     * setExperience
     *
     * @param  {number} newExperience
     * @returns {void}
     */
    this.setExperience = function(newExperience) {
      level = newExperience;
    }


    /**
     * setJob
     *
     * @param  {string} newJob
     * @returns {void}
     */
    this.setJob = function(newJob) {
      job = newJob;
    }


    /**
     * setStr
     *
     * @param  {number} newStr
     * @returns {void}
     */
    this.setStr = function(newStr) {
      str = newStr;
    }


    /**
     * setDex
     *
     * @param  {number} newDex
     * @returns {void}
     */
    this.setDex = function(newDex) {
      dex = newDex;
    }


    /**
     * setCon
     *
     * @param  {number} newCon
     * @returns {void}
     */
    this.setCon = function(newCon) {
      con = newCon;
    }


    /**
     * setInt
     *
     * @param  {number} newInt
     * @returns {void}
     */
    this.setInt = function(newInt) {
      int = newInt;
    }


    /**
     * setWis
     *
     * @param  {number} newWis
     * @returns {void}
     */
    this.setWis = function(newWis) {
      wis = newWis;
    }


    /**
     * setCha
     *
     * @param  {number} newCha
     * @returns {void}
     */
    this.setCha = function(newCha) {
      cha = newCha;
    }


    /**
     * setEquipment
     *
     * @param  {array} newEquipment
     * @returns {void}
     */
    this.setEquipment = function(newEquipment) {
      equipment = newEquipment;
    }


    /**
     * setMoney
     *
     * @param  {number} newMoney
     * @returns {void}
     */
    this.setMoney = function(newMoney) {
      money = newMoney;
    }


    /**
     * setAc - armor class
     *
     * @param  {number} newAc
     * @returns {void}
     */
    this.setAc = function(newAc) {
      ac = newAc;
    }


    /**
     * setHp - hit points
     *
     * @param  {number} newHp
     * @returns {void}
     */
    this.setHp = function(newHp) {
      hp = newHp;
    }


    /**
     * setLeftHand - object in left hand
     *
     * @param  {object} newLeftHand
     * @returns {void}
     */
    this.setLeftHand = function(newLeftHand) {
      leftHand = newLeftHand;
    }


    /**
     * setRightHand - object in right hand
     *
     * @param  {object} newRightHand
     * @returns {void}
     */
    this.setRightHand = function(newRightHand) {
      rightHand = newRightHand;
    }


    /**
     * setAb - attack bonus
     *
     * @param  {number} newAb
     * @returns {void}
     */
    this.setAb = function(newAb) {
      ab = newAb;
    }


    /**
     * setSpellbook - spells character knows
     *
     * @param  {array} newSpellbook
     * @returns {void}
     */
    this.setSpellbook = function(newSpellbook) {
      spellbook = newSpellbook;
    }


    /**
     * setMovementSpeed
     *
     * @param  {number} newSpeed
     * @returns {void}
     */
    this.setMovementSpeed = function(newSpeed) {
      movementSpeed = newSpeed;
    }


    /**
     * setTeam
     *
     * @param  {string} newTeam
     * @returns {void}
     */
    this.setTeam = function(newTeam) {
      team = newTeam;
    }

    /**
     * setSwingTimer
     *
     * @param  {number} newSwingTimer
     * @returns {void}
     */
    this.setSwingTimer = function(newSwingTimer) {
      swingTimer = newSwingTimer;
    }


  }
}

const races = ['dwarf', 'elf', 'halfling', 'gnome', 'human'];
const jobs = ['cleric', 'fighter', 'magic-user', 'thief'];
