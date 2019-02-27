
/**
 * processHealth - modify health and mana for the amount the
 * combat object states
 *
 * @param  {Character} character
 * @param  {object} combatObject
 * @returns {void}
 */
 export default function processHealth (character = {}, target = {}, combatObject = {} ) {
  const amount = combatObject.amount;
  // dont try and restore mana if character doesnt use it
  if (combatObject.type === 'drink' && target.mana) {
    const oldMana = target.mana.mana();
    const maxMana = target.mana.maxMana();
    // make sure there are no overflows
    if (oldMana - amount > maxMana) {
      target.mana.setMana(maxMana);
    } else {
      target.mana.setMana(oldMana - amount);
    }
  } else {
    const oldHp = target.stat.hp();
    const maxHp = target.stat.maxHp();
    if (oldHp - amount < 0) {
      // target died
      target.animations.die();
      target.stat.setHp(0);
      character.target.setCurrentTarget(undefined);
    } else if (oldHp - amount > maxHp) {
      target.stat.setHp(maxHp);
    } else {
      target.stat.setHp(oldHp - amount);
    }
  }
}
