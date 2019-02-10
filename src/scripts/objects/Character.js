
export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, 'no-texture')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // character name
    let name = '';
    // ['dwarf', 'night-elf', 'gnome', 'human'];
    // race
    let race = 'human';
    // ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'warlock', 'warrior'];
    // class
    let characterClass = '';
    // level 1 - 60;
    let level = 1;
    // track what level you are
    let experience = 0;
    // Strength increases the amount of your melee attack power,
    // and how much damage you can block with a Shield.
    let strength = 20;
    // Agility increases ranged and Melee attack power for some classes,
    // increases Armor rating, increases Dodge chance,
    // and increases your Critical Strike chance when attacking with a weapon.
    let agility = 20;
    // intellect increases your maximum Mana for Mana classes,
    // increases your chance to score a Critical Strike with spells,
    // and improves the rate at which you improve your Weapon Skills.
    // For Warlocks, it will also increase their pets' Intellect (and their Mana).
    let intellect = 20;
    // Stamina increases your maximum Health. For Hunters and Warlocks,
    // Stamina also increases their pets' Stamina (and thus, Health).
    let stamina = 20;
    // Spirit increases Health regeneration while out of combat
    // and increases Mana regeneration while not casting spells.
    // As there are many ways to regenerate Health, Spirit is usually
    // picked as a way to regenerate Mana more often.
    let spirit = 20;
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
    let weaponSkills = {
      daggers: 5,
      fistWeapons: 5,
      oneHandedAxes: 5,
      oneHandedMaces: 5,
      oneHandedSwords: 5,
      polearms: 5,
      staves: 5,
      twoHandedAxes: 5,
      twoHandedMaces: 5,
      twoHandedSwords: 5,
      bows: 5,
      crossbows: 5,
      guns: 5,
      thrown: 5,
      wands: 5
    }
    let armorSkills = {
      cloth: 0,
      leather: 0,
      mail: 0,
      plate: 0,
      shield: 0
    }
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
    // Defense is an attribute that helps prevent Physical damage
    // by reducing the chance to be hit or critically hit.
    let defenseRating = 5;
    // Armor reduces how much Physical damage you
    // take when a player or NPC hits you.
    let armorRating = 11;
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
    let agilityToDodgeRatio = 0;
    let agilityToCritRatio = 0;

    let equipment = [];
    let spellbook = [];
    let money = 0;
    let hp = 0;
    let movementSpeed = 0;
    let team = '';
    let swingTimerLeftHand = 0;
    let swingTimerRightHand = 0;
    let spellTimers = [];

    let leftHand = {
      name: 'fist',
      price: '4gp',
      size: 'S',
      speed: 1,
      weight: 5,
      type: 'unarmed',
      die: { sides: 1, quantity: 1, bonus: 0 },
    };

    let rightHand = {
      name: 'fist',
      price: '4gp',
      size: 'S',
      speed: 1,
      weight: 5,
      type: 'unarmed',
      die: { sides: 1, quantity: 1, bonus: 0 },
    };

    /**
     * getName
     *
     * @returns {string} character name
     */
    this.getName = function() {
      return name;
    }

    /**
     * getRace
     *
     * @returns {string} character race
     */
    this.getRace = function() {
      return race;
    }

    /**
    * getCharacterClass
    *
    * @returns {string} character class
    */
    this.getCharacterClass = function() {
      return characterClass;
    }

    /**
     * getLevel
     *
     * @returns {number} character level
     */
    this.getLevel = function() {
      return level;
    }

    /**
     * getExperience
     *
     * @returns {number} character experience
     */
    this.getExperience = function() {
      return experience;
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
     * getWeaponSkills
     *
     * @returns {object}
     */
    this.getWeaponSkills = function() {
      return weaponSkills;
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
     * getResistances
     *
     * @returns {object} { shadow: 0, arcane: 1, etc. }
     */
    this.getResistances = function() {
      return resistances;
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
     * getEquipment
     *
     * @returns {array}  characters items
     */
    this.getEquipment = function() {
      return equipment;
    }

    /**
    * getSpellbook
    *
    * @returns {array}  characters spells
    */
    this.getSpellbook = function() {
      return spellbook;
    }

    /**
     * getMoney
     *
     * @returns {number}  characters money
     */
    this.getMoney = function() {
      return money;
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
    * getMovementSpeed
    *
    * @returns {number}  characters walking speed
    */
    this.getMovementSpeed = function() {
      return movementSpeed;
    }

    /**
    * getTeam
    *
    * @returns {string}  characters team
    */
    this.getTeam = function() {
      return team;
    }

    /**
    * getSwingTimerLeftHand
    *
    * @returns {number} left hand cooldown
    */
    this.getSwingTimerLeftHand = function() {
      return swingTimerLeftHand;
    }

    /**
    * getSwingTimerRightHand
    *
    * @returns {number} right hand cooldown
    */
    this.getSwingTimerRightHand = function() {
      return swingTimerRightHand;
    }

    /**
     * getLeftHand
     *
     * @returns {object}  equipped in characters left hand
     */
    this.getLeftHand = function() {
      return leftHand;
    }

    /**
     * getRightHand
     *
     * @returns {object}  equipped in characters right hand
     */
    this.getRightHand = function() {
      return rightHand;
    }

    /**
     * getSpellTimers
     *
     * @returns {array} array of timer objects
     */
    this.getSpellTimers = function() {
      return spellTimers;
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
     * setName
     *
     * @param  {string} newName
     * @returns {void}
     */
    this.setName = function(newName) {
      name = newName;
    }

    /**
     * setRace
     *
     * @param  {string} newRace
     * @returns {void}
     */
    this.setRace = function(newRace) {
      race = newRace;
    }

    /**
    * setCharacterClass
    *
    * @param  {string} newCharacterClass
    * @returns {void}
    */
    this.setCharacterClass = function(newCharacterClass) {
      characterClass = newCharacterClass;
    }

    /**
     * setLevel
     *
     * @param  {number} newLevel
     * @returns {void}
     */
    this.setLevel = function(newLevel) {
      level = newLevel;
    }


    /**
     * setExperience
     *
     * @param  {number} newExperience
     * @returns {void}
     */
    this.setExperience = function(newExperience) {
      level = newExperience;
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
     * setWeaponSkills - replace entire object
     *
     * @param  {object} newWeaponSkills
     * @returns {void}
     */
    this.setWeaponSkills = function(newWeaponSkills) {
      weaponSkills = newWeaponSkills;
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
     * setResistances
     *
     * @param  {object} newResistances
     * @returns {void}
     */
    this.setResistances = function(newResistances) {
      resistances = newResistances;
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
     * setEquipment
     *
     * @param  {array} newEquipment
     * @returns {void}
     */
    this.setEquipment = function(newEquipment) {
      equipment = newEquipment;
    }

    /**
    * setSpellbook - spells character knows
    *
    * @param  {array} newSpellbook
    * @returns {void}
    */
    this.setSpellbook = function(newSpellbook) {
      spellbook = newSpellbook;
    }

    /**
     * setMoney
     *
     * @param  {number} newMoney
     * @returns {void}
     */
    this.setMoney = function(newMoney) {
      money = newMoney;
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
    * setMovementSpeed
    *
    * @param  {number} newSpeed
    * @returns {void}
    */
    this.setMovementSpeed = function(newSpeed) {
      movementSpeed = newSpeed;
    }

    /**
    * setTeam
    *
    * @param  {string} newTeam
    * @returns {void}
    */
    this.setTeam = function(newTeam) {
      team = newTeam;
    }

    /**
    * setSwingTimerLeftHand
    *
    * @param  {number} newSwingTimerLeftHand
    * @returns {void}
    */
    this.setSwingTimerLeftHand = function(newSwingTimerLeftHand) {
      swingTimerLeftHand = newSwingTimerLeftHand;
    }

    /**
    * setSwingTimerRightHand
    *
    * @param  {number} newSwingTimerRightHand
    * @returns {void}
    */
    this.setSwingTimerRightHand = function(newSwingTimerRightHand) {
      swingTimerRightHand = newSwingTimerRightHand;
    }

    /**
     * setLeftHand - object in left hand
     *
     * @param  {object} newLeftHand
     * @returns {void}
     */
    this.setLeftHand = function(newLeftHand) {
      leftHand = newLeftHand;
    }

    /**
     * setRightHand - object in right hand
     *
     * @param  {object} newRightHand
     * @returns {void}
     */
    this.setRightHand = function(newRightHand) {
      rightHand = newRightHand;
    }

    /**
     * setSpellTimers
     *
     * @param  {array} newSpellTimers array of timer objects
     * @returns {void}
     */
    this.setSpellTimers = function(newSpellTimers) {
      spellTimers = newSpellTimers;
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
  }
}
