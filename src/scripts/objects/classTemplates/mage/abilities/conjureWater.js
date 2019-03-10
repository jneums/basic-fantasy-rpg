/**
 * Conjure Water - Conjures 2 bottle of water, providing
 * the mage and his allies with something to drink.
 *
 * level: 1
 *
 * requires: level 4
 *
 * @returns {void}
 */
 export default function conjureWater () {
  this.timer.setCastTimer(0);
  const castTime = 3 * 60; //seconds
  const manaCost = 60;
  if (this.mana.mana() - manaCost > 0) {
    const cast = {
      name: 'Conjure Water',
      castTime,
      cast: () => {
        this.mana.spendMana(manaCost);
        this.inventory.add(getConsumableByName("Conjured Water"))
      }
    }
    this.timer.setSpell(cast);
  }
}
