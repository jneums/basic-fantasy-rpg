import abilityRequirements from '../../abilityRequirements';
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

  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 15,
    resource: 'rage',
    range: 25,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const onNextAttack = this.combat.getOnNextAttack();
  // exit early if heroic strike is already to go
  if (onNextAttack === 'heroicStrike') return;

  const newOnNextAttack = 'heroicStrike';
  this.combat.setOnNextAttack(newOnNextAttack)
}
