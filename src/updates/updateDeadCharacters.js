export default function updateDeadCharacters(scene = {}) {
  scene.characters.children.entries.forEach(child => {
    if (child.combat.isDead()) {
      // dump threat table
      child.combat.setThreatTable([]);
      // increment corpse dissapear time
      const oldTimer = child.timer.getCorpseTimer();
      const newTimer = oldTimer + 1;
      child.timer.setCorpseTimer(newTimer);
      // if timer is over 1800, destroy the sprite
      if (newTimer > 1800) {
        child.destroy();
      }
    }
  })
}
