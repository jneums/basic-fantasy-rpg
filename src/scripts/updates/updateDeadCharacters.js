export default function updateDeadCharacters(scene = {}) {
  scene.characters.children.entries.forEach(child => {
    if (child.combat.isDead()) {
      child.setVelocity(0, 0);
      // reward xp: everyone on the threat table wins!
      child.threat.threatTable().forEach(entry => entry.character.lvl.gainXP(100))
      // dump threat table
      child.threat.setThreatTable([]);
      // dump buffs
      child.buffs.setBuffs([]);
      // increment corpse dissapear time
      const oldTimer = child.timer.getCorpseTimer();
      const newTimer = (child.loot()) ? oldTimer + 1 : oldTimer + 3;
      child.timer.setCorpseTimer(newTimer);
      // if timer is over 1800, destroy the sprite
      if (newTimer > 1800) {
        child.destroy();
      }
    }
  })
}
