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
 * checkForTwoHandWeapon
 *
 * @param  {Character} character to check
 * @returns {bool} true if using 2h
 */
function checkForTwoHandWeapon(character = {}) {
  const weaponSlot = character.getEquipped().mainHand.slot;
  return weaponSlot === 'two-hand';
}

export {
  getCurrentWeaponSkill,
  getWeaponDmg,
  getWeaponSpeed,
  checkForTwoHandWeapon
 };
