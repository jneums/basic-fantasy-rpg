export default function spellHitTable(attacker = {}, target = {}) {
  // miss chance depends on the targets level:
  const levelDiff = target.lvl.getLevel() - attacker.lvl.getLevel();
  let missChance = 0;
  switch(true) {
    case (levelDiff <= 3):
      missChance = 0;
      break;
    case (levelDiff <= 4):
      missChance = 11;
      break;
    case (levelDiff <= 5):
      missChance = 22;
      break;
    case (levelDiff <= 6):
      missChance = 33;
      break;
    case (levelDiff <= 7):
      missChance = 44;
      break;
    case (levelDiff <= 8):
      missChance = 55;
      break;
    case (levelDiff <= 9):
      missChance = 66;
      break;
    case (levelDiff <= 10):
      missChance = 77;
      break;
  }
  const random = Phaser.Math.Between(0, 100);
  if (random < missChance) return 'miss';
  // if not a miss:
  // roll again and see if its a crit:
  const critRoll = Phaser.Math.Between(0, 100);
  if (critRoll < attacker.stat.spellCrit() * 100) return 'crit';
  else return 'hit';

}
