import Character from './objects/character';
import { getRandomIntInclusive, getRandomCoordsOnCanvas } from './randomNumberUtilities';
import selectDie from './dice';
import { getStatBonus } from './abilities';
import fighterAI from './fighterAI';
import clericAI from './clericAI';
import { getWeaponByName } from './items';
import { getClericSpellByName } from './clericSpells';


/**
 *
 */
class Fighter extends Character {
  constructor(scene = {}, name = 'fighter') {
    super(scene)
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setJob('fighter');
    this.setStr(18);
    this.setDex(16);
    this.setCon(17);
    this.setInt(10);
    this.setWis(10);
    this.setCha(12);
    const weapon = getWeaponByName('great-axe');
    this.setRightHand(weapon);
    // fighters start with 1 d8 hit die
    const d8 = selectDie(8);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'con');
    const hp = d8(1) + bonus;
    this.setHp(hp);

    this.update = fighterAI();

  }
}


/**
 *
 */
class MagicUser extends Character {
  constructor(scene = {}, name = 'magicUser') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setJob('magic-user');
    this.setStr(10);
    this.setDex(10);
    this.setCon(12);
    this.setInt(18);
    this.setWis(16);
    this.setCha(12);
    const weapon = getWeaponByName('dagger');
    this.setRightHand(weapon);
    const d4 = selectDie(4);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'con');
    const hp = d4(1) + bonus;
    this.setHp(hp);

    this.update = fighterAI();
  }
}


/**
 *
 */
class Cleric extends Character {
  constructor(scene = {}, name = 'cleric') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setJob('cleric');
    this.setStr(12);
    this.setDex(12);
    this.setCon(14);
    this.setInt(16);
    this.setWis(16);
    this.setCha(12);
    const weapon = getWeaponByName('hand-axe');
    const spellbook = [getClericSpellByName('cure-light-wounds')];
    this.setSpellbook(spellbook);
    this.setRightHand(weapon);
    const d6 = selectDie(6);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'con');
    const hp = d6(1) + bonus;
    this.setHp(hp);

    this.update = clericAI();
  }
}



/**
 *
 */
class Thief extends Character {
  constructor(scene = {}, name = 'thief') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setJob('thief');
    this.setStr(15);
    this.setDex(18);
    this.setCon(14);
    this.setInt(12);
    this.setWis(11);
    this.setCha(14);
    const weapon = getWeaponByName('dagger');
    this.setRightHand(weapon);
    const d4 = selectDie(4);
    // get con bonus to add to hp
    const bonus = getStatBonus(this, 'con');
    const hp = d4(1) + bonus;
    this.setHp(hp);

    this.update = fighterAI();
  }
}


export { Fighter, MagicUser, Cleric, Thief };
