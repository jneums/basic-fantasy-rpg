import Quest from './objects/Managers/Quest';
import { getArmorByName } from './loot/armorAPI';


export default function getQuestByName(name = '') {

  const orcs = new Quest(
    1,
    "Slay Some Orcs",
    "easy",
    "Kill",
    15,
    "orc",
    "We have little time my friend. The Labyrinth has discovered our location and is summoning every monster it possesses to destroy us. Prove your worth, and perhaps your deeds may be remembered by future generations. Talk to me again after you warm up on 15 of these weak captured orcs.",
    "What are you doing wasting my time?? Go kill them!",
    "So you finished, I assumed you would. Here, take this ring. It is the only thing I have to offer you, I already gave everything else to the others who came before you.",
    "The commander wants me to prove my worth by killing 15 of these shabby orcs. He said he would give me a ring or something. He mentioned how little time I have to finish my training.",
    getArmorByName("Ring of Fury"),
    25

  )

  const intoTheLabyrinth = new Quest(
    2,
    "Into the Labyrinth",
    "easy",
    "Kill",
    1500,
    "orc",
    "We have no time left my friend. You are far from ready, but there is no other option. You must join the fray. Exit the training grounds and join the front lines. I will not lie to you, you have no chance of survival. Do what you can though, your story will live on though your body will be destroyed.",
    "What are you doing here? Our people are dying by the second. Go do your part, perhaps you can turn the tide momentarily.",
    "You have done what no other has done before you. I stand humbled in your precense. We have nothing left to give but our most sincere gratitude. The Labyrinth will have noticed your abilities though, and you cannot remain here. We are unable to endure the backlash your actions have invoked. Flee for your life, and for ours.",
    "I must give every last ounce of energy I have for my people. The Captain seems assured of my demise, though perhaps through my actions I can prolong the inevitable.",
    getArmorByName("Ring of Fury"),
    250

  )

  const quests = [
    orcs,
    intoTheLabyrinth
  ]


  return quests.find(quest => quest.getName() === name);
}
