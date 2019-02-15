export default class Buffs {
  constructor(character) {
    let buffs = [];

    this.getBuffs = function() {
      return buffs;
    }

    this.setBuffs = function(newBuffs) {
      buffs = newBuffs;
    }

    this.add = function(newBuff) {
      const oldBuffs = this.getBuffs();
      const newBuffs = oldBuffs.concat([newBuff]);
      this.setBuffs(newBuffs);
    }

    this.replace = function(newBuff) {
      const oldBuffs = this.getBuffs().filter(buff => buff.name !== newBuff.name);
      const newBuffs = oldBuffs.concat([newBuff]);
      this.setBuffs(newBuffs);
    }

    this.has = function(name = '') {
      const buff = this.getBuffs().filter(buff => buff.name === name)[0];
      return !(buff === undefined);
    }

    this.statBonus = function(stat = '') {
      const activeBuffs = this.getBuffs();
      const totalStat = activeBuffs.reduce((sum, buff) => {
        if (buff.statObject) {
          if (!buff.statObject[stat]) return 0;
          return sum + buff.statObject[stat];
        }
        else return 0;
      }, 0)
      return totalStat;
    }

    this.update = function() {
      const oldBuffs = this.getBuffs();
      if (oldBuffs) {
        const newBuffs = oldBuffs.filter(buff => buff.duration > 0)
          .map(buff => {
            const oldBuff = buff;
            const newBuff = Object.assign({},
              oldBuff,
              { name: oldBuff.name, duration: oldBuff.duration - 1 }
            );
            return newBuff;
        })
        this.setBuffs(newBuffs);
        newBuffs.forEach(buff => {
          if (buff.combatObject) {
            const attacker = buff.attacker;
            attacker.combat.processCombatObject(character, buff.combatObject);
          }
          if (buff.statObject) {
            if (buff.statObject['speed']){
              const newSpeed = buff.statObject['speed'];
              character.combat.setAttackSpd(newSpeed);
            }
          }
        })
      }
    }
  }
}
