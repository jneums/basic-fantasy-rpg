
/**
 * actionPointerDown - called when the inventory is closed,
 * e.g. the pointer has interacted with the game world, not the ui.
 *
 * @param  {object} pointer   
 * @param  {Character} player
 * @return {void}
 */
export default function actionPointerDown(pointer, player = {}) {
  // is pointer on a character:
  let target = false;
  // loop through each character and check if the pointer
  // clicked on their body:
  player.scene.characters.getChildren().forEach(child => {
    if (child.body.hitTest(pointer.worldX, pointer.worldY)) {
      // if so, set target to that character:
      target = child;
      // set it as the new target of the player
      player.target.setCurrentTarget(target);
      target.healthBar.setBackgroundColor(0xaa3333);
      if (player.target.getPreviousTarget()) {
        player.target.getPreviousTarget().healthBar.setBackgroundColor();
      }
    }
  })
  // if a character was clicked, and it has loot:
  if (target && target.loot()) {
    const targetLootOwner = player.target.currentTarget().tapped();
    // if click target is dead, and was tapped, and looter is in range:
    if (target.combat.isDead() && (targetLootOwner && target.target.rangeCheck(targetLootOwner, 70))) {
      // give some loot to tapped (person who killed this)
      targetLootOwner.inventory.add(target.loot());
      console.log(player.inventory.getInventory());
      // clear loot so it cannot be looted again.
      target.setLoot(undefined);
    }
  } else {
    // if no target was clicked, move to that spot instead
    player.movement.setMoveTargetCoords([pointer.worldX, pointer.worldY]);
    player.animations.run();
  }
}
