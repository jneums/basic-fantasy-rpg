
/**
 * updateLiveCharacters - run from scene update,
 * keeps bars and characters in sync, updates
 * swing and spell timers, keeps characters incapacitated
 * if they have a 'stun' debuff, etc...
 *
 * @param  {Scene} scene
 * @returns {void}
 */
export default function updateLiveCharacters(scene = {}) {
  scene.characters.children.entries.forEach(child => {
    // if alive, run update
    if (!child.combat.isDead()) {
      child.updateBars()
      child.buffs.update();
      child.timer.updateSwingTimers();
      child.timer.updateCastTimer();
      child.classUpdate();

      // use tint or animation to show buffs?
      if (child.buffs.has('battleShout')) child.hands.setTint(0xaa3333);
      else child.hands.clearTint();

      // return before reaching update scripts:
      if (child.combat.isStunned()) {
        // cant move, timers dont move, and
        child.animations.stun();
        // ai is not running:
        return child.movement.stop();
      }

      if (child.controller === 'player') {
        child.playerControlled();
      } else {
       // only run ai if not player controlled:
        child.AI();
      }

    }
  })
}
