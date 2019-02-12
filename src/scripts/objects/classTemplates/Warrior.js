import Character from '../Character';
import { getRandomCoordsOnCanvas } from '../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../weapons';
import { getArmorByName } from '../../armor';
import warriorAI from '../../AI/warriorAI';

/**
 *
 */
export default class Warrior extends Character {
  constructor(scene = {}, name = 'warrior') {
    super(scene)
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('warrior');
    this.setDodgeRating(0);
    this.setAgilityToDodgeRatio(20);
    this.setAgilityToCritRatio(20);
    this.setStrengthToAttackPowerRatio(.5)

    // warriors start with bonus to strength
    const baseStrength = this.getStrength();
    const warriorStrengthBonus = 3;
    this.setStrength(baseStrength + warriorStrengthBonus);
    // and bonus to stamina
    const baseStamina = this.getStamina();
    const warriorStaminaBonus = 2;
    this.setStamina(baseStamina + warriorStaminaBonus);

    // starting equipment
    const equipped = this.getEquipped();
    equipped.mainHand = getWeaponByName("Tarnished Bastard Sword");
    equipped.chest = getArmorByName("Recruit's Vest");
    equipped.legs = getArmorByName("Recruit's Pants");
    equipped.feet = getArmorByName("Recruit's Boots");
    this.setEquipped(equipped);

    // starting hp
    const startingHp = this.getStamina() * 10;
    this.setHp(startingHp);

    // rage system
    let rage = 0;
    let onNextAttack = { name: '', value: ''};

    /**
     * getRage
     *
     * @returns {number} current amount of rage
     */
    this.getRage = function() {
      return rage;
    }

    /**
     * getOnNextAttack - applied to next swing
     *
     * @returns {object} { name: 'heroicStrike', value: 11 }
     */
    this.getOnNextAttack = function() {
      return onNextAttack;
    }

    /**
     * setRage
     *
     * @param  {number} rage value
     * @returns {void}
     */
    this.setRage = function(newRage) {
      rage = newRage;
    }

    /**
     * setOnNextAttack - only one can be set
     *
     * @param  {object} newOnNextAttack
     * @returns {void}
     */
    this.setOnNextAttack = function(newOnNextAttack) {
      onNextAttack = newOnNextAttack;
    }

    this.update = warriorAI();

  }
}
