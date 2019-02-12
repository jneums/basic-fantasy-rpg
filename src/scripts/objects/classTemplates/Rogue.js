import Character from '../Character';
import { getRandomCoordsOnCanvas } from '../../randomNumberUtilities';
import { getWeaponByName } from '../../weapons';
import { getArmorByName } from '../../armor';
import rogueAI from '../../AI/rogueAI';

/**
 *
 */
export default class Rogue extends Character {
  constructor(scene = {}, name = 'rogue') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('rogue');
    this.setDodgeRating(0);
    this.setAgilityToDodgeRatio(14);
    this.setAgilityToCritRatio(29);
    this.setStrengthToAttackPowerRatio(1);
    this.setAgilityToAttackPowerRatio(1);

    // rogues start with bonus to strength:
    const baseStrength = this.getStrength();
    const rogueStrengthBonus = 1;
    this.setStrength(baseStrength + rogueStrengthBonus);
    // and agility:
    const baseAgility = this.getAgility();
    const rogueAgilityBonus = 3;
    this.setAgility(baseAgility + rogueAgilityBonus);
    // and stamina:
    const baseStamina = this.getStamina();
    const rogueStaminaBonus = 1;
    this.setStamina(baseStamina + rogueStaminaBonus);

    // starting equipment
    const equipped = this.getEquipped();
    equipped.mainHand = getWeaponByName("Deadman Dagger");
    equipped.chest = getArmorByName("Footpad's Vest");
    equipped.legs = getArmorByName("Footpad's Pants");
    equipped.feet = getArmorByName("Footpad's Shoes");
    this.setEquipped(equipped);

    // starting hp
    const startingHp = this.getStamina() * 10;
    this.setHp(startingHp);

    this.update = rogueAI();
  }
}
