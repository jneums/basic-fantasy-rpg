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
    range: this.CONST.MELEE_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const onNextAttack = this.combat.getOnNextAttack();
  // exit early if heroic strike is already to go
  if (onNextAttack === 'savageBlow') return;

  const newOnNextAttack = 'savageBlow';
  this.combat.setOnNextAttack(newOnNextAttack)
}
