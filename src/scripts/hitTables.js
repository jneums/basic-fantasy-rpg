import { selectDie } from './dice';
/**
 * getCurrentWeaponSkill
 *
 * @param  {Character} character to check
 * @param  {string} hand to check
 * @returns {number} weapon skill
 */
function getCurrentWeaponSkill(character = {}, hand = '') {
  const mainHandType = character.getEquipped().mainHand.type;
  const offHandType = character.getEquipped().offHand.type;
  const weaponType = (hand === 'main')
    ? mainHandType
    : offHandType;

  return character.getWeaponSkills()[weaponType];
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

function getStatFromEquippedItems(character = {}, stat = '') {
  return 0;
}

function getStatFromTalents(character = {}) {
  return 0;
}

function getStatFromRaceBonus(character = {}) {
  return 0;
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
  const targetEquippedAgi = getStatFromEquippedItems(target, 'agility');
  const targetAgiToDodgeRatio = target.getAgilityToDodgeRatio();
  const targetDodgeFromAgi = (targetAgility + targetEquippedAgi) / targetAgiToDodgeRatio * .01
  const targetTalentDodgeBonus = getStatFromTalents(target);
  const targetRaceBonus = getStatFromRaceBonus(target);
  const targetMiscContributions = getStatFromEquippedItems(target);
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
  const attackerAgiFromItems = getStatFromEquippedItems(attacker, 'agility')
  const attackerAgiCritRatio = attacker.getAgilityToCritRatio();
  const attackerCritFromAgi = (attackerAgility + attackerAgiFromItems) / attackerAgiCritRatio * .01;
  if (attackerAgiCritRatio) return attackerCritChance  + attackerCritFromAgi;
  else return attackerCritChance;
}

export default function meleeAutoAttackHitTable(attacker = {}, target = {}, hand ='') {
  const d100 = selectDie(100);
  const random = d100(1) * .01;
  const missChance = calculateMissChance(attacker, target, hand);
  const dodgeChance = missChance + calculateDodgeChance(attacker, target, hand);
  const parryChance = dodgeChance + calculateParryChance(attacker, target, hand);

  // only for players attacking mobs
  // only deal 70% of dmg
  // default non boss is 5%
  const glancingBlowChance = parryChance + .05;
  const blockChance = glancingBlowChance + calculateBlockChance(attacker, target, hand);

  const criticalHitChance = blockChance + calculateCritChance(attacker);

  // only for mobs attacking players
  // const crushingBlowChance;
  switch(true) {
    case (random < missChance):
      return 'miss';
    case (random < dodgeChance):
      return 'dodge';
    case (random < parryChance):
      return 'parry';
    case (random < glancingBlowChance):
      return 'glancing';
    case (random < blockChance):
      return 'blocked';
    case (random < criticalHitChance):
      return 'crit';
    default:
      return 'hit';
  }
}
