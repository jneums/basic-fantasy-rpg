![Quick Screenshot](./src/assets/screenshot.png?raw=true "Quick Screenshot")

# RPG WIP
## Getting Started:
1. Clone this repository. From the command line: `git clone https://github.com/Jesse989/basic-fantasy-rpg`.
2. Change into cloned repository, e.g. `cd basic-fantasy-rpg`.
3. Run `npm install`.
4. Browser should pop up automatically with game running.

## Game Play:
Currently there is no UI, so you kind of have to know what the keys do.

Shift + number keys will use the item in that inventory slot.

For example, the player starts with "Tough Jerky" in slot 1. Use shift + 1 to use the "Tough Jerky". Because the item type of "Tough Jerky" is a consumable, the game knows to cast the "eat" buff. Make sure not to move, as "eat" is channeled.

Start by opening up `./src/scripts/scenes/characterCreationScene`, and choose your
class by uncommenting whichever class you would like to test.

The mage is in progress, but can wand and conjure food and water:

1. Toggle auto attack.

2. Shoot your wand.

The first playable class is the Barbarian, which has the following abilities:

1. Toggle auto attack.

2. charge (run at target and stun them for 3 seconds)

3. rend (apply a dot that does 15 dmg per tick)

4. strike (next melee swing does 11 extra damage)

5. shout (raises attack power by 25)

6. thunder clap (does 10 damage and slows enemy attacks by 100%)

7. hamstring (does 7 dmg and causes target to run half as fast)

Probably sounds familiar...these abilities were created based on the mechanics of the Warrior class from vanilla WoW.

## Contributing:

This game is in a very early stats right now. Many of the core systems are in place, however the methods needed to interact with them are missing.

### TODO:

If you would like to help but don't know where to start, here is a list that is
constantly updated with new things:

1. Mage animations: need all the basic animations that the barbarian and orc have,
having a 'wand' animation would be REALLY great right now because that is the Mages
number one ability currently. Check out the spritesheets for orc and barbarian for ideas, and use one of the caster sprites from the master spritesheet in 'assets'.

### Roadmap:

#### Phase 1:

This phase consists of creating a playable demo, where the user can choose which class to play (Barbarian or Mage to start with). After they choose they will be started in the demo scene, which is a large dungeon filled with groups of enemies. The groups will consist of a Orcs: melee, ranged caster, and ranged physical damage. The player will be able to defeat these packs and progress through the dungeon. After a few packs, the player will 'level-up' and gain access to another ability. Ideally this will repeat until the character is up to level 5, and has a solid selection of abilities to use.
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


### Current Opportunities:

1. UI: This is the most important for now, and will define how the user interacts with the game. The UI should be designed with mobile in mind, so use of pointer events will be the main method of interaction. This is the largest project, not for the faint of heart.

2. Mobs: New mobs can be created and would be very helpful in making the game play more varied and exciting. Creating a ranged mob, such as a Orc Shaman, would add depth to the combat. Same with a Orc Archer or something similar.

3. Animations: Animations can be created using the master spritesheet, which has a variety of mobs and heros to use. Check out the implemented animations to see how it is done. There is currently a guide in the works, explaining the process for creating, implementing, and consuming the animations. If you have any question please ask me.

4. Armor and Weapons: This part is very approachable and can be completed by everyone. Eventually these will be served from a database, until it reaches that point though you can create items directly into the .js file. For example, if you would like to create a weapon, open the `./src/loot/weapons.js` file. Using the other items as a template, create a new object in the array and update all the fields. The items currently in there were based largely on vanilla WoW, so if you need ideas you can look up items on classic.wowhead.com.

The game is very early in development, though there is a large framework in place that will enable tons of options.

Here is some documentation for the Combat System if you have questions:

https://codepen.io/Jesse989/full/vPgPGY
