import Quest from './Quest';
import { getArmorByName } from '../../loot/armor'

export default class QuestLog {
  constructor(character) {
    // holds a list of quests:
    let quests = [];
    let active = 0;

    // add quest:
    this.add = function(questId) {
      // needs a 'getQuestById' generator:
      const newQuest = new Quest(
        "Orc Cleanup",
        "easy",
        "kill",
        5,
        "orc",
        ["This dungeon is teeming with orcs.", "", "How would you like to help out by", "murdering five of them?"],
        ["Did you murder them?"],
        ["Thank you brave warrior!"],
        ["The weird little blonde", "dude at the entrance", "wants me to kill", "some orcs for him."],
        getArmorByName("Recruit's Pants")
      )


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

    this.getActive = function() {
      return active;
    }

    this.setActive = function(index) {
      if (!quests[index]) return;
      active = index;
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
          console.log(quest.getStatus(), quest.getCount())
        }
      })
    }
  }

}
