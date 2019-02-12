import { getRandomIntInclusive } from './randomNumberUtilities';
import { selectDie } from './dice';
import {
  resetSpellTimer,
  resetSwingTimer,
  checkSwingTimer,
  checkForTwoHandWeapon
} from './utilities';
import meleeAutoAttackHitTable from './hitTables';

/**
 * getWeaponDmg - amount used in determining dmg
 * update with correct weapon values
 *
 * @param  {Character} attacker
 * @param  {string} hand attacking with
 * @returns {object} dmg object: { min: 1, max: 2 }
 */
function getWeaponDmg(attacker = {}, hand = '') {
  const mainHandWpnDmg = attacker.getEquipped().mainHand.damage;
  const offHandWpnDmg= attacker.getEquipped().offHand.damage;
  const weaponDamage = (hand === 'main')
    ? mainHandWpnDmg
    : offHandWpnDmg;
  return weaponDamage;
}

/**
 * getWeaponSpeed
 *
 * @param  {Character} attacker
 * @param  {string} hand weapon is in
 * @returns {number}
 */
function getWeaponSpeed(attacker = {}, hand = '') {
  const mainHandSpeed = attacker.getEquipped().mainHand.speed;
  const offHandSpeed = attacker.getEquipped().offHand.speed;
  const weaponSpeed = (hand === 'main')
    ? mainHandSpeed
    : offHandSpeed;
  return weaponSpeed;
}

/**
 * getAttackStatus - query hit table and return status
 *
 * @param  {Character} attacker used to determine buffs
 * @param  {Character} target used to determine mitigation
 * @param  {string} hand attacker is using
 * @returns {string} attack result e.g. 'hit'
 */
function getAttackStatus(attacker = {}, target = {}, hand = '') {
  const attackStatus = (hand === 'main')
    ? meleeAutoAttackHitTable(attacker, target, 'main')
    : meleeAutoAttackHitTable(attacker, target, 'off');
  return attackStatus;
}

/**
 * buildMeleeCombatObject - contains info about attack
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} status e.g. 'hit', 'miss', 'crit'
 * @param  {string} type e.g. 'melee', 'ranged'
 * @param  {number} damageAmount
 * @param  {number} mitigationAmount
 * @param  {string} hand
 * @param  {number} time
 * @returns {object}
 * {attacker: "monstrum", target: "leslie", status: "hit",
 *  type: "melee", damageType: "physical", …}
 */
function buildMeleeCombatObject(attacker = {}, target = {}, status = '', type = '', damageAmount = 0, hand = '') {
  // destructure
  let result = {
    attacker: attacker.getName(),
    target: target.getName(),
    status: status,
    type: type,
    damageType: 'physical',
    damageAmount: damageAmount,
    mitigationAmount: 0,
    hand: hand,
    time: Date.now()  // add time from Phaser?
  }
  const mitigatedByArmor = damageAmount * armorMitigationPercent(attacker, target);
  const blockValue = target.getBlockValue();
  switch(status) {
    case 'miss':
      result.status = 'miss';
      result.mitigationAmount = damageAmount;
      return result;
    case 'dodge':
      result.status = 'dodge';
      result.mitigationAmount = damageAmount;
      return result;
    case 'parry':
      result.status = 'parry';
      result.mitigationAmount = damageAmount;
      return result;
    case 'glancing':
      result.status = 'glancing';
      result.mitigationAmount = damageAmount * .3;
      result.damageAmount = damageAmount * .7;
      return result;
    case 'blocked':
      result.status = 'blocked';
      result.mitigationAmount = blockValue; // get block from stats/items/talents as well!
      result.damageAmount = damageAmount - blockValue;
      return result;
    case 'crit':
      result.status = 'crit';
      result.damageAmount = (damageAmount * 2) - mitigatedByArmor;
      result.mitigationAmount = mitigatedByArmor;
      return result;
    case 'hit':
      result.status = 'hit';
      result.damageAmount = damageAmount - mitigatedByArmor;
      result.mitigationAmount = mitigatedByArmor;
      return result;
  }
}

/**
 * pushCombatObjectToLog
 *
 * @param  {Character} character
 * @param  {object} combatObject
 * @returns {array} new combat log
 */
function pushCombatObjectToLog(character = {}, combatObject = {}) {
  // add object to combat log
  const oldCombatLog = character.getCombatLog();
  const newCombatLog = oldCombatLog.splice([]).concat([combatObject]);
  character.setCombatLog(newCombatLog);
  return newCombatLog;
}

