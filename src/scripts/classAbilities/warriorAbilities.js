


/**
 * heroicStrike - A strong attack that increases weapon
 * damage by 11 and causes a hight amount of threat.
 *
 * @param  {Warrior} attacker warrior
 * @param  {Character} target
 * @returns {void}
 */
function heroicStrike(attacker = {}, target = {}) {
  // find out rage cost
  const rageCost = 15;
  const oldRage = attacker.getRage();
  const enoughRage = oldRage > rageCost;
  if (!enoughRage) return console.log("not enough rage");
  const newOnNextAttack = { name: 'heroicStrike', value: 11 };
  attacker.setOnNextAttack(newOnNextAttack)
  const newRage = oldRage - rageCost;
  attacker.setRage(newRage)

  // hit table for yellow dmg
  // if parried or dodged, takes no rage
  // if hits or is blocked, takes rage
  // TODO: hit table needs cleaned up,
  // utilities moved out of it.
  // create combatObject
  // process combatObject
}

export { heroicStrike };
