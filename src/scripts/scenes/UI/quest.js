import CONST from '../Const';

const QUEST_LIST_X = -256;
const QUEST_LIST_Y = -156;

const TITLE_SIZE = 16;
const DESCRIPTION_SIZE = 16;
const STATUS_SIZE = 16;

function selectQuest(scene, quest) {
  // set active indicator for quest list:
  clearQuestLog(scene);

  const questLogBackground = scene.add.image( 0, 0, 'questLog');
  questLogBackground.scaleX = CONST.SCALE;
  questLogBackground.scaleY = CONST.SCALE;

  const questDescription = scene.add.bitmapText( 50,-178, 'font', quest.getDescription(), DESCRIPTION_SIZE).setTint(CONST.TXT_COLOR);
  const questStatus = scene.add.bitmapText( 50, 128, 'font', `${quest.getType()} ${quest.getCount()} ${quest.getUIName()}`, STATUS_SIZE).setTint(CONST.TXT_COLOR);

  scene.questLogContainer.add([questLogBackground, questDescription, questStatus])

}

function clearQuestLog(scene) {
  scene.questLogContainer.removeAll(true);

}

function loadQuestLog(scene, quests) {

  const questLogBackground = scene.add.image( 0, 0, 'questLog');
  questLogBackground.scaleX = CONST.SCALE;
  questLogBackground.scaleY = CONST.SCALE;
  scene.questLogContainer.add(questLogBackground);

  quests.forEach(quest => {
    if (quest.isActive()) {
      selectQuest(scene, quest);
    }
  })

  let _x = QUEST_LIST_X;
  let _y = QUEST_LIST_Y;
  const _yIncrement = 76;

  if (!quests[0]) return;

  quests.forEach(quest => {


    // add background:
    const difficultyColor = quest.getColor();
    const bg = scene.add.image(_x, _y, difficultyColor + "-bg");
    bg.scaleX = CONST.SCALE;
    bg.scaleY = CONST.SCALE;


    // add text:
    const title = scene.add.bitmapText(bg.x, bg.y - 10, 'font', quest.getName(), TITLE_SIZE).setTint(CONST.TXT_COLOR)
      .setOrigin(0.5)

    const progress = scene.add.bitmapText(bg.x, bg.y + 10, 'font', `(${quest.getStatus()})`, 16).setTint(CONST.TXT_COLOR)
      .setOrigin(0.5)

    scene.questLogContainer.add([bg, title, progress]);

    _y += _yIncrement;

  })


}




export { selectQuest, clearQuestLog, loadQuestLog }
