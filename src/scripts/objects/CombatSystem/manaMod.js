
/**
 * manaMod - modify health and mana for the amount the
 * combat object states
 *
 * @param  {attacker} attacker
 * @param  {attacker} target
 * @param  {combatObject}
 * @returns {void}
 */
 export default function manaMod (attacker = {}, target = {}, combatObject = {}) {
   if (!target.mana) return;
   if (combatObject.type() !== 'drink') return;
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
