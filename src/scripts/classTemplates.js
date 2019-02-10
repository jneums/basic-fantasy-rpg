import Character from './objects/Character';
import { getRandomIntInclusive, getRandomCoordsOnCanvas } from './randomNumberUtilities';
import selectDie from './dice';
import { getStatBonus } from './abilities';
import warriorAI from './AI/warriorAI';
import priestAI from './AI/priestAI';
import mageAI from './AI/mageAI';
import { getWeaponByName } from './items';
import { getPriestSpellByName } from './spellbooks/priestSpells';
import { getMageSpellByName } from './spellbooks/mageSpells';


/**
 *
 */
class Warrior extends Character {
  constructor(scene = {}, name = 'warrior') {
    super(scene)
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('warrior');
    this.setDodgeRating(0);
    this.setAgilityToDodgeRatio(20);
    this.setAgilityToCritRatio(20);

    // warriors get bonus to strength and stamina
    const baseStrength = this.getStrength();
    const warriorStrengthBonus = 3;
    this.setStrength(baseStrength + warriorStrengthBonus);

    const baseStamina = this.getStamina();
    const warriorStaminaBonus = 2;
    this.setStamina(baseStamina + warriorStaminaBonus);

    const weapon = getWeaponByName('great-axe');
    this.setRightHand(weapon);
    // fighters start with 1 d8 hit die
    const d8 = selectDie(8);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'stamina');
    const hp = d8(1) + bonus;
    this.setHp(hp);

    this.update = warriorAI();

  }
}


/**
 *
 */
class Mage extends Character {
  constructor(scene = {}, name = 'mage') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('mage');
    this.setDodgeRating(.032);
    this.setAgilityToDodgeRatio(19.444);

    const baseIntellect = this.getIntellect();
    const mageIntellectBonus = 3;
    this.setIntellect(baseIntellect + mageIntellectBonus);

    const baseSpirit = this.getSpirit();
    const mageSpiritBonus = 2;
    this.setSpirit(baseSpirit + mageSpiritBonus);

    const weapon = getWeaponByName('dagger');
    const spellbook = [getMageSpellByName('magic-missile')];
    this.setSpellbook(spellbook);
    const spellTimers = [{ name: 'magic-missile', time: 0 }]
    this.setSpellTimers(spellTimers);
    this.setRightHand(weapon);
    const d4 = selectDie(4);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'stamina');
    const hp = d4(1) + bonus;
    this.setHp(hp);

    this.update = mageAI();
  }
}


/**
 *
 */
class Priest extends Character {
  constructor(scene = {}, name = 'priest') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('priest');
    this.setDodgeRating(.03);
    this.setAgilityToDodgeRatio(20);

    const baseIntellect = this.getIntellect();
    const priestIntellectBonus = 2;
    this.setIntellect(baseIntellect + priestIntellectBonus);

    const baseSpirit = this.getSpirit();
    const priestSpiritBonus = 3;
    this.setSpirit(baseSpirit + priestSpiritBonus);

    const weapon = getWeaponByName('quarterstaff');
    const spellbook = [getPriestSpellByName('cure-light-wounds')];
    this.setSpellbook(spellbook);
    const spellTimers = [{ name: 'cure-light-wounds', time: 0 }]
    this.setSpellTimers(spellTimers);
    this.setRightHand(weapon);
    const d6 = selectDie(6);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'stamina');
    const hp = d6(1) + bonus;
    this.setHp(hp);

    this.update = priestAI();
  }
}



/**
 *
 */
class Rogue extends Character {
  constructor(scene = {}, name = 'rogue') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('rogue');
    this.setDodgeRating(0);
    this.setAgilityToDodgeRatio(14);
    this.setAgilityToCritRatio(29);

    const baseStrength = this.getStrength();
    const rogueStrengthBonus = 1;
    this.setStrength(baseStrength + rogueStrengthBonus);

    const baseAgility = this.getAgility();
    const rogueAgilityBonus = 3;
    this.setAgility(baseAgility + rogueAgilityBonus);

    const baseStamina = this.getStamina();
    const rogueStaminaBonus = 1;
    this.setStamina(baseStamina + rogueStaminaBonus);

    const weapon = getWeaponByName('dagger');
    this.setRightHand(weapon);
    this.setLeftHand(weapon);
    const d4 = selectDie(4);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'stamina');
    const hp = d4(1) + bonus;
    this.setHp(hp);

    this.update = warriorAI();
  }
}


export { Warrior, Mage, Priest, Rogue };
