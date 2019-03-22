export default class KillLog {
  constructor(character) {
    let kills = [];

    this.add = function(target = {}) {
      kills.push(target);
      // trigger quest log update:
      if (character.questLog) {
        character.questLog.update(target);
      }
      // trigger level manager update:
      if (character.lvl) {
        character.lvl.gainXP(1);
      }
    }


  }
}
