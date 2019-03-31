import Character from '../../Character';
import { getWeaponByName } from '../../../loot/weaponAPI';
import { getArmorByName } from '../../../loot/armorAPI';
import barbarianAI from './barbarianAI';
import RageMechanic from '../Rage';
import ResourceBar from '../../Managers/ResourceBar';
import BarbarianAbilities from './BarbarianAbilities';
import KeyMap from '../../../player/KeyMap';
import Anims from '../../Managers/Anims';
import QuestLog from '../../Managers/QuestLog';

/**
 *
 */
export default class Barbarian extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'barbarian') {
    super(scene, x, y)
    // barbarian specific abilities
    this.ability = new BarbarianAbilities(this);
    this.questLog = new QuestLog(this);

    // coordinate which animations to play:
    this.animations = new Anims(this, 'barbarian', 'barbarian-sword');

        //set starting texture and size:
        this.setTexture('mage-run', 0).setSize(12, 12);

    // config keymap for barbarian abilities
    // enable sending config object as second arg to keymap?
    this.keyMap = new KeyMap(this);
    this.keyMap.setOne({ ability: this.ability.rush, icon: 'rush' });
    this.keyMap.setTwo({ ability: this.ability.hobble, icon: 'hobble' });
    this.keyMap.setThree({ ability: this.ability.gore, icon: 'gore' });
    this.keyMap.setFour({ ability: this.ability.savageBlow, icon: 'savage-blow' });
    this.keyMap.setFive({ ability: this.ability.battleCry, icon: 'shout' });
    this.keyMap.setSix({ ability: this.ability.intimidate, icon: 'intimidate' });
    this.keyMap.setSeven({ ability: this.consumables.drink, icon: 'ruby'});

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
    this.stat.setPrimary(['strength', 'stamina']);
    this.stat.setSecondary(['spirit', 'agility', 'intellect'])

    // and bonus to stamina:
    const baseStamina = this.stat.baseStamina();
    const barbarianStaminaBonus = 2;
    this.stat.setStamina(baseStamina + barbarianStaminaBonus);

    // starting skills:
    this.skills.learnSkill('twoHandSword');
    this.skills.learnSkill('mail');

    this.equipment.equip(getWeaponByName("Tarnished Sword"));
    this.equipment.equip(getArmorByName("Recruit's Vest"));
    this.equipment.equip(getArmorByName("Recruit's Pants"));
    this.equipment.equip(getArmorByName("Recruit's Boots"));

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
