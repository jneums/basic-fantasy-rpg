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
      const healing = 4;
      // create buff
      // buff manager needs to know about channeling
      const buff = {
        name: 'eating',
        duration: 30 * 60,
        channel: { health: healing },
        combatObject: {
          attacker: character.getName(),
          target: character.getName(),
          status: 'hit',
          type: 'heal',
          range: 'melee',
          damageType: '',
          damageAmount: -healing / 60,
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
  }
}
