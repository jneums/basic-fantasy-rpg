export default class Consumables {
  constructor(character) {
    let abilities = ['eat', 'drink'];

    this.abilities = function() {
      return abilities;
    }

    this.setAbilities = function(newAbilities) {
      abilities = newAbilities;
    }

    this.eat = function(foodLevel = 1) {
      // channeled, so movement will break it
      // out of combat only:
      if (character.combat.inCombat()) return console.log('You are in combat')
      // hp gained depends on the foodLevel
      const healing = 19;
      // create buff
      // buff manager needs to know about channeling
      const buff = {
        name: 'eating',
        duration: 30 * 60,
        interval: 300,
        channel: true,
        combatObject: {
          attacker: character.getName(),
          target: character.getName(),
          status: 'hit',
          type: 'eat',
          range: 'melee',
          damageType: '',
          amount: -healing,
          bonusThreat: 0,
          mitigationAmount: 0,
          hand: 'main',
          time: Date.now()
        },
        attacker: character
      }
      if (character.buffs.has('eating'))
        character.buffs.replace(buff);
      else
        character.buffs.add(buff);
    }

    this.drink = function(waterLevel = 1) {
      // channeled, so movement will break it
      // out of combat only:
      if (character.combat.inCombat()) return console.log('You are in combat')
      // mana gained depends on the water Level
      const regen = 19;
      // create buff
      // buff manager needs to know about channeling
      const buff = {
        name: 'drinking',
        duration: 30 * 60,
        interval: 300,
        channel: true,
        combatObject: {
          attacker: character.getName(),
          target: character.getName(),
          status: 'hit',
          type: 'drink',
          range: 'melee',
          damageType: '',
          amount: -regen,
          bonusThreat: 0,
          mitigationAmount: 0,
          hand: 'main',
          time: Date.now()
        },
        attacker: character
      }
      if (character.buffs.has('drinking'))
        character.buffs.replace(buff);
      else
        character.buffs.add(buff);
    }
  }
}
