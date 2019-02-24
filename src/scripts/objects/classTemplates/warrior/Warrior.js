import Character from '../../Character';
import { getRandomCoordsOnCanvas } from '../../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../../loot/weapons';
import { getArmorByName } from '../../../loot/armor';
import warriorAI from '../../../AI/warriorAI';
import RageMechanic from './Rage';
import RageBar from '../../Managers/RageBar';
import WarriorAbilities from './WarriorAbilities';
import KeyMap from '../../../player/KeyMap';

/**
 *
 */
export default class Warrior extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'warrior') {
    super(scene, x, y)
    // warrior specific abilities
    this.playerWeapon = scene.add.sprite(x, y, 'sword-walk');
    this.ability = new WarriorAbilities(this);
    this.keys = ['auto attack', 'charge', 'rend', 'heroic strike', 'battle shout', 'thunder clap', 'hamstring']

    // config keymap for warrior abilities
    this.keyMap = new KeyMap(this);
    this.keyMap.setTwo(this.ability.charge);
    this.keyMap.setThree(this.ability.rend);
    this.keyMap.setFour(this.ability.heroicStrike);
    this.keyMap.setFive(this.ability.battleShout);
    this.keyMap.setSix(this.ability.thunderClap);
    this.keyMap.setSeven(this.ability.hamstring);
    this.keyMap.setEight('');

    // faction
    this.setTeam('alliance');

    // placement on the map
    this.movement.setMoveTargetCoords([x, y]);

    // name and class specific stats
    this.setName(name);
    this.setCharacterClass('warrior');
    this.stat.setCrit(.05);
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(20);
    this.stat.setStrAPR(.5)

    // warriors start with bonus to strength:
    const baseStrength = this.stat.baseStrength();
    const warriorStrengthBonus = 3;
    this.stat.setStrength(baseStrength + warriorStrengthBonus);

    // and bonus to stamina:
    const baseStamina = this.stat.baseStamina();
    const warriorStaminaBonus = 2;
    this.stat.setStamina(baseStamina + warriorStaminaBonus);

    // starting equipment
    const equipped = this.equipment.equipped();
    equipped.mainHand = getWeaponByName("Tarnished Bastard Sword");
    equipped.chest = getArmorByName("Recruit's Vest");
    equipped.legs = getArmorByName("Recruit's Pants");
    equipped.feet = getArmorByName("Recruit's Boots");
    this.equipment.setEquipped(equipped);

    // starting hp
    this.stat.setBaseHp(20);
    const startingHp = (this.stat.baseStamina() * 10) + this.stat.baseHp();
    this.stat.setHp(startingHp);

    // rage system
    this.rage = new RageMechanic(this);
    this.rageBar = new RageBar(scene, x - 8, y - 12);

    // ai system
    this.AI = warriorAI();

    // class specific updates e.g. rage, mana, energy
    this.classUpdate = function() {

      // after 5 seconds start regen hp according to spirit
      if(!this.combat.inCombat()) this.rage.rageDecay();
    };
  }
}
