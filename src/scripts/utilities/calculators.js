import { getCurrentWeaponSkill } from './weaponUtilities';
import { getStatFromEquipped, getStatFromTalents, getStatFromRace } from './statUtilities';

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
  const armorFromItems = getStatFromEquipped(target, 'armor');
  const attackerLevel = attacker.getLevel();
  const dmgMitigated = armor / (armor + 400 + 85 * attackerLevel);
  return dmgMitigated;
}



/**
 * calculateDodgeChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand attacking with
 * @returns {number} dodge chance
 */
function calculateDodgeChance(attacker = {}, target = {}, hand = '') {
  const targetBaseDodge = target.getDodgeRating();
  const targetAgility = target.getAgility();
  const targetEquippedAgi = getStatFromEquipped(target, 'agility');
  const targetAgiToDodgeRatio = target.getAgilityToDodgeRatio();
  const targetDodgeFromAgi = (targetAgility + targetEquippedAgi) / targetAgiToDodgeRatio * .01
  const targetTalentDodgeBonus = getStatFromTalents(target);
  const targetRaceBonus = getStatFromRace(target);
  const targetMiscContributions = getStatFromEquipped(target);
  const targetDefenseSkill = target.getDefenseRating();

  // mitigated by attacker weapon skill
  const attackerWeaponSkill = getCurrentWeaponSkill(attacker, hand);

  const dodgeChance =
    (targetBaseDodge + targetDodgeFromAgi
      + targetTalentDodgeBonus + targetRaceBonus + targetMiscContributions
      + ((targetDefenseSkill - attackerWeaponSkill) * .04));
  return dodgeChance;
}


/**
 * calculateParryChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand attacking with
 * @returns {number} parry chance
 */
function calculateParryChance(attacker = {}, target = {}, hand = '') {
  const characterClass = target.getCharacterClass();
  switch(characterClass) {
    case 'druid':
    case 'mage':
    case 'priest':
    case 'shaman':
    case 'warlock':
      return 0;
  }
  const targetParryRating = target.getParryRating();
  const targetParryTalents = getStatFromTalents(attacker);
  const targetDefenseRating = target.getDefenseRating();
  const attackerWeaponSkill = getCurrentWeaponSkill(attacker, hand);
  return .05 + targetParryRating + targetParryTalents + ((targetDefenseRating - attackerWeaponSkill) * .04);
}


/**
 * calculateBlockChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand
 * @returns {number}
 */
function calculateBlockChance(attacker = {}, target = {}, hand = '') {
  // cant block from behind
  // cant attack without Shield
  const targetOffHandType = target.getEquipped().offHand.type;
  if (targetOffHandType !== 'shield') return 0;
  // amount blocked determined by blockValue
  // worsened by targets blockRating, defense
  const targetDefenseRating = target.getDefenseRating();
  const attackerWeaponSkill = getCurrentWeaponSkill(attacker, hand);

  const targetBlockRating = target.getBlockRating();
  const targetBlockRatingTalents = getStatFromTalents(target);
  const base = .05;
  const blockChance = (base + targetBlockRating + targetBlockRatingTalents
    + ((targetDefenseRating - attackerWeaponSkill) * .04));
  return blockChance;
}


/**
 * calculateCritChance
 *
 * @param  {Character} attacker
 * @returns {number} crit chance
 */
function calculateCritChance(attacker = {}) {
  // characters crit chance
  const attackerCritChance = attacker.getCriticalChance();
  const attackerAgility = attacker.getAgility();
  const attackerAgiFromItems = getStatFromEquipped(attacker, 'agility')
  const attackerAgiCritRatio = attacker.getAgilityToCritRatio();
  const attackerCritFromAgi = (attackerAgility + attackerAgiFromItems) / attackerAgiCritRatio * .01;
  if (attackerAgiCritRatio) return attackerCritChance  + attackerCritFromAgi;
  else return attackerCritChance;
}

/**
 * calculateMissChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @returns {number} miss chance
 */
function calculateMissChance(attacker = {}, target = {}, hand = '') {
  // based on weapon skill
  const attackerWeaponSkill = getCurrentWeaponSkill(attacker, hand);
  // mitigated by attacker hit rating
  const attackerHitRating = attacker.getHitChance();
  // worsened by target defense rating
  const targetDefenseRating = target.getDefenseRating();

  let missChance = 0;
  if (targetDefenseRating - attackerWeaponSkill <= 10) {
    missChance = .05 + (targetDefenseRating - attackerWeaponSkill) * .001;
  } else {
    missChance = .06 + (targetDefenseRating - attackerWeaponSkill - 10) * .004;
  }
  return missChance;
}

export {
  armorMitigationPercent,
  calculateDodgeChance,
  calculateParryChance,
  calculateBlockChance,
  calculateCritChance,
  calculateMissChance
};
