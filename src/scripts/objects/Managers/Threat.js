export default class Threat {
  constructor(character) {
    // [{ name: 'charlie', threat: 120 }, { name: 'kobold', threat: 20 }]
    let threatTable = [];

    /**
     * getThreatTable
     *
     * @returns {array}
     */
    this.getThreatTable = function() {
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
     * updateTargetThreatTable
     *
     * @param  {Character} target 's table to update
     * @param  {object} combatObject
     * @returns {void}
     */
    this.updateTargetThreatTable = function(target = {}, combatObject = {}) {

      // scan my table for enemy entry.
      const threat = combatObject.damageAmount + combatObject.bonusThreat;
      const oldTable = target.threat.getThreatTable()
      const myName = character.getName();

      // get previous threat
      const oldEntry = oldTable.filter(entry => entry.name === myName)[0];
      const newTable = oldTable.filter(entry => entry.name !== myName);

      let newEntry = { name: myName, threat: threat };
      if (oldEntry) {
        newEntry.threat += oldEntry.threat;
      }
      target.threat.setThreatTable(newTable.concat([newEntry]))
    }
  }
}