/**
 * totalStatFromEquipped - equipped
 *
 * @param  {Character} character
 * @param  {string} stat e.g. 'armor', 'stamina', etc...
 * @returns {number} total of stat equipped
 */
function totalStatFromEquipped(character = {}, stat = '') {
  let total = 0;
  const equipped = character.getEquipped();
  for (let item in equipped) {
    if (equipped[item][stat]) {
      total += equipped[item][stat];
    }
  }
  return total;
}

/**
 * armorMitigationPercent
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @returns {number} % mitigated
 */
function armorMitigationPercent(attacker = {}, target = {}) {
  // get base armor, armor from items, talents etc.
  const armor = target.getArmorRating();
  // everyone gets 2 armor per agi
  const armorFromAgility = target.getAgility() * 2;
  const armorFromItems = totalStatFromEquipped(target, 'armor');
  const attackerLevel = attacker.getLevel();
  const dmgMitigated = armor / (armor + 400 + 85 * attackerLevel);
  return dmgMitigated;
}

/**
 * processDamageFromCombatObject
 *
 * @param  {Character} character
 * @param  {object} combatObject
 * @returns {void}
 */
function processDamageFromCombatObject(attacker = {}, target = {}, combatObject = {} ) {
  const damage = combatObject.damageAmount;
  const oldHp = target.getHp();
  const newHp = oldHp - damage;
  target.setHp(newHp);
  console.log(`${target.getName()} took ${damage} dmg, has ${newHp} hp left`)
}

/**
 * processCombatObject - take dmg,to log, add rage, etc.
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {object} combatObject
 * @returns {void}
 */
function processCombatObject(attacker = {}, target = {}, combatObject = {}) {
  let newCombatObject = Object.assign({}, combatObject);
  // perform changes on attacker
  newCombatObject = attackerClassUpdate(attacker, newCombatObject);
  newCombatObject = targetClassUpdate(target, newCombatObject);
  // perform changes on target
  pushCombatObjectToLog(attacker, newCombatObject);
  pushCombatObjectToLog(target, newCombatObject);
  processDamageFromCombatObject(attacker, target, newCombatObject);
}

/**
 * calculateHitFactor - used for rage calculation
 *
 * @param  {object} combatObject info about attack
 * @returns {number} used in rage formula
 */
function calculateHitFactor(combatObject = {}) {
  let hitFactor = 0;
  const hand = combatObject.hand;
  const type = combatObject.type;
  if (hand === 'main') {
    if( type === 'hit') {
      hitFactor = 3.5;
    } else if (type === 'crit') {
      hitFactor = 7;
    }
  } else if (hand === 'off') {
    if (type === 'hit') {
      hitFactor = 1.75;
    } else if (type === 'crit') {
      hitFactor = 3.5;
    }
  }
  return hitFactor;
}

/**
 * processRage - update players rage
 *
 * @param  {Character} character to update rage on
 * @param  {object} combatObject info about attack
 * @param  {string} role attacker or target
 * @returns {void}
 */
function processRage(character = {}, combatObject = {}, role = '') {
  let rageGain = 0;
  const oldRage = character.getRage();
  const level = character.getLevel();
  const rageConversion = 0.0091107836 * (level * level) + (3.225598133 * level) + 4.2652911;
  const dmgAmt = combatObject.damageAmount;
  const hand = combatObject.hand;
  const weaponSpeed = (hand === 'main')
    ? getWeaponSpeed(character, 'main')
    : getWeaponSpeed(character, 'off');
  const hitFactor = calculateHitFactor(combatObject);

  if (role === 'attacker') {
    // only for white dmg and 'special' attacks
    rageGain = (15 * dmgAmt)/ (4 * rageConversion ) + ((hitFactor * weaponSpeed) / 2);
    const maxRageGain = (15 * dmgAmt) / rageConversion;
    if (rageGain > maxRageGain) rageGain = maxRageGain;
    character.setRage(rageGain + oldRage);
  } else if (role === 'target') {
    rageGain = (5/2) * (dmgAmt / rageConversion);
    character.setRage(rageGain + oldRage);
  }
}

/**
 * attackerClassUpdate - specific reactions for causing dmg
 *
 * @param  {Character} attacker
 * @param  {object} combatObject info about attack
 * @returns {object} modified combatObject
 */
