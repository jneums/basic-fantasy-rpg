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
        "kill",
        5,
        "orc",
        "KILL 5 ORCS",
        "DID YOU KILL THEM?",
        "THANK YOU SO MUCH HERO!",
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
