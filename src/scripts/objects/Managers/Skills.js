export default class Skills {
  constructor(character) {
    let weaponSkills = {
      dagger: 5,
      fistWeapon: 5,
      oneHandedAxe: 5,
      oneHandedMace: 5,
      oneHandedSword: 5,
      polearm: 5,
      staff: 5,
      twoHandedAxe: 5,
      twoHandedMace: 5,
      twoHandedSword: 5,
      bow: 5,
      crossbow: 5,
      gun: 5,
      thrown: 5,
      wands: 5,
      unarmed: 5
    }

    let armorSkills = {
      cloth: 0,
      leather: 0,
      mail: 0,
      plate: 0,
      shield: 0
    }

    /**
     * getWeaponSkills
     *
     * @returns {object}
     */
    this.getWeaponSkills = function() {
      return weaponSkills;
    }

    /**
     * setWeaponSkills - replace entire object
     *
     * @param  {object} newWeaponSkills
     * @returns {void}
     */
    this.setWeaponSkills = function(newWeaponSkills) {
      weaponSkills = newWeaponSkills;
    }
  }
}
