import abilityRequirements from '../../abilityRequirements';


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

  // pre ability requirements:
  const config = {
    beneficial: true,
    resourceAmount: 60,
    resource: 'mana',
    range: this.CONST.CAST_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const target = this.target.currentTarget();

  const buff = {
    name: 'arcaneIntellect',
    duration: 1800 * 60,
    statObject: {
      intellect: 2
    }
  }

  if (target.buffs.has('arcaneIntellect'))
    target.buffs.replace(buff);
  else
    target.buffs.add(buff);


}
