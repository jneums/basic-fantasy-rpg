![Quick Screenshot](./src/assets/screenshot.png?raw=true "Quick Screenshot")

# RPG WIP
## Getting Started:
1. Clone this repository. From the command line: `git clone https://github.com/Jesse989/basic-fantasy-rpg`.
2. Change into cloned repository, e.g. `cd basic-fantasy-rpg`.
3. Run `npm install`.
4. Browser should pop up automatically with game running.

## Game Play:
Tap on a character to target them.
Use an ability by clicking the icons on the right side of the screen.

Space bar will change between the active character:

Each character has a cheese (restore health) and a drink (restore resource) button on the bottom two action bar slots. Barbarian has a 'rage ruby' instead, it fills up his rage bar.

### Mage:

1. Toggle auto attack.

2. Wand: shoot from a distance.

3. Arcane Intellect:  buff yourself and your friends.

4. Arcane Missiles: instant attack that ticks three times for 30 damage. Uses a lot of mana.

5. Frostbolt: does damage and slows your target.

6. Polymorph: turn your target into a small sheep like thing.

### Barbarian:

1. Toggle auto attack.

2. Rush: run at target and stun them for 3 seconds.

3. Gore: apply a dot that does 15 dmg per tick.

4. Strike: next melee swing does 11 extra damage.

5. Battle cry: raises attack power by 25.

6. Intimidate: does 10 damage and slows enemy attacks by 100%.

7. Hobble: does 7 dmg and causes target to run half as fast.

### Priest:

1. Toggle auto attack.

2. Wand: shoot from a distance.

3. Lesser Heal: heal a small amount of friendly targets hit points.

4. Renew: heals 50 damage over 15 seconds, uses less mana.

## Contributing:

This game is in a very early status right now. Many of the core systems are in place. Now is just tying them all together.

### Current Opportunities:

If you would like to help but don't know where to start, here is a list that is
constantly updated with new things:

1. Animations: The more the better! Pick a sprite from the master sprite sheet in the assets folder and make one for each of the animations which the Orc has. Notice as well that the hands/weapon have their own, make sure to add those as well!

2. Spells and abilities: Mage has a few that need to be done. If you are feeling up to it maybe you can create some healing spells or rogue abilities.

3. Maps: Use tiled and the master sprite sheet and either enhance the current map, or create a new one. If you create a new one we can link them together and start creating an entire zone. Be creative and have fun!

5. Quests: Implement a quest system.

### Roadmap:

#### Phase 1:

This phase consists of creating a playable demo, where the user can choose which class to play (Barbarian or Mage to start with). After they choose they will be started in the demo scene, which is a large dungeon filled with groups of enemies. The groups will consist of an orc group: melee, ranged caster, and ranged physical damage. The player will be able to defeat these packs and progress through the dungeon. After a few packs, the player will 'level-up' and gain access to another ability. Ideally this will repeat until the character is up to level 5, and has a solid selection of abilities to use.
Also, the player will be able to loot the bodies, and equip/use any items they pick up.
Finally, the player should be able to talk to a friendly NPC at the start of the dungeon, who will offer the player a quest: kill x amount of enemies, or collect x amount of quest items. On completion of the quest, the player will receive experience and loot.

#### Phase 2:

This phase will focus on backend and expansion of existing assets.
The most important aspects of this phase will be implementing multi-player capabilities using a node.js back-end which will use socket.io to communicate with the players. In addition, this will allow for accounts to be created and characters to be saved and loaded from different devices, using a simple database such as MongoDB or graphQL.

Other important aspects of phase two will be the expansion of in game assets, for example creating more mobs, more maps, more quests, more abilities, and more playable classes.

#### Phase 3:

Phase three consists of a completely playable game. The user accesses the game (either through their browser, or on their phone as a PWA or browser). After the user logs in, they will be brought to a character screen where they can choose their previously created characters, or create a new character.

After they choose their character, they will be logged into the game world at their previous in game location.

At this point there will be multi-player capabilities, and a mini-raid/dungeon.
Players will be able to work together to defeat epic Mobs that drop epic loot.


Please notice, this game is very early in development and there are a lot of things to complete, however that being said, there is a large framework in place that will enable tons of options and playability.

### Credits:

First off, thank you to Richard Davey and the rest of the Phaser3
development team. This game engine is a blast to work with, the
documentation is up to date and vast, and the Phaser3 examples are
a huge resource. This game would not exist without Phaser3, and it
has been inspiring to watch its development and growth over the last
year.

https://phaser.io/phaser3

Big thanks to 0x72 for his awesome work on the open-source tileset. Here is the link to his page on itch.io. Check it out if you get a minute, the quality is amazing for a free asset.

https://0x72.itch.io/16x16-dungeon-tileset

Thanks to Yandeu for the awesome template. Quickest and most painless way to get setup and coding when you want Phaser3, Webpack, Babel, and other great stuff. Here is the link:

https://github.com/yandeu/phaser-project-template-es6

Here is some documentation for the Combat System if you have questions:

https://codepen.io/Jesse989/full/vPgPGY
