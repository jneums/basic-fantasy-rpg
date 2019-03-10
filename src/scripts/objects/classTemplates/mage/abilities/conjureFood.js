
/**
 * Conjure Food - Conjures 2 bottle of food, providing
 * the mage and his allies with something to eat.
 *
 * level: 1
 *
 * requires: level 4
 *
 * @returns {void}
 */
export default function conjureFood() {
  const castTime = 3 * 60; //seconds * frames
  const manaCost = 60;
  if (this.mana.mana() - manaCost > 0) {
    const cast = {
      name: 'Conjure Food',
      castTime,
      cast: () => {
        this.mana.spendMana(manaCost);
        this.inventory.add(getConsumableByName("Conjured Food"))
      }
    }
    this.timer.setSpell(cast);
  }
}
