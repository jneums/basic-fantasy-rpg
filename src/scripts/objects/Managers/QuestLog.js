import { getArmorByName } from '../../loot/armorAPI';
import FloatingText from '../FloatingText/FloatingText';
import getQuestByName from '../../QuestAPI';

export default class QuestLog {
  constructor(character) {



    // holds a list of quests:
    let activeQuests = [];
    let completedQuests = [];




    // add quest:
    this.add = function(questName) {

      // needs a 'getQuestByName' generator:
      const newQuest = getQuestByName(questName);

      // initialize quest:
      newQuest.advanceStatus();
      activeQuests.push(newQuest);


    }

    // remove quest by index:
    this.remove = function(index) {
      if (activeQuestIndex === index) {
        activeQuests[activeQuestIndex].setActive(false);
        activeQuestIndex = 0;
      }
      activeQuests = activeQuests.filter((quest, i) => i !== index);

    }

    // get quest log:
    this.getActive = function() {
      return activeQuests;
    }

    // get specfic quests:
    this.getByStatus = function(status = '') {
      if (status === 'completed') {
        return completedQuests;
      } else {
        const filteredQuests = activeQuests.filter(quest => quest.getStatus() === status);
        if (!filteredQuests) return null;
        else return filteredQuests;
      }

    }

    this.getActiveQuestIndex = function() {
      return activeQuestIndex;
    }

    // which quest to focus in UI:
    let activeQuestIndex = 0;

    this.setActiveQuest = function(index) {
      if (!activeQuests[index]) return;

      activeQuests[activeQuestIndex].setActive(false);

      activeQuestIndex = index;
      activeQuests[activeQuestIndex].setActive(true);
    }

    // get indvidual:
    this.getOne = function(questName) {
      const completedQuest = completedQuests.find(quest => quest.getName() === questName);
      if (completedQuest) return completedQuest;
      const quest = activeQuests.find(quest => quest.getName() === questName);
      if (quest) return quest;
      return null;
    }

    this.completeQuest = function(questName) {
      const quest = activeQuests.find(quest => quest.getName() === questName);
      if (!quest) return null;
      quest.advanceStatus();
      quest.takeReward(character);
      this.update()

    }

    this.update = function(target) {
      activeQuests.forEach(quest => {
        if (quest.getStatus() === 'completed') {

          completedQuests.push(quest);
          activeQuests = activeQuests.filter(quest => quest.getStatus() !== 'completed')

        } else if (target && quest.getTarget() === target.getName()) {
          quest.incCounter();
          const errorText = new FloatingText(character.scene, {
            text: `${quest.getType()} ${quest.getCount()} ${quest.getUIName()}`,
            size: 2,
            animation: "fade",
            timeToLive: 4000,
            color: 0xccaa44,
            position: 'above'
          })
        }
      })
    }
  }

}
