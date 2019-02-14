import Character from '../../Character';
import { getRandomCoordsOnCanvas } from '../../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../../weapons';
import { getArmorByName } from '../../../armor';
import warriorAI from '../../../AI/warriorAI';
import RageMechanic from './Rage';
import WarriorAbilities from './WarriorAbilities';
import KeyMap from '../../../player/KeyMap';

/**
 *
 */
export default class Warrior extends Character {
  constructor(scene = {}, name = 'warrior') {
    super(scene)
    this.ability = new WarriorAbilities(this);
    this.keyMap = new KeyMap(this);

    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.movement.setMoveTargetCoords(this.coords)
    this.setName(name);
    this.setCharacterClass('warrior');
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(20);
    this.stat.setStrengthToAttackPowerRatio(.5)

    // warriors start with bonus to strength:
    const baseStrength = this.stat.getStrength();
    const warriorStrengthBonus = 3;
    this.stat.setStrength(baseStrength + warriorStrengthBonus);
    // and bonus to stamina:
    const baseStamina = this.stat.getStamina();
    const warriorStaminaBonus = 2;
    this.stat.setStamina(baseStamina + warriorStaminaBonus);

    // starting equipment
    const equipped = this.equipment.getEquipped();
    equipped.mainHand = getWeaponByName("Tarnished Bastard Sword");
    equipped.chest = getArmorByName("Recruit's Vest");
    equipped.legs = getArmorByName("Recruit's Pants");
    equipped.feet = getArmorByName("Recruit's Boots");
    this.equipment.setEquipped(equipped);

    // starting hp
    const startingHp = this.stat.getStamina() * 10;
    this.stat.setHp(startingHp);

    // rage system
    this.rage = new RageMechanic(this);


    this.update = warriorAI();
    this.classUpdate = function() {
      // class specific update:
      // warrior:
      this.timer.updateSwingTimers();
      // if in combat:
      if(this.combat.isInCombat()) {

      } else {
        this.rage.rageDecay()
      }
    };
  }
}
