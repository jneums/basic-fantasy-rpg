import abilityRequirements from '../../abilityRequirements';

/**
 * Conjure Water - Conjures 2 bottle of Water, providing
 * the mage and his allies with something to eat.
 *
 * level: 1
 *
 * requires: level 4
 *
 * @returns {void}
 */
export default function conjureWater() {
  // pre ability requirements:
  const config = {
    beneficial: true,
    resourceAmount: 60,
    resource: 'mana',
    range: 25,
    needsTarget: false
  }

  if(!abilityRequirements(this, config)) return;

  const castTime = 3 * 60; //seconds * frames

  const cast = {
    name: 'Conjure Water',
    castTime,
    cast: () => {
      this.inventory.add(getConsumableByName("Conjured Water"))
    }
  }
  this.timer.setSpell(cast);

}
