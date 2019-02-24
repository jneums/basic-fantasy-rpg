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
  constructor(scene = {}, x = 0, y = 0) {
    super(scene, x, y)
    this.ability = new MobAbilities(this);
    this.setTeam('mob');
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
      if (this.stat.hp() > this.stat.maxHp() * .75) {
        this.setTexture('kobold', 0);
      } else if (this.stat.hp() > this.stat.maxHp() * .50) {
        this.setTexture('kobold', 1);
      } else if (this.stat.hp() > this.stat.maxHp() * .25) {
        this.setTexture('kobold', 2);
      } else if (this.stat.hp() >= 1) {
        this.setTexture('kobold', 3);
      }
    }

    this.die = function() {
      {
        const x = this.x + 2;
        const y = this.y + 4;
        this.setTexture('kobold', 4);
        const sign = (this.flipX) ? -1 : 1;
        scene.tweens.add({
          targets: this,
          x,
          y,
          scaleX: 1,
          scaleY: 1,
          angle: 90 * sign,
          _ease: 'Sine.easeInOut',
          ease: 'Power2',
          duration: 500,
          repeat: 0,
          yoyo: false,
          hold: 300,
        });
      }
    }
  }
}
