export default class Inventory {
  constructor(character) {
    let capacity = 12;
    let money = 0;
    let inventory = [];

    /**
     * use - varies, depending on type
     *
     * @param  {number} index
     * @returns {void}
     */
    this.use = function(index = 0) {
      if (!inventory[index]) return;
      const item = inventory[index];
      if (item.type === 'consumable') {
        --item.quantity;
        if (item.action === 'eat') {
          character.consumables.eat();
        }
        if (item.quantity === 0) {
          inventory.splice(index, 1);
        }
      } else if (item.type === 'questItem' || item.type === 'crafting') {
        console.log("I can't use that");
      } else {
        character.equipment.equip(item);
        inventory.splice(index, 1);
      }
    }

    /**
     * add - item to inventory
     *
     * @param  {object} gear item
     * @returns {void}
     */
    this.add = function(gear = 0) {
      // if space available in existing stack
      const sameStacks = inventory.filter(stack => stack.name === gear.name)
        .reduce((addedToExisting, stack) => {
          if (stack.quantity < stack.maxStack) {
            stack.quantity += 1;
            return addedToExisting += 1;
          }
        }, 0);
      // not added to stack, so give its own slot
      if (!sameStacks) {
        if (inventory.length < capacity) {
          inventory.push(gear);
        } else return console.log("Inventory is full")
      }
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
