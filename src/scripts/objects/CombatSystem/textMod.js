import FloatingText from '../FloatingText/FloatingText';

export default function textMod(attacker = {}, target = {}, combatObject = {}) {
  // create floating text:
  const text = new FloatingText(attacker.scene, {
      text: -1 * Math.round(combatObject.amount()),
      size: Math.abs(Math.round(combatObject.amount())) / 10,
      timeToLive: 10000,
      animation: "up",
      parentObj: target,
      combatObject: combatObject,
      side: (attacker.flipX) ? -1: 1
  });
}
