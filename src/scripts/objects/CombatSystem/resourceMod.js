
/**
* resourceMod - modify health and mana for the amount the
* combat object states
*
* @param  {attacker} attacker
* @param  {attacker} target
* @param  {combatObject}
* @returns {void}
*/
export default function resourceMod (attacker = {}, target = {}, combatObject = {}) {
  if (combatObject.type() !== 'drink') return;

  if (target.rage) {
    const amount = combatObject.amount();
    const oldRage = target.rage.rage();
    const maxRage = target.CONST.MAX_RAGE;

    // check for overflow or underflow:
    if (oldRage - amount < 0) {
      target.rage.setRage(0);
    } else if (oldRage - amount > maxRage) {
      target.rage.setRage(maxRage);
    } else {
      target.rage.setRage(oldRage - amount);
    }
  } else if (target.mana) {
    const amount = combatObject.amount();
    const oldMana = target.mana.mana();
    const maxMana = target.mana.maxMana();

    // check for overflow or underflow:
    if (oldMana - amount < 0) {
      target.mana.setMana(0);
    } else if (oldMana - amount > maxMana) {
      target.mana.setMana(maxMana);
    } else {
      target.mana.setMana(oldMana - amount);
    }
  }

}
