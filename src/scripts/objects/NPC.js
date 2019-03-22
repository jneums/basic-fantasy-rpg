import Character from './Character';
import { getWeaponByName } from '../loot/weapons';
import { getArmorByName } from '../loot/armor';
import NPCAI from './NPCAI';
import createLoot from '../loot/createLoot';
import Anims from './Managers/Anims';
import MobAbilities from './mobTemplates/MobAbilities';
import Quest from './Managers/Quest';


/**
 *
 */
export default class NPC extends Character {
  constructor(scene = {}, x = 0, y = 0) {
    super(scene, x, y)
    this.ability = new MobAbilities(this);
    this.animations = new Anims(this, 'npc', 'npc-unarmed');

    this.quest = { id: 1 }


    //set starting texture and size:
    this.setTexture('mage-run', 0).setSize(12, 12);
    this.healthBar.hideBar();

    this.setTeam('alliance');
    this.setName('npc');
    this.setCharacterClass('npc');
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
    }
  }
}
