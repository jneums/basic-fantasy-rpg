import processRage from './rageMechanic';

/**
 * attackerClassUpdate - specific reactions for causing dmg
 *
 * @param  {Character} attacker
 * @param  {object} combatObject info about attack
 * @returns {object} modified combatObject
 */
function attackerClassUpdate(attacker = {}, newCombatObject = {}) {
  const attackerClass = attacker.getCharacterClass();
  switch(attackerClass) {
    case 'warrior':
      const onNextAttack = attacker.getOnNextAttack();
      if (onNextAttack.name === 'heroicStrike') {
        newCombatObject.damageAmount += onNextAttack.value;
        const newOnNextAttack = {};
        attacker.setOnNextAttack(newOnNextAttack);
        return newCombatObject;
      } else if (!onNextAttack.name){
        processRage(attacker, newCombatObject, 'attacker');
        return newCombatObject;
      }
    default:
      return newCombatObject;
  }
}

/**
 * targetClassUpdate - specific reactions for taking dmg
 *
 * @param  {Character} target
 * @param  {object} combatObject info about attack
 * @returns {void}
 */
function targetClassUpdate(target = {}, newCombatObject = {}) {
  const targetClass = target.getCharacterClass();
  switch(targetClass) {
    case 'warrior':
      processRage(target, newCombatObject, 'target');
      return newCombatObject;
    default:
      return newCombatObject;
  }
}

export { attackerClassUpdate, targetClassUpdate};
