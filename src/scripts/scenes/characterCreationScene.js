import Character from '../objects/character';
import * as characterCreator from '../characterCreator';
import { meleeAttack } from '../abilities';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    // testing chacterCreator lib.
    let a = createFighter(this, 'charlie');
    let b = createFighter(this, 'tina');
    do {
      meleeAttack(a, b, 'right');
      meleeAttack(b, a, 'right');
    } while (a.getHp() > 0 && b.getHp() > 0)
  }

  update() {
  }
}

function createFighter(context, name) {
  let a = new Character(context);
  a.setName(name)
  a.setRightHand(testWeapons[0])
  a.setHp(20);
  characterCreator.randomizeAllStats(a);
  console.log(`weapons: ${a.getRightHand().name}, ${a.getLeftHand().name}`)
  return a;
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