function attackerClassUpdate(attacker = {}, newCombatObject = {}) {
  const attackerClass = attacker.getCharacterClass();
  switch(attackerClass) {
    case 'warrior':
      const onNextAttack = attacker.getOnNextAttack();
      if (onNextAttack.name === 'heroicStrike') {
        newCombatObject.damageAmount += onNextAttack.value;
        const newOnNextAttack = {};
        attacker.setOnNextAttack(newOnNextAttack);
        return newCombatObject;
      } else if (!onNextAttack.name){
        processRage(attacker, newCombatObject, 'attacker');
        return newCombatObject;
      }
    default:
      return newCombatObject;
  }
}

/**
 * targetClassUpdate - specific reactions for taking dmg
 *
 * @param  {Character} target
 * @param  {object} combatObject info about attack
 * @returns {void}
 */
function targetClassUpdate(target = {}, newCombatObject = {}) {
  const targetClass = target.getCharacterClass();
  switch(targetClass) {
    case 'warrior':
      processRage(target, newCombatObject, 'target');
      return newCombatObject;
    default:
      return newCombatObject;
  }
}

/**
 * getAPFromStr - combat helper
 *
 * @param  {Character} character attacker
 * @returns {number} class specific
 */
function getAPFromStr(character = {}) {
  const strength = character.getStrength();
  // add str bonus from talents, items, buffs
  const strFromEquipped = totalStatFromEquipped(character, 'strength');
  const totalStr = strength + strFromEquipped;
  const strToAPR
    = character.getStrengthToAttackPowerRatio();
  const apFromStr = (strToAPR) ? totalStr / strToAPR : 0;
  return apFromStr;
}

/**
 * getAPFromAgi - combat helper
 *
 * @param  {Character} character attacker
 * @returns {number} class specific
 */
function getAPFromAgi(character = {}) {
  const agility = character.getAgility();
  // add agi bonus from talents, items, buffs
  const agiFromEquipped = totalStatFromEquipped(character, 'agility');
  const totalAgi = agility + agiFromEquipped;
  const agiToAPR
    = character.getAgilityToAttackPowerRatio();
  const apFromAgi = (agiToAPR) ? totalAgi / agiToAPR : 0;
  return apFromAgi;
}

/**
 * getAttackPowerBonus
 *
 * @param  {Character} attacker
 * @param  {string} hand for weaponSpeed
 * @returns {number} bonus damage
 */
function getAttackPowerBonus(attacker = {}, hand = '') {
  // base stats
  const apFromStr = getAPFromStr(attacker);
  const apFromAgi = getAPFromAgi(attacker);
  const apFromEquipped = totalStatFromEquipped(attacker, 'attackPower');
  // add ap bonus from talents, items, buffs
  const attackPower =  apFromStr + apFromAgi + apFromEquipped;
  // 14ap / 1dps
  const dpsIncrease = attackPower / 14;
  const attackPowerBonus = getWeaponSpeed(attacker, hand) * dpsIncrease;
  return attackPowerBonus;
}

/**
 * meleeAttack
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand left or right
 * @returns {object} damage information
 */
function meleeAttack(attacker = {}, target = {}, hand = '', type = '') {
  resetSwingTimer(attacker, hand);
  const weaponsDamageRange = getWeaponDmg(attacker, hand);
  const attackStatus = getAttackStatus(attacker, target, hand);
  const weaponDmg = getRandomIntInclusive(weaponsDamageRange.min, weaponsDamageRange.max);
  // find dmg algorithm
  const damageAmount = weaponDmg + getAttackPowerBonus(attacker, hand);
  const targetStartingHp = target.getHp();
  const combatObject = buildMeleeCombatObject(
    attacker,
    target,
    attackStatus,
    'melee',
    damageAmount,
    hand
  );
  processCombatObject(attacker, target, combatObject);
  return combatObject;
}

/**
 * meleeAutoAttack - checks each hand swing timer,
 * checks to see if two handed weapon is being used.
 *
 * @param  {Character} character attacking
 * @returns {void} wrapper for meleeAtack
 */
function meleeAutoAttack(attacker = {}, target = {}) {
  const canAttackWithMainHand = checkSwingTimer(attacker, 'main');
  if (canAttackWithMainHand) meleeAttack(attacker, target, 'main', 'autoAttack');
  const canAttackWithOffHand = checkSwingTimer(attacker, 'off');
  const usingTwoHandWeapon = checkForTwoHandWeapon(attacker);
  // if (canAttackWithLeftHand && !usingTwoHandWeapon) meleeAttack(attacker, target, 'off', 'autoAttack');
}

export {
  meleeAttack,
  meleeAutoAttack
};
