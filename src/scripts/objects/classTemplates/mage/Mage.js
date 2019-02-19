import Character from '../../Character';
import { getRandomCoordsOnCanvas } from '../../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../../loot/weapons';
import { getArmorByName } from '../../../loot/armor';
import mageAI from '../../../AI/mageAI';
import ManaMechanic from './Mana';
import MageAbilities from './MageAbilities';
import KeyMap from '../../../player/KeyMap';

/**
 *
 */
export default class Mage extends Character {
  constructor(scene = {}, name = 'mage') {
    super(scene);
    // mage specific abilities
    this.ability = new MageAbilities(this);
    this.keys = ['auto attack', 'wand', 'arcane intellect', 'conjure water', 'conjure food', 'arcane missiles']
    // config keymap for mage abilities
    this.keyMap = new KeyMap(this);
    this.keyMap.setTwo(this.ability.shoot);
    this.keyMap.setThree(this.ability.arcaneIntellect);
    this.keyMap.setFour(this.ability.conjureWater);
    this.keyMap.setFive(this.ability.conjureFood);
    this.keyMap.setSix(this.ability.arcaneMissiles);
    // this.keyMap.setSeven();
    // this.keyMap.setEight();

    // set faction
    this.setTeam(name);

    // placement on map
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.movement.setMoveTargetCoords(this.coords);

    // name and class specific stats
    this.setName(name);
    this.setCharacterClass('mage');
    this.stat.setCrit(.05);
    this.stat.setDodgeRating(.032);
    this.stat.setAgilityToDodgeRatio(19.444);

    // mages start with bonus to intellect:
    const baseIntellect = this.stat.baseIntellect();
    const mageIntellectBonus = 3;
    this.stat.setIntellect(baseIntellect + mageIntellectBonus);

    // and spirit:
    const baseSpirit = this.stat.baseSpirit();
    const mageSpiritBonus = 2;
    this.stat.setSpirit(baseSpirit + mageSpiritBonus);

    // starting equipment
    const equipped = this.equipment.equipped();
    equipped.mainHand = getWeaponByName("Crooked Staff");
    equipped.chest = getArmorByName("Apprentice's Robe");
    equipped.legs = getArmorByName("Apprentice's Pants");
    equipped.feet = getArmorByName("Apprentice's Boots");
    this.equipment.setEquipped(equipped);

    // starting hp
    const mageBaseHp = 31;
    this.stat.setBaseHp(mageBaseHp);
    const startingHp = this.stat.baseStamina() * 10;
    this.stat.setHp(startingHp + mageBaseHp);

    // mana system
    this.mana = new ManaMechanic(this);
    const maxMana = this.mana.maxMana();
    this.mana.setMana(maxMana);

    // ai system
    this.AI = mageAI();

    // class specific updates
    this.classUpdate = function() {
      // when out of combat or if havenet casted
      // in 5 seconds, start mana and hp regen
    }
  }
}
