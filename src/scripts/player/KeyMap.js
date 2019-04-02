export default class KeyMap {
  constructor(character) {
    let keys = {
      inventory: {
        ability: character.inventory.use,
        icon: null
      },
      one: {
        ability: null,
        icon: null
      },
      two: {
        ability: null,
        icon: null
      },
      three: {
        ability: null,
        icon: null
      },
      four: {
        ability: null,
        icon: null
      },
      five: {
        ability: null,
        icon: null
      },
      six: {
        ability: null,
        icon: null
      },
      seven: {
        ability: null,
        icon: null
      },
      eight: {
        ability: null,
        icon: null
      },
      nine: {
        ability: null,
        icon: null
      },
      ten: {
        ability: null,
        icon: null
      },
      eleven: {
        ability: null,
        icon: 'inventory'
      },
      zero: {
        ability: null,
        icon: 'quest'
      },
      minus: {
        ability: null,
        icon: 'equipment'
      }
    }

    this.setNextAvailable = function(ability) {
      for (let number in keys) {
        if (!keys[number].ability) {
          keys[number] = ability;
          character.scene.registry.set('reloadUI', character);
          return;
        }
      }
    }

    this.getIcons = function() {
      return Object.keys(keys).filter(key => key !== 'inventory').map(obj => keys[obj].icon);
    }
    this.executeOne = function() {
      if (!keys.one.ability) return;
      keys.one.ability.call(character)
    }

    this.executeTwo = function() {
      if (!keys.two.ability) return;
      keys.two.ability.call(character)
    }

    this.executeThree = function() {
      if (!keys.three.ability) return;

      keys.three.ability.call(character)
    }

    this.executeFour = function() {
      if (!keys.four.ability) return;

      keys.four.ability.call(character)
    }

    this.executeFive = function() {
      if (!keys.five.ability) return;

      keys.five.ability.call(character)
    }

    this.executeSix = function() {
      if (!keys.six.ability) return;

      keys.six.ability.call(character)
    }

    this.executeSeven = function() {
      if (!keys.seven.ability) return;

      keys.seven.ability.call(character)
    }

    this.executeEight = function() {
      if (!keys.eight.ability) return;

      keys.eight.ability.call(character)
    }

    this.executeNine = function() {
      if (!keys.nine.ability) return;

      keys.nine.ability.call(character);

    }

    this.executeTen = function() {
      if (!keys.ten.ability) return;

      keys.ten.ability.call(character);
    }

    this.executeEleven = function() {

      if (character.scene.inventoryActive) {
        character.scene.inventoryActive = false;
        character.scene.registry.set('closeInventory');
      } else {
        if (character.scene.questLogActive) {
          character.scene.questLogActive = false;
          character.scene.registry.set('closeQuestLog')
        } else if (character.scene.equipmentActive) {
          character.scene.equipmentActive = false;
          character.scene.registry.set('closeEquipment')
        }
        character.scene.inventoryActive = true;
        const data = {
          inventory: character.inventory.getInventory(),
          crystals: character.inventory.getCrystals()
        }
        character.scene.registry.set('openInventory', data);

      }

    }

    this.executeZero = function() {
      if (character.scene.questLogActive) {
        character.scene.questLogActive = false;
        character.scene.registry.set('closeQuestLog')

      } else {
        if (character.scene.inventoryActive) {
          character.scene.inventoryActive = false;
          character.scene.registry.set('closeInventory')
        } else if (character.scene.equipmentActive) {
          character.scene.equipmentActive = false;
          character.scene.registry.set('closeEquipment')
        }
        character.scene.questLogActive = true;
        character.scene.registry.set('openQuestLog', character.questLog.getActive())

      }
    }

    this.executeMinus = function() {
      if (character.scene.equipmentActive) {
        character.scene.equipmentActive = false;
        character.scene.registry.set('closeEquipment')

      } else {
        if (character.scene.inventoryActive) {
          character.scene.inventoryActive = false;
          character.scene.registry.set('closeInventory')
        } else if (character.scene.questLogActive) {
          character.scene.questLogActive = false;
          character.scene.registry.set('closeQuestLog');
        }

        const data = {
          stats: character.stat.displayStats(),
          equipment: character.equipment.equipped(),
          crystals: character.inventory.getCrystals()
        }
        character.scene.equipmentActive = true;
        character.scene.registry.set('openEquipment', data)

      }
    }

    this.executeInventoryOne = function() {
      keys.inventory.abilitycall(character.inventory, 0)
    }

    this.executeInventoryTwo = function() {
      keys.inventory.abilitycall(character, 1)
    }

    this.executeInventoryThree = function() {
      keys.inventory.abilitycall(character.inventory, 2)
    }

    this.executeInventoryFour = function() {
      keys.inventory.abilitycall(character.inventory, 3)
    }

    this.executeInventoryFive = function() {
      keys.inventory.abilitycall(character.inventory, 4)
    }

    this.executeInventorySix = function() {
      keys.inventory.abilitycall(character.inventory, 5)
    }

    this.executeInventorySeven = function() {
      keys.inventory.abilitycall(character.inventory, 6)
    }

    this.executeInventoryEight = function() {
      keys.inventory.abilitycall(character.inventory, 7)
    }

    this.executeInventoryNine = function() {
      keys.inventory.abilitycall(character.inventory, 8)
    }

    this.getOne = function() {
      return one;
    }

    this.getTwo = function() {
      return two;
    }

    this.getThree = function() {
      return three;
    }

    this.getFour = function() {
      return four;
    }

    this.getFive = function() {
      return five;
    }

    this.getSix = function() {
      return six;
    }

    this.getSeven = function() {
      return seven;
    }

    this.getEight = function() {
      return eight;
    }

    this.getNine = function() {
      return nine;
    }

    this.setOne = function(newKey) {
      keys.one = newKey;
    }

    this.setTwo = function(newKey) {
      keys.two = newKey;
    }

    this.setThree = function(newKey) {
      keys.three = newKey;
    }

    this.setFour = function(newKey) {
      keys.four = newKey;
    }

    this.setFive = function(newKey) {
      keys.five = newKey;
    }

    this.setSix = function(newKey) {
      keys.six = newKey;
    }

    this.setSeven = function(newKey) {
      keys.seven = newKey;
    }

    this.setEight = function(newKey) {
      keys.eight = newKey;
    }

    this.setNine = function(newKey) {
      keys.nine = newKey;
    }
  }
}
