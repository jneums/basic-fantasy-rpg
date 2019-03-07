/**
 * Savage Blow - A strong attack that increases weapon
 * damage by 11 and causes a hight amount (20 for lvl 1) of threat.
 *
 * level: 1
 *
 * requires: level 1
 *
 * @returns {void}
 */
export default function savageBlow() {
  const onNextAttack = this.combat.getOnNextAttack();
  // exit early if heroic strike is already to go
  if (onNextAttack === 'heroicStrike') return;

  const enoughRage = this.rage.rage() >= 15; // rage cost
  if (!enoughRage) return console.log("I need more rage");

  const newOnNextAttack = 'heroicStrike';
  this.combat.setOnNextAttack(newOnNextAttack)
}
