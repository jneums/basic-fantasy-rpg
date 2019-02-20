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
      threatTable = newThreatTable;
    }

    /**
     * highestThreat - sort threat table and
     * return character reference with the highest
     * threat
     *
     * @returns {Character}
     */
    this.highestThreat = function() {
      if (threatTable.length) {
        // return first entry in sorted threatTable
        return threatTable.sort((a, b) => {
          b.threat - a.threat;
        })[0].character;
      }
    }

    /**
     * updateTargetThreatTable
     *
     * @param  {Character} target 's table to update
     * @param  {object} combatObject
     * @returns {void}
     */
    this.updateTargetThreatTable = function(target = {}, combatObject = {}) {
      const threat = combatObject.amount + combatObject.bonusThreat;
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
