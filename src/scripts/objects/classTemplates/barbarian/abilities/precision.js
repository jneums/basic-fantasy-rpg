import abilityRequirements from '../../abilityRequirements';
import CONST from '../../../Managers/Const';


/**
 * Precision - carefully aim your next strike.
 * Deals increased damage.
 *
 * level: 1
 *
 * requires: level 1
 *
 * @returns {void}
 */
export default function precision() {

  // pre ability requirements:
  const config = {
    beneficial: false,
    resourceAmount: 0,
    resource: 'rage',
    range: CONST.MELEE_RANGE,
    needsTarget: true
  }

  if(!abilityRequirements(this, config)) return;

  if (this.buffs.has('precision')) return;

  this.buffs.add({
    name: 'precision',
    duration: 10 * 60, //3 seconds
    attacker: this
  });
}
