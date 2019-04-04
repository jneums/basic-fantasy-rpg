import abilityRequirements from '../../abilityRequirements';
import CONST from '../../../Managers/Const';


/**
 * Arcane Intellect -
 *
 * level: 1
 *
 * requires: level 1
 *
 * @returns {void}
 */
export default function focus() {

  // pre ability requirements:
  const config = {
    beneficial: true,
    resourceAmount: 60,
    resource: 'mana',
    range: CONST.CAST_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  const target = this.target.currentTarget();

  const buff = {
    name: 'focus',
    duration: 1800 * 60,
    statObject: {
      intellect: 2
    }
  }

  if (target.buffs.has('focus'))
    target.buffs.replace(buff);
  else
    target.buffs.add(buff);


}
