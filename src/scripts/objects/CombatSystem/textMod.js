import FloatingText from '../FloatingText/FloatingText';

export default function textMod(attacker = {}, target = {}, combatObject = {}) {



  let text = '';

  switch (combatObject.status()) {
    case 'crit':
      text = 'crit: ' + -1 * Math.round(combatObject.amount());
      break;
    case 'miss':
      text = 'miss';
      break;
    case 'dodge':
      text = 'dodge';
      break;
    case 'parry':
      text = 'parry';
      break;
    case 'block':
      text = 'block';
      break;
    default:
      text = -1 * Math.round(combatObject.amount());
      break;

  }

  if (combatObject.skillLvlUp) {
    text += combatObject.skillLvlUp;
  }

  // create floating text:
  const floatingText = new FloatingText(attacker.scene, {
      text: text,
      size: Math.abs(Math.round(combatObject.amount())) / (attacker.lvl.getLevel() * 20),
      timeToLive: 10000,
      animation: "up",
      parentObj: target,
      combatObject: combatObject,
      side: (attacker.flipX) ? -1: 1
  });
}
