

/**
 * playAnims - useful place to play "taking damage" animations
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {CombatObject} combatObject
 * @return {void}
 */
export default function playAnims(attacker = {}, target = {}, combatObject = {}) {

  //
  if (combatObject.type() === 'magic' || combatObject.type() === 'wand') {

    // animations is based on spell school:
    const damageType = combatObject.damageType();

    // create 'damageType' image:
    const spellImage = attacker.scene.add.image(attacker.x, attacker.y, damageType + '-ball');

    // keep spell from going behind target:
    spellImage.depth = target.depth + 1;

    //
    const tween = attacker.scene.tweens.add({
      targets: spellImage,
      x: target.x,
      y: target.y,
      rotation: 360,
      duration: 200,
      onComplete: function () { arguments[1][0].destroy() }
    })

    // heal animation:
  } else if (combatObject.type() === 'heal') {

    // create 'nature' image:
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
