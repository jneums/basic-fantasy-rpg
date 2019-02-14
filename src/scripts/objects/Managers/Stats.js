export default class Stat {
  constructor(character = {}, {strength, agility, intellect, stamina, spirit}) {
    let hp = 0;
    // Armor Penetration was best known as a valuable stat in
    // Wrath of the Lich King, but the mechanic first started as an
    // obscure one on a handful of items in Classic WoW.
    let armorPenetration = 0;
    // Attack speed affects how frequently your characters will auto-attack.
    // For classes such as Rogues that generate a fair amount of
    // damage through white auto-attacks, Attack Speed is important.
    let attackSpeed = 0;
    // Attack Power increases your base melee damage-per-second (DPS)
    // by 1 point for every 14 Attack Power.
    // You can gain Attack Power with either Strength or Agility, depending
    // on your class, or with raw Attack Power as a stat
    // provided by certain pieces of gear.
    let attackPower = 0;
    // Critical Strike Chance increases your chance to strike a critical
    // hit with weapon-based attacks on an enemy.
    // A critical hit deals double its normal damage.
    let criticalChance = 0;
    // All attacks have a chance to miss an enemy of a similar or higher level.
    // Hit chance is a stat that exists to mitigate and eventually nullify this.
    // The amount of Hit Chance needed to not miss any attacks is called the "Hit Cap".
    let hitChance = 0;
    // Weapon Skill is a display of how proficient you are with a weapon type.
    // Each weapon type has its own skill-up, and the level cap
    // is (your your current level * 5), which means at level 60,
    // your Weapon Skill will cap at 300.
    // Spell Power increases the damage of all your offensive spells.
    let spellPower = 0;
    // Healing Power increases how much your healing spells will heal your target.
    let healingPower = 0;
    // Spell Critical Strike increases your chance to strike a
    // critical hit with spells. A critical spell hit deals 150% of
    // a spell's normal damage.
    let spellCriticalChance = 0;
    // All spells have a chance to miss an enemy of similar or
    // higher level. Spell Hit Chance mitigates and eventually nullifies this.
    // The amount of Spell Hit needed to not miss any spells is called
    // the "Spell Hit Cap".
    let spellHitChance = 0;
    // This stat will regenerate a certain amount of Mana every 5 seconds.
    let manaPer5 = 0;
    // Spell Penetration reduces the target's resistances to your spells.
    // It works differently from Spell Hit, as it only works on targets
    // with resistances and will not reduce a target's resistance below zero.
    let spellPenetration = 0;
    // Defense is an attribute that helps prevent Physical damage
    // by reducing the chance to be hit or critically hit.
    let defenseRating = 5;
    // Armor reduces how much Physical damage you
    // take when a player or NPC hits you.
    let armorRating = 0;
    // Block is the ability of a shield to absorb incoming Physical damage,
    // in addition to its Armor rating. When a Paladin, Warrior or Shaman
    // have a Shield equipped, they gain a chance to Block
    // incoming Physical attacks.
    let blockRating = 0;
    // Block Value increases the amount of damage
    // mitigated per blocked attack.
    let blockValue = 0;
    // Dodge increases the chance to completely avoid a Physical attack.
    let dodgeRating = 0;
    // Parry increases the chance to completely
    // mitigate a Physical attack. A successful Parry nullifies the
    // attack dealt, but also reduce the swing timer of the
    // enemy's next attack.
    let parryRating = 0;
    // There are five types of resistances in Classic: Fire Resistance,
    // Frost Resistance, Arcane Resistance, Nature Resistance
    // and Shadow Resistance.
    let resistances = {
      fire: 0,
      frost: 0,
      arcane: 0,
      nature: 0,
      shadow: 0
    }

    // combat stats
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
      const strFromEquipped = character.equipment.getStatFromEquipped('strength');
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
      const agility = character.stat.getAgility();
      // add agi bonus from talents, items, buffs
      const agiFromEquipped = character.equipment.getStatFromEquipped('agility');
      const totalAgi = agility + agiFromEquipped;
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
      const apFromEquipped = character.equipment.getStatFromEquipped('attackPower');
      // add ap bonus from talents, items, buffs
      const attackPower =  apFromStr + apFromAgi + apFromEquipped;
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
      const armor = target.stat.getArmorRating();
      // everyone gets 2 armor per agi
      const armorFromAgility = target.stat.getAgility() * 2;
      const armorFromItems = target.equipment.getStatFromEquipped('armor');
      const attackerLevel = character.lvl.getLevel();
      const dmgMitigated = armor / (armor + 400 + 85 * attackerLevel);
      return dmgMitigated;
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
     * getAgility
     *
     * @returns {number}  character agility
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
      return dodgeRating;
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
