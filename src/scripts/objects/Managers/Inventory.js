export default class Inventory {
  constructor(character) {
    let capacity = 12;
    let money = 0;
    let inventory = [
      {
        name: 'Tough Jerky',
        ilvl: 1,
        cost: 25,
        sellPrice: 1,
        type: 'consumable',
        quantity: 20,
        maxStack: 20,
        icon: '',
        droppedBy: '',
        ability: character.consumables.eat
      },
      {
        name: 'Short Sword',
        ilvl: 3,
        sellPrice: 10,
        slot: 'mainHand',
        type: 'oneHandedSword',
        speed: 2.4,
        durability: 18,
        repairCost: 20,
        damage: { min: 2, max: 6 },
        disenchant: 'no',
        icon: '',
        droppedBy: '',
        levelRequirement: 1,
      },
    ];

    this.use = function(index = 0) {
      if (!inventory[index]) return;
      const item = inventory[index];
      if (item.type === 'consumable') {
        --item.quantity;
        item.ability.call(character);
        if (item.quantity === 0) {
          inventory.splice(index, 1);
        }
      } else {
        character.equipment.equip(item);
        inventory.splice(index, 1);
      }
    }

    this.add = function(gear = 0) {
      if (inventory.length < capacity) {
        inventory.push(gear);
      } else return console.log("Inventory is full")
    }

    /**
     * getMoney
     *
     * @returns {number}  characters money
     */
    this.getMoney = function() {
      return money;
    }

    /**
     * getInventory
     *
     * @returns {array}  characters items
     */
    this.getInventory = function() {
      return inventory;
    }

    /**
     * setMoney
     *
     * @param  {number} newMoney
     * @returns {void}
     */
    this.setMoney = function(newMoney) {
      money = newMoney;
    }

    /**
     * setInventory
     *
     * @param  {array} newInventory
     * @returns {void}
     */
    this.setInventory = function(newInventory) {
      inventory = newInventory;
    }
  }
}
