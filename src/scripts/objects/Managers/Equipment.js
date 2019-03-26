
/**
 * Equipment Manager - Tracks and updates equipment
 * currently being worn by the character.
 * Also interacts heavily with Stats Manager to provide
 * relevant stat augmentation caused by equipped items.
 *
 *
 * work on having object placeholders, if they are not used the
 * methods for reducing equipped into stat bonus's will fail.
 *
 */
export default class Equipment {
  constructor(character) {
    // currently being used by the character:
    let equipped = {
      mainHand: {},
      offHand: {},
      ranged: {},
      head: {},
      chest: {},
      legs: {},
      ring: {},
      feet: {},
    }

    /**
     * equip - take an item from character inventory
     * and put it into slot indicated on item's object.
     *
     *
     * @param  {object} gear
     * @returns {void}
     */
    this.equip = function(gear = {}) {
      // add to specific slot
      const slot = gear.slot;
      const replacedGear = equipped[slot];
      equipped[slot] = gear;
      // if it replaced a piece, put that piece in inventory
      if (replacedGear.name) {
        character.inventory.add(replacedGear);
      }
    }

    /**
     * isDualWielding - checks to see if currently dual wielding
     *
     * @returns {type}  description
     */
    this.isDualWielding = function() {
      const hasDualWield = character.ability.getAbilities().includes('dual-wield');
      const hasWeaponInOffhand = this.equipped().offHand.damage;
      if (hasDualWield && hasWeaponInOffhand) return true;
      else return false;
    }

    /**
     * getCurrentWeaponSkill
     *
     * @param  {string} hand to check
     * @returns {number} weapon skill
     */
    this.getCurrentWeaponSkill = function(hand = '') {
      const mainHandType = this.equipped().mainHand.type;
      const offHandType = this.equipped().offHand.type;
      const weaponType = (hand === 'main')
        ? mainHandType
        : offHandType;
      return character.skills.getWeaponSkills()[weaponType];
    }

    /**
     * getWeaponDmg - amount used in determining dmg
     * update with correct weapon values
     *
     * @param  {string} hand attacking with
     * @returns {object} dmg object: { min: 1, max: 2 }
     */
    this.getWeaponDmg = function(hand = '') {
      const mainHandWpnDmg = this.equipped().mainHand.damage;
      const offHandWpnDmg= this.equipped().offHand.damage;
      const weaponDamage = (hand === 'main')
        ? mainHandWpnDmg
        : offHandWpnDmg;
      return weaponDamage;
    }

    /**
     * getWeaponSpeed
     *
     * @param  {string} hand weapon is in
     * @returns {number}
     */
    this.getWeaponSpeed = function(hand = '') {
      switch(hand) {
        case 'main':
        return equipped.mainHand.speed;
        case 'off':
        return equipped.offHand.speed;
        case 'ranged':
        return equipped.ranged.speed;
      }
    }

    /**
     * checkForTwoHandWeapon
     *
     * @returns {bool} true if using 2h
     */
    this.checkForTwoHandWeapon = function() {
      const weaponSlot = this.equipped().mainHand.slot;
      return weaponSlot === 'two-hand';
    }

    /**
     * statBonus - equipped
     *
     * @param  {Character} character
     * @param  {string} stat e.g. 'armor', 'stamina', etc...
     * @returns {number} total of stat equipped
     */
    this.statBonus = function(stat = '') {
      let total = 0;
      const equipped = this.equipped();
      for (let item in equipped) {
        if (equipped[item][stat]) {
          total += equipped[item][stat];
        }
      }
      return total;
    }

    /**
     * equipped
     *
     * @returns {object}
     */
    this.equipped = function() {
      return equipped;
    }

    /**
     * setEquipped
     *
     * @param  {object} equipped
     * @returns {void}
     */
    this.setEquipped = function(newEquipped) {
      equipped = newEquipped;
    }

  }
}
