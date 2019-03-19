
/**
 * updateDeadCharacters - What to do for characters that have
 * died but have not been cleared yet.
 * Handles character clean up.
 *
 * @param  {type} scene = {} description
 * @return {type}            description
 */
export default function updateDeadCharacters(scene = {}) {
  scene.characters.children.entries.forEach(child => {
    if (child.combat.isDead()) {
      if (child.healthBar) child.healthBar.destroy();
      if (child.manaBar) child.manaBar.destroy();
      if (child.rageBar) child.rageBar.destroy();
      if (child.hands) child.hands.destroy();
      if (child.body.enable) child.body.enable = false;
      child.clearTint();
      const animationType = child.anims.currentAnim.key.substring(child.anims.currentAnim.key.length - 3, child.anims.currentAnim.key.length);
      if (animationType !== 'die') child.animations.die();
      child.setVelocity(0, 0);
      // reward xp: everyone on the threat table wins!
      child.threat.threatTable().forEach(entry => {
        entry.character.threat.resetThreat(child);
        entry.character.lvl.gainXP(100)
      })
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
