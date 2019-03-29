import Quest from './Quest';
import { getArmorByName } from '../../loot/armor';
import FloatingText from '../FloatingText/FloatingText';

export default class QuestLog {
  constructor(character) {

    // intital quest:
    const startingQuest = new Quest(
      0,
      "Survive!",
      "hard",
      "Kill",
      500,
      "orc",
      [""],
      [""],
      [""],
      ["Do I have what it", "takes to kill over", "500 orcs??"],
      getArmorByName("Ring of Fury")
    )

    // holds a list of quests:
    let activeQuests = [];
    let completedQuests = [];

    startingQuest.advanceStatus();
    activeQuests.push(startingQuest);



    // add quest:
    this.add = function(questId) {

      // needs a 'getQuestById' generator, possible on server side:
      const newQuest = new Quest(
        1,
        "Orc Cleanup",
        "easy",
        "Kill",
        5,
        "orc",
        ["Kind sir, these creatures called",  "orcs are flooding our dungeon!", "Can you help by killing five orcs?", "I will give you a reward!"],
        ["Did you murder them?"],
        ["Thank you brave warrior!"],
        ["The strange looking", "dude at the entrance", "wants me to kill", "some orcs for him."],
        getArmorByName("Ring of Fury")
      )

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
    this.getOne = function(questId) {
      const quest = activeQuests.filter(quest => quest.getId() === questId)[0];
      if (quest) return quest;
      else return null;
    }

    this.completeQuest = function(questId) {
      const quest = activeQuests.find(quest => quest.getId() === questId);
      if (!quest) return null;
      quest.advanceStatus();
      quest.takeReward(character)

    }

    this.update = function(target = {}) {
      activeQuests.forEach(quest => {
        if (quest.getStatus() === 'completed') {
          completedQuests.push(quest);
          activeQuests = activeQuests.filter((quest, i) => i !== activeQuests.indexOf(quest))

        } else if (quest.getTarget() === target.getName()) {
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
