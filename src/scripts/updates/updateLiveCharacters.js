
/**
 * updateLiveCharacters - run from scene update
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

      if (child.combat.isStunned()) {
        // cant move, timers dont move, and
        // ai is not running:
        child.setVelocity(0, 0);
      } else {
        child.AI();
      }
    }
  })
}
