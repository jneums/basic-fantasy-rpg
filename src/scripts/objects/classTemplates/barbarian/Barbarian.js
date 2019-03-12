import Character from '../../Character';
import { getWeaponByName } from '../../../loot/weapons';
import { getArmorByName } from '../../../loot/armor';
import barbarianAI from './barbarianAI';
import RageMechanic from '../Rage';
import ResourceBar from '../../Managers/ResourceBar';
import BarbarianAbilities from './BarbarianAbilities';
import KeyMap from '../../../player/KeyMap';
import Anims from '../../Managers/Anims';

/**
 *
 */
export default class Barbarian extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'barbarian') {
    super(scene, x, y)
    // barbarian specific abilities
    this.ability = new BarbarianAbilities(this);

    // coordinate which animations to play:
    this.animations = new Anims(this, 'barbarian', 'barbarian');

        //set starting texture and size:
        this.setTexture('mage-run', 0).setSize(12, 12);

    // config keymap for barbarian abilities
    // enable sending config object as second arg to keymap?
    this.keyMap = new KeyMap(this);
    this.keyMap.setTwo(this.ability.rush);
    this.keyMap.setThree(this.ability.gore);
    this.keyMap.setFour(this.ability.savageBlow);
    this.keyMap.setFive(this.ability.battleCry);
    this.keyMap.setSix(this.ability.intimidate);
    this.keyMap.setSeven(this.ability.hobble);
    this.keyMap.setEight('');

    // faction, default 'alliance'
    this.setTeam('alliance');

    // placement on the map
    this.movement.setMoveTargetCoords([x, y]);

    // name and class specific stats
    this.setName(name);
    this.setCharacterClass('barbarian');
    this.stat.setCrit(.05);
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(20);
    this.stat.setStrAPR(.5)

    // barbarians start with bonus to strength:
    const baseStrength = this.stat.baseStrength();
    const barbarianStrengthBonus = 3;
    this.stat.setStrength(baseStrength + barbarianStrengthBonus);

    // and bonus to stamina:
    const baseStamina = this.stat.baseStamina();
    const barbarianStaminaBonus = 2;
    this.stat.setStamina(baseStamina + barbarianStaminaBonus);

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

    // new resource bar, positioned to float above the character:
    this.rageBar = new ResourceBar(scene, 'rage', 100);

    // ai system
    this.AI = barbarianAI();

    // class specific updates e.g. rage, mana, energy
    this.classUpdate = function() {
      // after 5 seconds start regen hp according to spirit
      if(!this.combat.isInCombat()) this.rage.rageDecay();
    };

  }
}
