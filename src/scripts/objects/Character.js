import Stat from './Managers/Stats';
import Skills from './Managers/Skills';
import Timer from './Managers/Timer';
import Inventory from './Managers/Inventory';
import Combat from './Managers/Combat';
import Movement from './Managers/Movement';
import Equipment from './Managers/Equipment';
import Lvl from './Managers/Level';
import Target from './Managers/Target';
import Threat from './Managers/Threat';
import Buffs from './Managers/Buffs';
import Consumables from './Managers/Consumables';


export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, 'no-texture')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setInteractive();

    const humanStartingStats = {strength: 20, agility: 20, intellect: 20, stamina: 20, spirit: 20};
    this.stat = new Stat(this, humanStartingStats);
    this.skills = new Skills(this);
    this.equipment = new Equipment(this);
    this.timer = new Timer(this);
    this.consumables = new Consumables(this);
    this.combat = new Combat(this);
    this.movement = new Movement(this, x, y);
    this.equipment = new Equipment(this);
    this.lvl = new Lvl(this, 1);
    this.target = new Target(this);
    this.threat = new Threat(this);
    this.buffs = new Buffs(this);
    this.inventory = new Inventory(this);

    //  Input Event listeners
    this.on('pointerover', function () {
    });
    this.on('pointerout', function () {
    });

    // character name
    let name = '';
    // ['dwarf', 'night-elf', 'gnome', 'human'];
    let race = 'human';
    // ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'warlock', 'warrior'];
    let characterClass = '';
    // 'horder', 'alliance', 'monster'
    let team = '';

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
    * getCharacterClass
    *
    * @returns {string} character class
    */
    this.getCharacterClass = function() {
      return characterClass;
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
    * setCharacterClass
    *
    * @param  {string} newCharacterClass
    * @returns {void}
    */
    this.setCharacterClass = function(newCharacterClass) {
      characterClass = newCharacterClass;
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
  }
}
