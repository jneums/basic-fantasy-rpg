export default class Threat {
  constructor(character) {
    // [{ character: {}, threat: 120 }, { character: {}, threat: 20 }]
    let threatTable = [];

    /**
     * threatTable
     *
     * @returns {array}
     */
    this.threatTable = function() {
      return threatTable;
    }

    /**
     * setThreatTable - push new table to character
     *
     * @param  {array} newThreatTable
     * @returns {void}
     */
    this.setThreatTable = function(newThreatTable) {
      // sort new threat table first:
      threatTable = newThreatTable.sort((a, b) => {
        return b.threat - a.threat;
      });
    }

    this.resetThreat = function(character) {
      const newThreatTable = threatTable.filter(a => a.character.getName() !== character.getName());
      this.setThreatTable(newThreatTable);
    }

    /**
     * highestThreat - sort threat table and
     * return character reference with the highest
     * threat
     *
     * filters out dead characters as well.
     *
     * @returns {Character}
     */
    this.highestThreat = function() {
      if (!threatTable[0]) return null;
      const filteredThreat = threatTable.filter(entry => !entry.character.combat.isDead());
      if (!filteredThreat[0]) return null;
      return filteredThreat[0].character
    }

    /**
     * updateTargetThreatTable
     *
     * @param  {Character} target 's table to update
     * @param  {object} combatObject
     * @returns {void}
     */
    this.updateTargetThreatTable = function(target = {}, combatObject = {}) {
      if (target.combat.isDead()) return;
      
      let threat = combatObject.amount() + combatObject.bonusThreat();
      if (combatObject.type() === 'heal') {
        threat = (combatObject.amount() * -1)
      }
      const oldTable = target.threat.threatTable()
      const oldEntry = oldTable.filter(entry => entry.character.getName() === character.getName())[0];
      const newTable = oldTable.filter(entry => entry.character.getName() !== character.getName());

      let newEntry = { character: character, threat: threat };
      if (oldEntry) {
        newEntry.threat += oldEntry.threat;
      }
      target.threat.setThreatTable(newTable.concat([newEntry]))
    }
  }
}
