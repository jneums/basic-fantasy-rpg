export default class KeyMap {
  constructor(character) {
    let keys = {
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
      inventory: {
        ability: this.toggleInventory,
        icon: 'inventory'
      },
      questLog: {
        ability: this.toggleQuestLog,
        icon: 'quest'
      },
      equipment: {
        ability: this.toggleEquipment,
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
      return Object.keys(keys).map(obj => keys[obj].icon);
    }


    this.execute = function(num) {
      if (!keys[num].ability) return;
      keys[num].ability.call(character);
    }

    this.set = function(num, newKey) {
      keys[num] = newKey;
    }

  }


  toggleInventory() {
    if (this.scene.inventoryActive) {
      closeInventory(this);
    } else {

      if (this.scene.questLogActive) closeQuestLog(this);
      if (this.scene.equipmentActive) closeEquipment(this);

      openInventory(this);
    }
  }


  toggleQuestLog() {
    if (this.scene.questLogActive) {
      closeQuestLog(this);

    } else {
      if (this.scene.inventoryActive) closeInventory(this);
      if (this.scene.equipmentActive) closeEquipment(this);

      openQuestLog(this);

    }
  }


  toggleEquipment() {
    if (this.scene.equipmentActive) {
      closeEquipment(this);

    } else {
      if (this.scene.inventoryActive) closeInventory(this);
      if (this.scene.questLogActive) closeQuestLog(this);

      openEquipment(this);

    }
  }

}


function openQuestLog(character) {
  character.scene.questLogActive = true;
  character.scene.registry.set('openQuestLog', character.questLog.getActive())

}


function closeQuestLog(character) {
  character.scene.questLogActive = false;
  character.scene.registry.set('closeQuestLog');
}

function openEquipment(character) {
const data = {
  stats: character.stat.displayStats(),
  equipment: character.equipment.equipped(),
  crystals: character.inventory.getCrystals()
}

  character.scene.equipmentActive = true;
  character.scene.registry.set('openEquipment', data)
}


function closeEquipment(character) {
  character.scene.equipmentActive = false;
  character.scene.registry.set('closeEquipment')
}


function openInventory(character) {
  character.scene.inventoryActive = true;
  const data = {
    inventory: character.inventory.getInventory(),
    crystals: character.inventory.getCrystals()
  }
  character.scene.registry.set('openInventory', data);
}


function closeInventory(character) {
  character.scene.inventoryActive = false;
  character.scene.registry.set('closeInventory')
}
