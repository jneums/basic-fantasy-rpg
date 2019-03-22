import Quest from './Quest';
import { getArmorByName } from '../../loot/armor'

export default class QuestLog {
  constructor() {
    // holds a list of quests:
    let quests = [];

    // add quest:
    this.add = function(questId) {
      // needs a 'getQuestById' generator:
      const newQuest = new Quest(
        "Orc Cleanup",
        "kill",
        5,
        "orc",
        ["This dungeon is teemingwith orcs.", "How would you like to help out by", "murdering five of them?"],
        ["Did you murder them?"],
        ["Thank you brave warrior!"],
        ["The weird little blonde dude at", "the entrance wants me to kill", "some orcs for him."],
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

    // get indvidual:
    this.getOne = function(questId) {
      const quest = quests.find(quest => quest.id === questId);
      if (quest) return quest;
      else return null;
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
