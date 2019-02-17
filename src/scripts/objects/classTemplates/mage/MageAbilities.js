import spellHitTable from '../../../hitTables/spellHitTable';

export default class MageAbilities {
  constructor(character) {
    let abilities = ['shoot'];

    /**
     * shoot - attack with an equipped wand
     *
     * requires: wand
     * cast time: .5 second
     *
     * @returns {void}
     */
    this.shoot = function() {
      // check for cooldown
      const canRanged = character.timer.checkSwingTimer('ranged');
      if (!canRanged) return;
      // check if there is a target
      const target = character.target.currentTarget();
      if (!target) return console.log("I need a target");
      // check for wand
      const wand = character.equipment.equipped().ranged;
      if (!wand.damage) return console.log("I dont have a wand")
      // check if target is in range
      const maxDistance = 300;
      const inRange = character.target.rangeCheck(target, maxDistance);
      if (inRange) {
        // stop moving, cant move and shoot
        character.movement.stop();
        character.timer.resetSwingTimer('ranged');
        // get weapon dmg roll
        const damageAmount = Phaser.Math.Between(wand.damage.min, wand.damage.max);
        // build spell combat object
        const attackStatus = spellHitTable(character, target);
        // process combat object
        const combatObject = character.combat.buildCombatObject(
          target,
          attackStatus,
          wand,
          'ranged',
          wand.type,
          damageAmount
        );
        character.combat.processCombatObject(target, combatObject);
        return combatObject;
      } return console.log("I'll have to get closer")
    }

    /**
     * shootAutoAttack - wrapper for shoot attack.
     * checks ranged swing timer,
     *
     * @param  {Character} target
     * @returns {void}
     */
    this.shootAutoAttack = function(target = {}) {
      if (!target.combat.isDead()) {

      }
    }

    this.arcaneIntellect = function() {
      // ncreases the target's Intellect by 2 for 30 min.
      // requires leve 1
    }

    this.conjureWater = function() {
      // [Conjure Water]	4	1Silver	Conjures 2 bottles of water, providing the mage and his allies with something to drink.
      // Conjured items disappear if logged out for more than 15 minutes.
      // requires level 4
    }

    this.conjureFood = function() {
      // Conjures 2 muffins, providing the mage and his allies with something to eat.
      // Conjured items disappear if logged out for more than 15 minutes.
      // requires level 6
    }

    this.arcaneMissiles = function() {
      // Launches Arcane Missiles at the enemy, causing 24 Arcane damage each second for 3 sec.
      // requires level 8
    }

    this.polymorph = function() {
      // Transforms the enemy into a sheep, forcing it to wander around for up to 20 sec.
      // While wandering, the sheep cannot attack or cast spells but will regenerate very quickly.
      // Any damage will transform the target back into its normal form.
      // Only one target can be polymorphed at a time. Only works on Beasts, Humanoids and Critters.
      // requires level 8
    }

    this.fireball = function() {
      // requires level 1
      // Hurls a fiery ball that causes 14 to 22 Fire damage
      // and an additional 2 Fire damage over 4 sec.
    }

    this.fireBlast = function() {
      // requires level 6
      // Blasts the enemy for 24 to 32 Fire damage.
    }

    this.frostArmor = function() {
      // requires level 1
      // ncreases Armor by 30. If an enemy strikes the caster, they may have
      // their movement slowed by 30% and the time between their attacks
      // increased by 25% for 5 sec. Only one type of Armor spell can be
      // active on the Mage at any time. Lasts 30 min.
    }

    this.frostbolt = function() {
      // requires level 4
      // Launches a bolt of frost at the enemy, causing 18 to 20 Frost
      // damage and slowing movement speed by 40% for 5 sec.
    }



    /**
    * getAbilities
    *
    * @returns {array}  characters abilitees
    */
    this.getAbilities = function() {
      return abilities;
    }

    /**
    * setAbilities - spells character knows
    *
    * @param  {array} newAbilities
    * @returns {void}
    */
    this.setAbilities = function(newAbilities) {
      abilities = newAbilities;
    }

  }
}
