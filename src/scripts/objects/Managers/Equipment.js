
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

    let _active = '';


    this.getActiveSlot = function() {
      return _active;
    }

    this.getActive = function() {
      return equipped[_active];
    }

    this.setActive = function(active) {
      _active = active;
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
      if (!gear.hasOwnProperty('skillType')) return;

      if (!character.skills.canUse(gear.skillType())) return;
      // add to specific slot
      const slot = gear.slot();
      const replacedGear = equipped[slot];
      equipped[slot] = gear;
      // if it replaced a piece, put that piece in inventory
      if (!replacedGear.hasOwnProperty('getName')) return;
      if (replacedGear.getName()) {
        character.inventory.add(replacedGear);
      }
    }

    this.unequipActive = function() {
      if (!equipped[_active]) return;
      if (character.inventory.isFull()) return;
      character.inventory.add(equipped[_active]);
      equipped[_active] = {};
      _active = '';

      if (character.stat.maxHp() < character.stat.hp()) {
        character.stat.setHp(character.stat.maxHp())
      }
    }

    /**
     * isDualWielding - checks to see if currently dual wielding
     *
     * @returns {type}  description
     */
    this.isDualWielding = function() {
      if (!this.equipped().offhand) return false;
      if (!character.ability.getAbilities().includes('dual-wield')) return false;
      return false;
    }

    /**
     * getCurrentWeaponSkill
     *
     * @param  {string} hand to check
     * @returns {number} weapon skill
     */
    this.getCurrentWeaponSkill = function(hand = '') {
      let weaponType = '';

      if (hand === 'main') {
        if (!this.equipped().mainHand.hasOwnProperty('skillType')) return;
        weaponType = this.equipped().mainHand.skillType();

      } else if (hand === 'off') {
        if (!this.equipped().offHand.hasOwnProperty('skillType')) return;
        weaponType = this.equipped().offHand.skillType();
      }

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

      if (hand === 'main') {
        if (!this.equipped().mainHand.hasOwnProperty('dmg')) return { min: 1, max: 2 };
        return this.equipped().mainHand.dmg();

      } else if (hand === 'off') {
        if (!this.equipped().offHand.hasOwnProperty('dmg')) return { min: 1, max: 2 };
        return this.equipped().offHand.dmg();

      }

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
        if (!equipped.mainHand.hasOwnProperty('spd')) return;
        return equipped.mainHand.spd();
        case 'off':
        if (!equipped.offHand.hasOwnProperty('spd')) return;
        return equipped.offHand.spd();
        case 'ranged':
        if (!equipped.ranged.hasOwnProperty('spd')) return;
        return equipped.ranged.spd();
      }
    }

    /**
     * checkForTwoHandWeapon
     *
     * @returns {bool} true if using 2h
     */
    this.checkForTwoHandWeapon = function() {
      const weaponType = this.equipped().mainHand.skillType().substr(0,9);
      return weaponSlot === 'twoHanded';
    }

    this.equippedAC = function() {
      let total = 0;
      for (let item in equipped) {
        if (equipped[item].hasOwnProperty('armor')) {
          total += equipped[item].armor();
        }
      }
      return total;
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
        if (equipped[item].hasOwnProperty('statBonus')) {
          if (equipped[item].statBonus().main.stat === stat) {
            total += equipped[item].statBonus().main.val;
          } else if (equipped[item].statBonus().secondary.stat === stat) {
            total += equipped[item].statBonus().secondary.val;
          }
        };

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
