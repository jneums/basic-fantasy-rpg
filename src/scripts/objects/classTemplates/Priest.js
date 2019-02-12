import Character from '../Character';
import { getRandomCoordsOnCanvas } from '../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../weapons';
import { getArmorByName } from '../../armor';
import priestAI from '../../AI/priestAI';

/**
 *
 */
export default class Priest extends Character {
  constructor(scene = {}, name = 'priest') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('priest');
    this.setDodgeRating(.03);
    this.setAgilityToDodgeRatio(20);

    // prists start with a bonus to intellect:
    const baseIntellect = this.getIntellect();
    const priestIntellectBonus = 2;
    this.setIntellect(baseIntellect + priestIntellectBonus);
    // and spirit:
    const baseSpirit = this.getSpirit();
    const priestSpiritBonus = 3;
    this.setSpirit(baseSpirit + priestSpiritBonus);

    // starting equipment
    const equipped = this.getEquipped();
    equipped.mainHand = getWeaponByName("Crooked Staff");
    equipped.chest = getArmorByName("Apprentice's Robe");
    equipped.legs = getArmorByName("Apprentice's Pants");
    equipped.feet = getArmorByName("Apprentice's Boots");
    this.setEquipped(equipped);

    // starting hp
    const startingHp = this.getStamina() * 10;
    this.setHp(startingHp);

    this.update = priestAI();
  }
}
