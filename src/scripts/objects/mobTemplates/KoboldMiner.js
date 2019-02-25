import Character from '../Character';
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
    this.setName('kobold-miner');
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
    const loot = createLoot(this.getName());
    this.setLoot(loot);

    this.AI = koboldMinerAI();
    this.classUpdate = function() {
      // block in case update runs extra tick before
      // switching to dead update:
      if(this.combat.isDead()) return;
      if (this.buffs.has('rend')) {
        this.anchorBlood.anims.play('blood-spray', true);
      } else {
        this.anchorBlood.setTexture();
      }
      if (this.buffs.has('thunderClap')) {
        this.anchorSnow.anims.play('snow', true);
      } else {
        this.anchorSnow.setTexture();
      }
      if (this.body.velocity.x || this.body.velocity.y) {
      } else {

      }
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
        this.body.enable = false;
        this.anchorBlood.destroy();
        this.anchorSnow.destroy();
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
