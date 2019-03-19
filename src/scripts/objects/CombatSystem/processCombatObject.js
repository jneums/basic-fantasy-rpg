import statusMod from './statusMod';
import classMod from './classMod';
import textMod from './textMod';
import logMod from './logMod';
import threatMod from './threatMod';
import healthMod from './healthMod';
import manaMod from './manaMod';
import playAnims from './playAnims';
/**
 * processCombatObject - take dmg, add to log, add rage,
 * modify threat table, create scrolling text, etc.
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @returns {void}
 */
export default function processCombatObject (attacker = {}, target = {}) {
  // if target is not already tapped,
  target.setTapped(attacker);

  // update combat object based on status e.g. mitigation, resistances:
  statusMod(attacker, target, this);
  // give combatants a chance to modify the combat object
  classMod(attacker, target, this);

  // now that updates to object are done, use final object to
  // modify the characters:
  playAnims(attacker, target, this);
  textMod(attacker, target, this);

  // add object to the combat logs
  logMod(attacker, target, this);

  // update threat table
  threatMod(attacker, target, this);

  // take dmg according to the final combat object
  healthMod(attacker, target, this);

  manaMod(attacker, target, this);

}
