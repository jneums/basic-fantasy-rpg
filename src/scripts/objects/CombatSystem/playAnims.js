export default function playAnims(attacker = {}, target = {}, combatObject = {}) {
  if (combatObject.type() === 'magic' || combatObject.type() === 'wand') {
    const damageType = combatObject.damageType();
    // create frost bolt image:
    const spellImage = attacker.scene.add.image(attacker.x, attacker.y, damageType + '-ball');
    spellImage.depth = target.depth + 1;
    const tween = attacker.scene.tweens.add({
      targets: spellImage,
      x: target.x,
      y: target.y,
      rotation: 360,
      duration: 500,
      onComplete: function () { arguments[1][0].destroy() }
    })
  } else if (combatObject.type() === 'heal') {
    // create frost bolt image:
    const spellImage = attacker.scene.add.image(target.x, target.y, 'nature-ball');
    spellImage.depth = target.depth + 1;
    const tween = attacker.scene.tweens.add({
      targets: spellImage,
      y: target.y - 30,
      alpha: 0,
      rotation: 360,
      duration: 500,
      onComplete: function () { arguments[1][0].destroy() }
    })
  }

}
