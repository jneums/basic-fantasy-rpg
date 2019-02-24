export default function updateLiveCharacters(scene = {}) {
  scene.characters.children.entries.forEach(child => {
    // if alive, run update
    if (!child.combat.isDead()) {
      child.updateBars()
      child.buffs.update();
      child.timer.updateSwingTimers();
      child.timer.updateCastTimer();
      if (child.combat.isStunned()) {
        child.setVelocity(0, 0);
      } else {
        child.AI();
        child.classUpdate();
      }
    }
  })
}
