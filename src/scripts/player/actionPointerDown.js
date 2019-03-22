
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
      return target = child;
    }
  })


  // if a character was clicked:
  if (target && target.combat.isDead() && target.loot()) {
    const targetLootOwner = player.target.currentTarget().tapped();
    // if click target is dead, and was tapped, and looter is in range:
    if (target.combat.isDead() && (targetLootOwner && target.target.rangeCheck(targetLootOwner, 70))) {
      // give some loot to tapped (person who killed this)
      targetLootOwner.inventory.add(target.loot());
      console.log(player.inventory.getInventory());
      // clear loot so it cannot be looted again.
      target.setLoot(null);
    }
  } else if (target) {
    player.movement.faceTarget(target);
    player.target.setCurrentTarget(target);
    target.playerTarget = true;

    if (player.target.previousTarget()) {
      player.target.previousTarget().playerTarget = false;
    }

    if (target.getCharacterClass() === 'npc' && player.target.rangeCheck(target, 25)) {
        let text = '';
        const questId = target.quest.id;
        const playerQuest = player.questLog.getOne(questId);
        const status = playerQuest ? playerQuest.getStatus() : 'not given';

        if ( status === 'not given') {
          player.questLog.add(questId);
          text = player.questLog.getOne(questId).getText();
        } else if (status === 'in progress') {
          text = player.questLog.getOne(questId).getText(1);
        } else if (status === 'ready for turn in'){
          text = player.questLog.getOne(questId).getText(2)
        }

        player.scene.dialogueBoxActive = true;
        player.scene.registry.set('openDialogueBox', text);
    }
  } else {
    // if no target was clicked, move to that spot instead
    player.movement.setMoveTargetCoords([pointer.worldX, pointer.worldY]);
  }
}
