/**
 * calculateDodgeChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand attacking with
 * @returns {number} dodge chance
 */
function calculateDodgeChance(attacker = {}, target = {}, hand = '') {
  const targetBaseDodge = target.stat.getDodgeRating();
  const targetAgility = target.stat.getAgility();
  const targetEquippedAgi = target.equipment.getStatFromEquipped('agility');
  const targetAgiToDodgeRatio = target.stat.getAgilityToDodgeRatio();
  const targetDodgeFromAgi = (targetAgility + targetEquippedAgi) / targetAgiToDodgeRatio * .01
  const targetTalentDodgeBonus = target.stat.getStatFromTalents();
  const targetRaceBonus = target.stat.getStatFromRace();
  const targetDefenseSkill = target.stat.getDefenseRating();

  // mitigated by attacker weapon skill
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);

  const dodgeChance =
    (targetBaseDodge + targetDodgeFromAgi
      + targetTalentDodgeBonus + targetRaceBonus
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
  const targetParryRating = target.stat.getParryRating();
  const targetParryTalents = attacker.stat.getStatFromTalents();
  const targetDefenseRating = target.stat.getDefenseRating();
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);
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
  const targetOffHandType = target.equipment.getEquipped().offHand.type;
  if (targetOffHandType !== 'shield') return 0;
  // amount blocked determined by blockValue
  // worsened by targets blockRating, defense
  const targetDefenseRating = target.stat.getDefenseRating();
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);

  const targetBlockRating = target.stat.getBlockRating();
  const targetBlockRatingTalents = target.stat.getStatFromTalents();
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
  const attackerCritChance = attacker.stat.getCriticalChance();
  const attackerAgility = attacker.stat.getAgility();
  const attackerAgiFromItems = attacker.equipment.getStatFromEquipped('agility');
  const attackerAgiCritRatio = attacker.stat.getAgilityToCritRatio();
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
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);
  // mitigated by attacker hit rating
  const attackerHitRating = attacker.stat.getHitChance();
  // worsened by target defense rating
  const targetDefenseRating = target.stat.getDefenseRating();
  const base = (attacker.equipment.isDualWielding()) ? .24 : .05;
  let missChance = 0;
  if (targetDefenseRating - attackerWeaponSkill <= 10) {
    missChance = base + (targetDefenseRating - attackerWeaponSkill) * .001;
  } else {
    // base should be .06 here
    missChance = base + (targetDefenseRating - attackerWeaponSkill - 10) * .004;
  }

  return missChance;
}

export {
  calculateDodgeChance,
  calculateParryChance,
  calculateBlockChance,
  calculateCritChance,
  calculateMissChance
};
