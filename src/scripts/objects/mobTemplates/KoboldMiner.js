import Character from '../Character';
import { getRandomCoordsOnCanvas } from '../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../weapons';
import { getArmorByName } from '../../armor';
import koboldMinerAI from './koboldMinerAI';
import MobAbilities from './MobAbilities';

/**
 *
 */
export default class KoboldMiner extends Character {
  constructor(scene = {}, name = 'kobold-miner') {
    super(scene)
    this.ability = new MobAbilities(this);
    this.setTeam('mob');
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('mob');
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(20);
    this.stat.setStrengthToAttackPowerRatio(.5)

    // starting equipment
    const equipped = this.equipment.getEquipped();
    equipped.mainHand = getWeaponByName("Deadman Dagger");
    this.equipment.setEquipped(equipped);

    // starting hp
    const startingHp = this.stat.getStamina() * 10;
    this.stat.setHp(startingHp);

    this.update = koboldMinerAI();
    this.classUpdate = function() {

    }

  }
}
