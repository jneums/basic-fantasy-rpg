export default class Skills {
  constructor(character) {
    let skills = {
      dagger: -1,
      fistWeapon: -1,
      oneHandedAxe: -1,
      oneHandedMace: -1,
      oneHandedSword: -1,
      polearm: -1,
      staff: -1,
      twoHandedAxe: -1,
      twoHandedMace: -1,
      twoHandSword: -1,
      bow: -1,
      crossbow: -1,
      gun: -1,
      thrown: -1,
      wands: -1,
      unarmed: 0,

      cloth: 0,
      leather: -1,
      mail: -1,
      plate: -1,
      shield: -1
    }

    this.canUse = function(type) {
      if (skills[type] > -1) return true;
      else return false;
    }

    /**
     * getWeaponSkills
     *
     * @returns {object}
     */
    this.getWeaponSkills = function() {
      return skills;
    }

    this.learnSkill = function(type) {
      skills[type] = 0;
    }

    this.levelUpSkill = function(skill) {
      skills[skill]++
    }

    /**
     * setWeaponSkills - replace entire object
     *
     * @param  {object} newWeaponSkills
     * @returns {void}
     */
    this.setWeaponSkills = function(newWeaponSkills) {
      skills = newWeaponSkills;
    }
  }
}
