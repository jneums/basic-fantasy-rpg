import Character from './objects/character';
import getRandomIntInclusive from './getRandomIntInclusive';

function fighter(context) {
  const fighter = new Character(context);
  fighter.setJob('fighter');
  fighter.setStr(18)
    .setDex(16)
    .setCon(17)
    .setInt(10)
    .setWis(10)
    .setCha(12)
  const weapon = 'great-axe';
  fighter.setRightHand(testWeapons.filter(w => w.name === weapon));
  // TODO: 
  const hp = getRandomIntInclusive(1, 6)
  fighter.setHp(newHp: number)
}

function magicUser() {

}

function cleric() {

}

function thief() {

}

const testWeapons = [
  {
    name: 'great-axe',
    price: '14gp',
    size: 'L',
    weight: 15,
    dmg: { min: 1, max: 10 }
  },
  {
    name: 'dagger',
    price: '2gp',
    size: 'S',
    weight: 1,
    dmg: { min: 1, max: 4 }
  },
  {
    name: 'hand-axe',
    price: '4gp',
    size: 'S',
    weight: 5,
    dmg: { min: 1, max: 6 }
  }
]
