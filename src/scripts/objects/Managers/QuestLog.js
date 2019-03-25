import Quest from './Quest';
import { getArmorByName } from '../../loot/armor';
import FloatingText from '../FloatingText/FloatingText';

export default class QuestLog {
  constructor(character) {

    // holds a list of quests:
    let quests = [];

    // which quest to focus in UI:
    let activeQuestIndex = 0;

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
        getArmorByName("Recruit's Boots")
      )

      // initialize quest:
      newQuest.advanceStatus();
      quests.push(newQuest);


    }

    // remove quest:
    this.remove = function(questId) {
      quests = quests.filter(quest => quest.id !== questId);

    }

    // get quest log:
    this.getAll = function() {
      return quests;
    }

    // get specfic quests:
    this.getByStatus = function(status = '') {
      const filteredQuests = quests.filter(quest => quest.getStatus() === status);
      if (!filteredQuests) return null;
      else return filteredQuests;
    }

    this.getActiveQuestIndex = function() {
      return activeQuestIndex;
    }

    this.setActiveQuestIndex = function(index) {
      if (!quests[index]) return;
      activeQuestIndex = index;
    }

    // get indvidual:
    this.getOne = function(questId) {
      const quest = quests.find(quest => quest.getId() === questId);
      if (quest) return quest;
      else return null;
    }

    this.completeQuest = function(questId) {
      const quest = quests.find(quest => quest.getId() === questId);
      if (!quest) return null;
      quest.advanceStatus();
      quest.takeReward(character)

    }

    this.update = function(target = {}) {
      quests.forEach(quest => {
        if (quest.getTarget() === target.getName()) {
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
