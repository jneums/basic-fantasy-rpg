import Character from '../Character';
import { getRandomCoordsOnCanvas } from '../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../loot/weapons';
import { getArmorByName } from '../../loot/armor';
import koboldMinerAI from './koboldMinerAI';
import MobAbilities from './MobAbilities';
import createLoot from '../../loot/createLoot';

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
    this.stat.setStrAPR(.5)

    // starting equipment
    const equipped = this.equipment.equipped();
    equipped.mainHand = getWeaponByName("Deadman Dagger");
    this.equipment.setEquipped(equipped);

    // starting hp
    const startingHp = this.stat.baseStamina() * 10;
    this.stat.setHp(startingHp);

    // starting loot
    const loot = createLoot(name);
    this.setLoot(loot);

    this.AI = koboldMinerAI();
    this.classUpdate = function() {

    }
  }
}
