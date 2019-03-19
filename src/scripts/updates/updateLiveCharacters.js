
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
  scene.characters.getChildren().forEach(child => {
    // if alive, run update
    if (!child.combat.isDead()) {
      child.updateBars()
      child.buffs.update();
      child.timer.updateSwingTimers();
      child.timer.updateCastTimer();
      child.classUpdate();


      if (child.playerTarget) {
        child.setTint(0xbb4444);
      } else {
        child.clearTint();
      }

      // return before reaching update scripts:
      if (child.combat.isPoly()) {
        child.animations.poly();

        // stop for now, later make it 'wander'.
        return child.movement.stop();
      } else if (child.combat.isStunned()) {
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
