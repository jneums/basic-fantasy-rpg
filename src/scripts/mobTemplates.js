import Mob from './objects/Mob';

class RustMonster extends Mob {
  constructor(scene) {
    super(scene)

    let ac = 18;
    let hitDice = 5;
    let hp = 0;
    let numOfAttacks = 1;
    let damage = 'special';
    let speed = 1;
    let numAppearing = { sides: 4, quantity: 1, bonus: 0 };
    let saveAs = 'fighter: 5';
    let morale = 7;
    let treasureType = 0;
    let xp = 405;
  }
}
