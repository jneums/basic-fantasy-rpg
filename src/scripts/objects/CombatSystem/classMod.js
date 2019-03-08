import attackerClassUpdate from './attackerClassUpdate';
import targetClassUpdate from './targetClassUpdate';

/**
 * classMod - calls update methods for both the attacker
 * and for the target.
 *
 * @param  {Character}      attacker
 * @param  {Character}      target
 * @param  {CombatObject}   combatObject
 * @return {void}
 */
export default function classMod (attacker = {}, target = {}, combatObject = {}) {
  attackerClassUpdate(attacker, combatObject);
  targetClassUpdate(target, combatObject);
}
