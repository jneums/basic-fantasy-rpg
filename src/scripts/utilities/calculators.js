/**
 * calculateDodgeChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand attacking with
 * @returns {number} dodge chance
 */
function calculateDodgeChance(attacker = {}, target = {}, hand = '') {
  const totalDodge = target.stat.dodge();
  const defenseSkill = target.stat.baseDef();
  // mitigated by attacker weapon skill
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);

  const dodgeChance =
    (totalDodge + ((defenseSkill - attackerWeaponSkill) * .04));
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
  const tarbaseParry = target.stat.baseParry();
  const targetParryTalents = attacker.stat.statFromTalents();
  const tarbaseDef = target.stat.baseDef();
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);
  return .05 + tarbaseParry + targetParryTalents + ((tarbaseDef - attackerWeaponSkill) * .04);
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
  // cant block without Shield
  const targetOffHandType = target.equipment.getEquipped().offHand.type;
  if (targetOffHandType !== 'shield') return 0;
  // amount blocked determined by blockValue
  // worsened by targets blockRating, defense
  const tarbaseDef = target.stat.baseDef();
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);

  const tarbaseBlockR = target.stat.baseBlockR();
  const tarbaseBlockRTalents = target.stat.statFromTalents('block');
  const base = .05;
  const blockChance = (base + tarbaseBlockR + tarbaseBlockRTalents
    + ((tarbaseDef - attackerWeaponSkill) * .04));
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
  const critChance = attacker.stat.crit();
  const totalAgility = attacker.stat.agility();
  const agiCritRatio = attacker.stat.agiCritR();
  if (agiCritRatio) return critChance;
  const total = (totalAgility / agiCritRatio) * .01;
  return total;
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
  const attackerHitRating = attacker.stat.baseHit();
  // worsened by target defense rating
  const tarbaseDef = target.stat.baseDef();
  const base = (attacker.equipment.isDualWielding()) ? .24 : .05;
  let missChance = 0;
  if (tarbaseDef - attackerWeaponSkill <= 10) {
    missChance = base + (tarbaseDef - attackerWeaponSkill) * .001;
  } else {
    // base should be .06 here
    missChance = base + (tarbaseDef - attackerWeaponSkill - 10) * .004;
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
