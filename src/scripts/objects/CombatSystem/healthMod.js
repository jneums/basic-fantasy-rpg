
/**
 * healthMod - modify health and mana for the amount the
 * combat object states
 *
 * @param  {attacker} attacker
 * @param  {attacker} target
 * @param  {combatObject}
 * @returns {void}
 */
 export default function healthMod (attacker = {}, target = {}, combatObject = {}) {
   if (combatObject.type() === 'drink') return;
   if (!target.stat) return;
  const amount = combatObject.amount();
  const oldHp = target.stat.hp();
  const maxHp = target.stat.maxHp();

  // check for overflow or underflow:
  if (oldHp - amount < 0) {
    target.stat.setHp(0);
  } else if (oldHp - amount > maxHp) {
    target.stat.setHp(maxHp);
  } else {
    target.stat.setHp(oldHp - amount);
  }
}
