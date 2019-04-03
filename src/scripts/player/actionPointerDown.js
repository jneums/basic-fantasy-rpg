import CONST from '../objects/Managers/Const';

function _setTarget(player, target) {
  player.movement.faceTarget(target);
  player.target.setCurrentTarget(target);

  const targetInfo = {
    name: target.getName(),
    level: target.lvl.getLevel()
  }
  player.scene.registry.set('targetChange', targetInfo);

  target.playerTarget = true;
}
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


  // if a dead character with loot was clicked:
  if (target && target.combat.isDead() && target.loot()) {



    // tapped is whomever hit it first:
    const targetLootOwner = player.target.currentTarget().tapped();
    if (targetLootOwner.getName() !== player.getName()) return;


    // if click target was tapped, and tapper is in range:
    if (targetLootOwner && target.target.rangeCheck(targetLootOwner, CONST.LOOTING_RANGE)) {
      _setTarget(player, target);


      player.scene.lootBoxActive = true;
      player.scene.registry.set('openLootBox', target.loot());
    }

  } else if (target) {
    _setTarget(player, target);

    if (player.target.previousTarget()) {
      player.target.previousTarget().playerTarget = false;
    }


    if (target.getCharacterClass() === 'npc' && player.target.rangeCheck(target, CONST.LOOTING_RANGE)) {
        let text = '';
        const questName = target.quest || '';

        const status = player.questLog.getOne(questName) ? playerQuest.getStatus() : 'not given';
        console.log(status)
        if ( status === 'not given') {
          player.questLog.add(questName);
          text = player.questLog.getOne(questName).getText();
        } else if (status === 'in progress') {
          text = player.questLog.getOne(questName).getText(1);
        } else if (status === 'ready for turn in'){
          text = player.questLog.getOne(questName).getText(2)
          // get reward, mark quest as complete:
          player.questLog.completeQuest(questName);
          target.marker.hide()
        } else {
          text = "Thanks again brave person."
        }

        player.scene.dialogueBoxActive = true;
        player.scene.registry.set('openDialogueBox', text);
    } else if (target.getCharacterClass() === 'trainer' && player.target.rangeCheck(target, CONST.LOOTING_RANGE)) {

      let text = '';
      const abilityName = target.lesson.name;
      let status = player.knownAbilities.find(ability => ability === abilityName);

      if (status) {
        text = 'I can teach you no more about ' + abilityName;
      } else {
        text = target.lesson.instructions;
        player.keyMap.setNextAvailable({ability: player.ability[abilityName], icon: abilityName})
        player.knownAbilities.push(abilityName);
        target.marker.hide()
      }

      player.scene.dialogueBoxActive = true;
      player.scene.registry.set('openDialogueBox', text);
    }
  } else {
    // if no target was clicked, move to that spot instead
    player.movement.setMoveTargetCoords([pointer.worldX, pointer.worldY]);
  }
}
