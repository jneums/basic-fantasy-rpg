/**
 * Arcane Intellect -
 *
 * level: 1
 *
 * requires: level 1
 *
 * @returns {void}
 */
export default function arcaneIntellect() {
  const target = this.target.currentTarget();
  const manaCost = 60;
  const range = 300;
  // create a buff object.
  // range check
  if (!this.target.rangeCheck(target, range)) return console.log('I have to get closer')
  const buff = {
    name: 'arcaneIntellect',
    duration: 1800 * 60,
    statObject: {
      intellect: 2
    }
  }
  // is target friendly:
  if (target.team() === this.team()) {
    // increases the target's Intellect by 2 for 30 min.
    if (this.mana.spendMana(manaCost)) {
      if (target.buffs.has('arcaneIntellect'))
        target.buffs.replace(buff);
      else
        target.buffs.add(buff);
    }
  }
}
