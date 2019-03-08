import Character from '../../Character';
import { getWeaponByName } from '../../../loot/weapons';
import { getArmorByName } from '../../../loot/armor';
import mageAI from './mageAI';
import ManaMechanic from './Mana';
import ManaBar from '../../Managers/ManaBar';
import MageAbilities from './MageAbilities';
import KeyMap from '../../../player/KeyMap';
import Anims from '../../Managers/Anims';

/**
 *
 */
export default class Mage extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'mage') {
    super(scene, x, y);
    // mage specific abilities
    this.ability = new MageAbilities(this);
    this.keys = ['auto attack', 'wand', 'arcane intellect', 'conjure water', 'conjure food', 'arcane missiles']

    // replace with mage animations when implemented:
    this.animations = new Anims(this, 'barbarian', 'barbarian');

    //set starting texture and size:
    this.setTexture('barbarian-run', 0).setSize(12, 16);

    // config keymap for mage abilities
    this.keyMap = new KeyMap(this);
    this.keyMap.setTwo(this.ability.wand);
    this.keyMap.setThree(this.ability.arcaneIntellect);
    this.keyMap.setFour(this.ability.conjureWater);
    this.keyMap.setFive(this.ability.conjureFood);
    this.keyMap.setSix(this.ability.arcaneMissiles);
    // this.keyMap.setSeven();
    // this.keyMap.setEight();

    // set faction, default 'alliance'
    this.setTeam('alliance');

    // placement on map, sync the move target coords
    this.movement.setMoveTargetCoords([x, y]);

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
    equipped.ranged = getWeaponByName("Fire Wand");
    equipped.chest = getArmorByName("Apprentice's Robe");
    equipped.legs = getArmorByName("Apprentice's Pants");
    equipped.feet = getArmorByName("Apprentice's Boots");
    this.equipment.setEquipped(equipped);

    // starting hp
    this.stat.setBaseHp(31);
    const startingHp = (this.stat.baseStamina() * 10) + this.stat.baseHp();
    this.stat.setHp(startingHp);

    // mana system
    this.mana = new ManaMechanic(this);
    const maxMana = this.mana.maxMana();
    this.mana.setMana(maxMana);

    // new resource bar, positioned to float above the character:
    this.manaBar = new ManaBar(scene, x - 8, y - 16);

    // ai system
    this.AI = mageAI();

    // class specific updates
    this.classUpdate = function() {
      // when out of combat or if havenet casted
      // in 5 seconds, start mana and hp regen
    }
  }
}
