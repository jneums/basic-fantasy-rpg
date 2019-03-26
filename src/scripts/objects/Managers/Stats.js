
/**
 * Stat Manager - Handles all of the stats
 * relevant for a RPG Character. The stat manager
 * provides an API the other managers use when
 * deciding which values to use.
 *
 * the constructor can be used with a 'race' object, since each
 * race has slightly different starting stats.
 */
export default class Stat {
  constructor(character = {}, {strength, agility, intellect, stamina, spirit}) {
    // health points. When they reach 0, character is dead.
    let hp = 0;
    // base health points. changes based on race and character class.
    // used to determine hp pool, only changes at creation and level ups.
    let baseHp = 0;
    // attack power determines how hard a character hits.
    let attackPower = 0;
    let crit = 0;
    let hitChance = 0;
    // determines how hard spells hit.
    let spellPower = 100;
    // determines how hard healing spells heal.
    let healingPower = 100;
    let spellCrit = 0;
    let spellHit = 0;
    let manaPer5 = 0;
    let defenseRating = 5;
    // mitigation for physical attacks.
    let armorRating = 0;
    // what percent of physical attacks (except not from behind) will be blocked.
    let blockRating = 0;
    // how much the block will actually mitigate when a block occurs.
    let blockValue = 0;
    let dodgeRating = 0;
    let parryRating = 0;

    // combat stats
    // these are set from constructor when
    // class is chosen
    let agilityToDodgeRatio = 0;
    let agilityToCritRatio = 0;
    let strAPR = 0;
    let agilityToAttackPowerRatio = 0;

    // place holder methods, will be replaced when
    // talents are races are implemented.
    this.statFromTalents = function() {
      return 0;
    }

    this.statFromRace = function() {
      return 0;
    }



    this.displayStats = function() {
      const stats = {
        str: this.stamina(),
        agi: this.agility(),
        sta: this.stamina(),
        int: this.intellect(),
        spi: this.spirit()
      };

      return stats;
    }
    /**
     * maxHp - maximum allowed hitpoints, referenced when
     * performing health gains so as not to overflow.
     *
     * @returns {number}
     */
    this.maxHp = function() {
      const hpFromStam = this.stamina() * 10;
      return baseHp + hpFromStam;
    }

    /**
     * baseHp - used to set overall hp:
     * (baseHp + all stamina bonus * 10)
     *
     * @returns {number} hitpoints
     */
    this.baseHp = function() {
      return baseHp;
    }

    /**
     * setBaseHp
     *
     * @param  {number} hp
     * @returns {void}
     */
    this.setBaseHp = function(hp) {
      baseHp = hp;
    }

    /**
     * APFromStr - combat helper
     * attack power per point of strength
     * each class has a different ratio.
     *
     * @param  {Character} character attacker
     * @returns {number} class specific
     */
    this.APFromStr = function() {
      // get total strength (base + equipped + talents)
      const totalStr = this.strength()
      // if ratio is not zero (otherwise will throw NaN, cant divide by zero)
      const apFromStr = (this.strAPR()) ? totalStr / this.strAPR() : 0;
      return apFromStr;
    }

    /**
     * APFromAgi - combat helper
     * attack power per point of agility
     * each class has different ratio.
     *
     * @returns {number} class specific
     */
    this.APFromAgi = function() {
      const totalAgi = this.agility();
      // if ratio is not zero (otherwise will throw NaN, cant divide by zero)
      const apFromAgi = (this.agiAPR()) ? totalAgi / this.agiAPR() : 0;
      return apFromAgi;
    }

    /**
     * APBonus - how much to add to each swing
     *
     * @param  {string} hand for weaponSpeed
     * @returns {number} bonus damage
     */
    this.APBonus = function(hand = '') {
      // base stats
      const apFromStr = this.APFromStr();
      const apFromAgi = this.APFromAgi();
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
     * armorMitigationPercent -
     * how much of the dmg is subtracted
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
      const armorFromAgility = this.agility() * 2;
      const armorFromItems = character.equipment.statBonus('armor');
      return armorFromBuffs + armorFromAgility + armorFromItems;
    }

    /**
     * hp
     *
     * @returns {number}  characters health points
     */
    this.hp = function() {
      return hp;
    }

    /**
     * strength - base, gear, and buffs
     *
     * @returns {number} total strength
     */
    this.strength = function() {
      const baseStrength = strength;
      const gearStrength = character.equipment.statBonus('strength');
      const buffStrength = character.buffs.statBonus('strength');
      return baseStrength + gearStrength + buffStrength;
    }

    /**
     * baseStrength
     *
     * @returns {number} character strength
     */
    this.baseStrength = function() {
      return strength;
    }

    /**
     * agility - base, gear, and buffs
     *
     * @returns {number} total agility
     */
    this.agility = function() {
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
    this.baseAgility = function() {
      return agility;
    }

    /**
     * intellect - base, gear, and buffs
     *
     * @returns {number} total Intellect
     */
    this.intellect = function() {
      const baseIntellect = intellect;
      const gearIntellect = character.equipment.statBonus('intellect');
      const buffIntellect = character.buffs.statBonus('intellect');
      return baseIntellect + gearIntellect + buffIntellect;
    }

    /**
    * baseIntellect
    *
    * @returns {number}  character intellect
    */
    this.baseIntellect = function() {
      return intellect;
    }


    /**
     * total combined stamina - base, gear, and buffs
     *
     * @returns {number} total agility
     */
    this.stamina = function() {
      const baseStamina = stamina;
      const gearStamina = character.equipment.statBonus('stamina');
      const buffStamina = character.buffs.statBonus('stamina');
      return baseStamina + gearStamina + buffStamina;
    }
    /**
     * base stamina
     *
     * @returns {number}  character stamina
     */
    this.baseStamina = function() {
      return stamina;
    }


    /**
     * spirit - base, gear, and buffs
     *
     * @returns {number} total Spirit
     */
    this.spirit = function() {
      const baseSpirit = spirit;
      const gearSpirit = character.equipment.statBonus('spirit');
      const buffSpirit = character.buffs.statBonus('spirit');
      return baseSpirit + gearSpirit + buffSpirit;
    }

    /**
     * baseSpirit
     *
     * @returns {number}  character spirit
     */
    this.baseSpirit = function() {
      return spirit;
    }

    /**
    * attackSpeed
    *
    * @returns {number}  attack speed
    */
    this.attackSpeed = function() {
      return attackSpeed;
    }

    /**
     * attackPower - base, gear, and buffs
     *
     * @returns {number} total ap
     */
    this.attackPower = function() {
      const baseAP = attackPower;
      const gearAP = character.equipment.statBonus('attackPower');
      const buffAP = character.buffs.statBonus('attackPower');
      // talents
      return baseAP + gearAP + buffAP;
    }

    /**
     * baseAttackPower
     *
     * @returns {number}
     */
    this.baseAttackPower = function() {
      return attackPower;
    }

    /**
     * crit - base, gear, and buffs
     *
     * @returns {number} total crit
     */
    this.crit = function() {
      const baseCrit = crit;
      const gearCrit = character.equipment.statBonus('crit');
      const buffCrit = character.buffs.statBonus('crit');
      // talents
      return baseCrit + gearCrit + buffCrit;
    }

    /**
     * baseCrit
     *
     * @returns {number}
     */
    this.baseCrit = function() {
      return crit;
    }


    /**
     * baseHit
     *
     * @returns {number}
     */
    this.baseHit = function() {
      return hitChance;
    }
    /**
     * baseSpellPower
     *
     * @returns {number}
     */
    this.baseSpellPower = function() {
      return spellPower;
    }

    this.spellPower = function() {
      const base = spellPower;
      const gear = character.equipment.statBonus('spellPower');
      const buff = character.buffs.statBonus('spellPower');
      // talents
      return base + gear + buff;
    }


    /**
     * baseHealingPower
     *
     * @returns {number}
     */
    this.baseHealingPower = function() {
      return healingPower;
    }

    /**
     * spellCrit - total
     *
     * @returns {number}
     */
    this.spellCrit = function() {
      const base = spellCrit;
      const gear = character.equipment.statBonus('spellCrit');
      const buff = character.buffs.statBonus('spellCrit');
      // talents too
      return base + gear + buff;
    }

    /**
     * getSpellcrit - base spell crit
     *
     * @returns {number}
     */
    this.getSpellcrit = function() {
      return spellcrit;
    }


    /**
     * getspellHit
     *
     * @returns {number}
     */
    this.getSpellHit = function() {
      return spellHit;
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
     * baseDef
     *
     * @returns {number}
     */
    this.baseDef = function() {
      return defenseRating;
    }

    /**
    * baseArmor
    *
    * @returns {number}  characters armor class
    */
    this.baseArmor = function() {
      return armorRating;
    }

    /**
     * baseBlockR
     *
     * @returns {number}
     */
    this.baseBlockR = function() {
      return blockRating;
    }

    /**
     * baseBlockV
     *
     * @returns {number}
     */
    this.baseBlockV = function() {
      return blockValue;
    }

    /**
     * dodge
     *
     * @returns {number}
     */
    this.dodge = function() {
      const baseDodge = dodgeRating;
      const totalAgi = this.agility();
      const agilityToDodgeRatio = this.agiDodgeRatio();
      const targetDodgeFromAgi = (totalAgi / agilityToDodgeRatio) * .01
      const targetRaceBonus = this.statFromRace();
      const targetTalentDodgeBonus = this.statFromTalents();

      return baseDodge + targetDodgeFromAgi + targetRaceBonus + targetTalentDodgeBonus;
    }

    /**
     * baseParry
     *
     * @returns {number}
     */
    this.baseParry = function() {
      return parryRating;
    }

    /**
     * agiDodgeRatio
     *
     * @returns {number}
     */
    this.agiDodgeRatio = function() {
      return agilityToDodgeRatio;
    }

    /**
     * agiCritR
     * agility to crit ratio
     * @returns {number}
     */
    this.agiCritR = function() {
      return agilityToCritRatio;
    }

    /**
     * strAPR
     * strength to attack power ratio
     * @returns {number}
     */
    this.strAPR = function() {
      return strAPR;
    }

    /**
     * agiAPR
     * agility to attack power ratio
     *
     * @returns {number}
     */
    this.agiAPR = function() {
      return agilityToAttackPowerRatio;
    }

    /**
     * baseResistances
     *
     * @returns {object} { shadow: 0, arcane: 1, etc. }
     */
    this.baseResistances = function() {
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
     * setStrength - base
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
     * setCrit
     *
     * @param  {number} newCrit
     * @returns {void}
     */
    this.setCrit = function(newCrit) {
      crit = newCrit;
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
     * setSpellCrit
     *
     * @param  {number} newSpellCrit
     * @returns {void}
     */
    this.setSpellCrit = function(newSpellCrit) {
      spellCrit = newSpellCrit;
    }

    /**
     * setspellHit
     *
     * @param  {number} newspellHit
     * @returns {void}
     */
    this.setspellHit = function(newspellHit) {
      spellHit = newspellHit;
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
     * setStrAPR
     *
     * @param  {number} newStrAPR description
     * @returns {void}                               description
     */
    this.setStrAPR = function(newStrAPR) {
      strAPR = newStrAPR;
    }

    /**
     * setAgilityToAttackPowerRatio
     *
     * @param  {number} newAgilityToAttackPowerRatio
     * @returns {void}
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
