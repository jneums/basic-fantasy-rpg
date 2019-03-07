import FloatingText from '../FloatingText/FloatingText';

export default function createFloatingText(attacker, target, combatObject) {
  // create floating text:
  const text = new FloatingText(attacker.scene, {
      text: -1 * Math.round(combatObject.amount()),
      size: Math.abs(Math.round(combatObject.amount())) / 10,
      animation: "up",
      parentObj: target,
      combatObject: combatObject,
      side: (attacker.flipX) ? -1: 1
  });
}
