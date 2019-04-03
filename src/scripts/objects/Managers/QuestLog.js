import Quest from './Quest';
import { getArmorByName } from '../../loot/armorAPI';
import FloatingText from '../FloatingText/FloatingText';

export default class QuestLog {
  constructor(character) {



    // holds a list of quests:
    let activeQuests = [];
    let completedQuests = [];




    // add quest:
    this.add = function(questName) {

      // needs a 'getQuestById' generator, possible on server side:
      const newQuest = new Quest(
        1,
        "orcs",
        "easy",
        "Kill",
        15,
        "orc",
        "We have little time my friend. The Labyrinth is attacking us, and our losses are increasing by the second! Prove your worth, and earn your place as a member of our proud clan. Talk to me again after you learn to fight, by killing 15 of these weak captured orcs.",
        "What are you doing wasting my time?? Go kill them!",
        "So you finished, I assumed you would. Here, take this ring. It is the only thing I have to offer you, I already gave everything else to the others who came before you.",
        "The commander wants me to prove my worth or something, by killing 15 of these shabby orcs. He said he would give me a ring or something.",
        getArmorByName("Ring of Fury"),
        25
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
