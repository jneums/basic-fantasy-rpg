export default class Stat {
  constructor(character = {}, {strength, agility, intellect, stamina, spirit}) {
    let hp = 0;
    let attackPower = 0;
    let criticalChance = 0;
    let hitChance = 0;
    let spellPower = 0;
    let healingPower = 0;
    let spellCriticalChance = 0;
    let spellHitChance = 0;
    let manaPer5 = 0;
    let defenseRating = 5;
    let armorRating = 0;
    let blockRating = 0;
    let blockValue = 0;
    let dodgeRating = 0;
    let parryRating = 0;

    // combat stats
    // these are set from constructor when
    // classs is chosen
    let agilityToDodgeRatio = 0;
    let agilityToCritRatio = 0;
    let strengthToAttackPowerRatio = 0;
    let agilityToAttackPowerRatio = 0;


    this.getStatFromTalents = function() {
      return 0;
    }

    this.getStatFromRace = function() {
      return 0;
    }

    /**
     * getAPFromStr - combat helper
     *
     * @param  {Character} character attacker
     * @returns {number} class specific
     */
    this.getAPFromStr = function() {
      const strength = this.getStrength();
      // add str bonus from talents, items, buffs
      const strFromEquipped = character.equipment.statBonus('strength');
      const totalStr = strength + strFromEquipped;
      const strToAPR
        = this.getStrengthToAttackPowerRatio();
      const apFromStr = (strToAPR) ? totalStr / strToAPR : 0;
      return apFromStr;
    }

    /**
     * getAPFromAgi - combat helper
     *
     * @returns {number} class specific
     */
    this.getAPFromAgi = function() {
      const totalAgi = character.stat.getTotalAgility();
      const agiToAPR
        = this.getAgilityToAttackPowerRatio();
      const apFromAgi = (agiToAPR) ? totalAgi / agiToAPR : 0;
      return apFromAgi;
    }

    /**
     * getAttackPowerBonus
     *
     * @param  {string} hand for weaponSpeed
     * @returns {number} bonus damage
     */
    this.getAttackPowerBonus = function(hand = '') {
      // base stats
      const apFromStr = this.getAPFromStr();
      const apFromAgi = this.getAPFromAgi();
      const apFromBuffs = character.buffs.statBonus('attackPower');
      const apFromEquipped = character.equipment.statBonus('attackPower');
      // add ap bonus from buffs, equipped, talents
      const attackPower =  apFromStr + apFromAgi + apFromBuffs + apFromEquipped;
      // 14ap / 1dps
      const dpsIncrease = attackPower / 14;
      const attackPowerBonus = character.equipment.getWeaponSpeed(hand) * dpsIncrease;
      return attackPowerBonus;
    }

    /**
     * armorMitigationPercent
     *
     * @param  {Character} target
     * @returns {number} % mitigated
     */
    this.armorMitigationPercent = function(target = {}) {
      // get base armor, armor from items, talents etc.
      const totalArmor = target.stat.totalArmor();
      const attackerLevel = character.lvl.getLevel();
      const dmgMitigated = totalArmor / (totalArmor + 400 + 85 * attackerLevel);
      return dmgMitigated;
    }

    /**
     * totalArmor - from buffs, agi, and items
     *
     * @returns {number}
     */
    this.totalArmor = function() {
      const armorFromBuffs = character.buffs.statBonus('armor');
      // everyone gets 2 armor per agi
      const armorFromAgility = character.stat.getTotalAgility() * 2;
      const armorFromItems = character.equipment.statBonus('armor');
      return armorFromBuffs + armorFromAgility + armorFromItems;
    }

    /**
     * getHp
     *
     * @returns {number}  characters health points
     */
    this.getHp = function() {
      return hp;
    }

    /**
     * getStrength
     *
     * @returns {number} character strength
     */
    this.getStrength = function() {
      return strength;
    }

    /**
     * getTotalAgility - base, gear, and buffs
     *
     * @returns {number} total agility
     */
    this.getTotalAgility = function() {
      const baseAgility = agility;
      const gearAgility = character.equipment.statBonus('agility');
      const buffAgility = character.buffs.statBonus('agility');
      return baseAgility + gearAgility + buffAgility;
    }

    /**
     * getAgility - base agility
     *
     * @returns {type}  description
     */
    this.getAgility = function() {
      return agility;
    }
    /**
    * getIntellect
    *
    * @returns {number}  character intellect
    */
    this.getIntellect = function() {
      return intellect;
    }

    /**
     * getStamina
     *
     * @returns {number}  character stamina
     */
    this.getStamina = function() {
      return stamina;
    }

    /**
     * getSpirit
     *
     * @returns {number}  character spirit
     */
    this.getSpirit = function() {
      return spirit;
    }

    /**
    * getArmorPenetration
    *
    * @returns {number} armor penetration
    */
    this.getArmorPenetration = function() {
      return armorPenetration;
    }

    /**
    * getAttackSpeed
    *
    * @returns {number}  attack speed
    */
    this.getAttackSpeed = function() {
      return attackSpeed;
    }


    /**
     * getAttackPower
     *
     * @returns {number}
     */
    this.getAttackPower = function() {
      return attackPower;
    }


    /**
     * getCriticalChance
     *
     * @returns {number}
     */
    this.getCriticalChance = function() {
      return criticalChance;
    }


    /**
     * getHitChance
     *
     * @returns {number}
     */
    this.getHitChance = function() {
      return hitChance;
    }
    /**
     * getSpellPower
     *
     * @returns {number}
     */
    this.getSpellPower = function() {
      return spellPower;
    }


    /**
     * getHealingPower
     *
     * @returns {number}
     */
    this.getHealingPower = function() {
      return healingPower;
    }


    /**
     * getSpellCriticalChance
     *
     * @returns {number}
     */
    this.getSpellCriticalChance = function() {
      return spellCriticalChance;
    }


    /**
     * getSpellHitChance
     *
     * @returns {number}
     */
    this.getSpellHitChance = function() {
      return spellHitChance;
    }


    /**
     * getManaPer5
     *
     * @returns {number}
     */
    this.getManaPer5 = function() {
      return manaPer5;
    }


    /**
     * getSpellPenetration
     *
     * @returns {number}
     */
    this.getSpellPenetration = function() {
      return spellPenetration;
    }

    /**
     * getDefenseRating
     *
     * @returns {number}
     */
    this.getDefenseRating = function() {
      return defenseRating;
    }

    /**
    * getArmorRating
    *
    * @returns {number}  characters armor class
    */
    this.getArmorRating = function() {
      return armorRating;
    }

    /**
     * getBlockRating
     *
     * @returns {number}
     */
    this.getBlockRating = function() {
      return blockRating;
    }

    /**
     * getBlockValue
     *
     * @returns {number}
     */
    this.getBlockValue = function() {
      return blockValue;
    }

    /**
     * getDodgeRating
     *
     * @returns {number}
     */
    this.getDodgeRating = function() {
      const baseDodge = dodgeRating;
      const totalAgi = character.stat.getTotalAgility();
      const agilityToDodgeRatio = this.getAgilityToDodgeRatio();
      const targetDodgeFromAgi = (totalAgi / agilityToDodgeRatio) * .01
      const targetRaceBonus = this.getStatFromRace();
      const targetTalentDodgeBonus = this.getStatFromTalents();

      return baseDodge + targetDodgeFromAgi + targetRaceBonus + targetTalentDodgeBonus;
    }

    /**
     * getParryRating
     *
     * @returns {number}
     */
    this.getParryRating = function() {
      return parryRating;
    }

    /**
     * getAgilityToDodgeRatio
     *
     * @returns {number}
     */
    this.getAgilityToDodgeRatio = function() {
      return agilityToDodgeRatio;
    }

    /**
     * getAgilityToCritRatio
     *
     * @returns {number}
     */
    this.getAgilityToCritRatio = function() {
      return agilityToCritRatio;
    }

    /**
     * getStrengthToAttackPowerRatio
     *
     * @returns {number}
     */
    this.getStrengthToAttackPowerRatio = function() {
      return strengthToAttackPowerRatio;
    }

    /**
     * getAgilityToAttackPowerRatio
     *
     * @returns {number}
     */
    this.getAgilityToAttackPowerRatio = function() {
      return agilityToAttackPowerRatio;
    }

    /**
     * getResistances
     *
     * @returns {object} { shadow: 0, arcane: 1, etc. }
     */
    this.getResistances = function() {
      return resistances;
    }

    /**
     * setHp - hit points
     *
     * @param  {number} newHp
     * @returns {void}
     */
    this.setHp = function(newHp) {
      hp = newHp;
    }

    /**
     * setStrength
     *
     * @param  {number} newStrength
     * @returns {void}
     */
    this.setStrength = function(newStrength) {
      strength = newStrength;
    }

    /**
     * setAgility
     *
     * @param  {number} newAgility
     * @returns {void}
     */
    this.setAgility = function(newAgility) {
      agility = newAgility;
    }

    /**
    * setIntellect
    *
    * @param  {number} newIntellect
    * @returns {void}
    */
    this.setIntellect = function(newIntellect) {
      intellect = newIntellect;
    }

    /**
     * setStamina
     *
     * @param  {number} newStamina
     * @returns {void}
     */
    this.setStamina = function(newStamina) {
      stamina = newStamina;
    }

    /**
     * setSpirit
     *
     * @param  {number} newSpirit
     * @returns {void}
     */
    this.setSpirit = function(newSpirit) {
      spirit = newSpirit;
    }
    /**
    * setArmorPenetration
    *
    * @param  {number} newArmorPenetration
    * @returns {void}
    */
    this.setArmorPen = function(newArmorPenetration) {
      armorPenetration = newArmorPenetration;
    }

    /**
    * setAttackSpeed
    *
    * @param  {number} newAttackSpeed
    * @returns {void}
    */
    this.setAttackSpeed = function(newAttackSpeed) {
      attackSpeed = newAttackSpeed;
    }

    /**
     * setAttackPower
     *
     * @param  {number} newAttackPower
     * @returns {void}
     */
    this.setAttackPower = function(newAttackPower) {
        attackPower = newAttackPower;
    }

    /**
     * setCriticalChance
     *
     * @param  {number} newCriticalChance
     * @returns {void}
     */
    this.setCriticalChance = function(newCriticalChance) {
      criticalChance = newCriticalChance;
    }

    /**
     * setHitChance
     *
     * @param  {number} newHitChance
     * @returns {void}
     */
    this.setHitChance = function(newHitChance) {
      hitChance = newHitChance;
    }

    /**
     * setSpellPower
     *
     * @param  {number} newSpellPower
     * @returns {void}
     */
    this.setSpellPower = function(newSpellPower) {
      spellPower = newSpellPower;
    }

    /**
     * setHealingPower
     *
     * @param  {number} newHealingPower
     * @returns {void}
     */
    this.setHealingPower = function(newHealingPower) {
      healingPower = newHealingPower;
    }

    /**
     * setSpellCriticalChance
     *
     * @param  {number} newSpellCriticalChance
     * @returns {void}
     */
    this.setSpellCriticalChance = function(newSpellCriticalChance) {
      spellCriticalChance = newSpellCriticalChance;
    }

    /**
     * setSpellHitChance
     *
     * @param  {number} newSpellHitChance
     * @returns {void}
     */
    this.setSpellHitChance = function(newSpellHitChance) {
      spellHitChance = newSpellHitChance;
    }

    /**
     * setManaPer5
     *
     * @param  {number} newManaPer5
     * @returns {void}
     */
    this.setManaPer5 = function(newManaPer5) {
      manaPer5 = newManaPer5;
    }

    /**
     * setSpellPenetration
     *
     * @param  {number} newSpellPenetration
     * @returns {void}
     */
    this.setSpellPenetration = function(newSpellPenetration) {
      spellPenetration = newSpellPenetration;
    }

    /**
     * setDefenseRating
     *
     * @param  {number} newDefenseRating
     * @returns {void}
     */
    this.setDefenseRating = function(newDefenseRating) {
      defenseRating = newDefenseRating;
    }

    /**
    * setArmorRating - armor rating
    *
    * @param  {number} newArmorRating
    * @returns {void}
    */
    this.setArmorRating = function(newArmorRating) {
      armorRating = newArmorRating;
    }

    /**
     * setBlockRating
     *
     * @param  {number} newBlockRating
     * @returns {void}
     */
    this.setBlockRating = function(newBlockRating) {
      blockRating = newBlockRating;
    }

    /**
     * setBlockValue
     *
     * @param  {number} newBlockValue
     * @returns {void}
     */
    this.setBlockValue = function(newBlockValue) {
      blockValue = newBlockValue;
    }

    /**
     * setDodgeRating
     *
     * @param  {number} newDodgeRating
     * @returns {void}
     */
    this.setDodgeRating = function(newDodgeRating) {
      dodgeRating = newDodgeRating;
    }

    /**
     * setParryRating
     *
     * @param  {number} newParryRating
     * @returns {void}
     */
    this.setParryRating = function(newParryRating) {
      parryRating = newParryRating;
    }

    /**
     * setAgilityToDodgeRatio
     *
     * @param  {number} newAgilityToDodgeRatio
     * @returns {void}
     */
    this.setAgilityToDodgeRatio = function(newAgilityToDodgeRatio) {
      agilityToDodgeRatio = newAgilityToDodgeRatio;
    }

    /**
     * setAgilityToCritRatio
     *
     * @param  {number} newAgilityToCritRatio
     * @returns {void}
     */
    this.setAgilityToCritRatio = function(newAgilityToCritRatio) {
      agilityToCritRatio = newAgilityToCritRatio;
    }

    /**
     * setStrengthToAttackPowerRatio
     *
     * @param  {number} newStrengthToAttackPowerRatio description
     * @returns {void}                               description
     */
    this.setStrengthToAttackPowerRatio = function(newStrengthToAttackPowerRatio) {
      strengthToAttackPowerRatio = newStrengthToAttackPowerRatio;
    }

    /**
     * setAgilityToAttackPowerRatio
     *
     * @param  {number} newAgilityToAttackPowerRatio description
     * @returns {void}                               description
     */
    this.setAgilityToAttackPowerRatio = function(newAgilityToAttackPowerRatio) {
      agilityToAttackPowerRatio = newAgilityToAttackPowerRatio;
    }

    /**
     * setResistances
     *
     * @param  {object} newResistances
     * @returns {void}
     */
    this.setResistances = function(newResistances) {
      resistances = newResistances;
    }

  }
}
