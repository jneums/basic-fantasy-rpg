import Character from '../../Character';
import { getWeaponByName } from '../../../loot/weaponAPI';
import { getArmorByName } from '../../../loot/armorAPI';
import mageAI from './mageAI';
import ManaMechanic from '../Mana';
import ResourceBar from '../../Managers/ResourceBar';
import MageAbilities from './MageAbilities';
import KeyMap from '../../../player/KeyMap';
import Anims from '../../Managers/Anims';
import QuestLog from '../../Managers/QuestLog';

/**
 *
 */
export default class Mage extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'mage') {
    super(scene, x, y);
    // mage specific abilities
    this.ability = new MageAbilities(this);
    this.questLog = new QuestLog(this);



        //set starting texture and size:
        this.setTexture('mage-run', 0).setSize(22, 22).setOrigin(0.5);

    // coordinate which animations to play:
    this.animations = new Anims(this, 'mage', 'mage-sword');

    // config keymap for mage abilities
    this.keyMap = new KeyMap(this);
    this.keyMap.setOne({ ability: this.ability.wand, icon: 'wand' });
    this.keyMap.setTwo({ ability: this.ability.polymorph, icon: 'poly' });
    this.keyMap.setThree({ ability: this.ability.arcaneIntellect, icon: 'intellect' });
    this.keyMap.setFour({ ability: this.ability.arcaneMissiles, icon: 'missiles' });
    this.keyMap.setFive({ ability: this.ability.frostbolt, icon: 'frostbolt' });
    this.keyMap.setSix({ ability: this.ability.fireBlast, icon: null });

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
    equipped.ranged = getWeaponByName("Frost Wand");
    equipped.chest = getArmorByName("Apprentice's Robe");
    equipped.legs = getArmorByName("Apprentice's Pants");
    equipped.feet = getArmorByName("Apprentice's Boots");
    this.equipment.setEquipped(equipped);

    // starting hp
    this.stat.setBaseHp(31);
    this.stat.setHp(this.stat.maxHp());


    // mana system
    this.mana = new ManaMechanic(this);

    // new resource bar, positioned to float above the character:
    this.mana.setMana(this.mana.maxMana());
    this.manaBar = new ResourceBar(scene, 'mana', this.mana.mana());

    // ai system
    this.AI = mageAI();

    // class specific updates
    this.classUpdate = function() {
      // when out of combat or if havenet casted
      // in 5 seconds, start mana and hp regen
    }
  }
}
