import Character from './Character';
import { getWeaponByName } from '../loot/weaponAPI';
import { getArmorByName } from '../loot/armorAPI';
import NPCAI from './NPCAI';
import createLoot from '../loot/createLoot';
import Anims from './Managers/Anims';
import MobAbilities from './mobTemplates/MobAbilities';
import Quest from './Managers/Quest';
import Marker from './Managers/Marker';


/**
 *
 */
export default class Trainer extends Character {
  constructor(scene = {}, x = 0, y = 0, type, ability) {
    super(scene, x, y)
    this.ability = new MobAbilities(this);
    this.animations = new Anims(this, 'npc', 'npc-unarmed');
    this.marker = new Marker(scene, type);

    // which ability can he teach?
    this.lesson = ability;

    /*
    {
      name: 'rush',
      instructions: ["This is how you use rush:"]
    }
    */

    //set starting texture and size:
    this.setTexture('mage-run', 0).setSize(22, 22).setOrigin(0.5);
    this.healthBar.hideBar();

    this.setTeam('alliance');
    this.setName('npc');
    this.setCharacterClass('trainer');
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(20);
    this.stat.setStrAPR(.5)

    this.startingCoords = { x, y };

    // starting equipment
    const equipped = this.equipment.equipped();
    equipped.mainHand = getWeaponByName("Deadman Dagger");
    this.equipment.setEquipped(equipped);

    // starting hp
    this.stat.setBaseHp(10);
    const startingHp = (this.stat.baseStamina() * 10) + this.stat.baseHp();
    this.stat.setHp(startingHp);

    // starting loot
    const loot = createLoot(this.getName());
    this.setLoot(loot);

    this.AI = NPCAI();
    this.classUpdate = function() {
      // block in case update runs extra tick before
      this.marker.update(this.x, this.y)
    }
  }
}
