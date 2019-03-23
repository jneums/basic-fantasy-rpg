
/**
 * Inventory Manager - Takes care of items that are looted,
 * or taken off equipment manager. Also tracks money amount.
 */
export default class Inventory {
  constructor(character) {

    // how many spaces in bag:
    let capacity = 12;

    // how many copper pieces:
    let money = 0;

    // inventory, holds ${capacity} elements:
    let inventory = [];

    /**
     * use - chooses the correct action based
     * on what the item indicates.
     * e.g. food items say 'eat' on them
     *
     * @param  {number} index
     * @returns {void}
     */
    this.use = function(index = 0) {

      // if no item in that spot:
      if (!inventory[index]) return;

      // otherwise:
      const item = inventory[index];

      // if item is a 'consumable':
      if (item.type === 'consumable') {

        // reduce quantity by one:
        --item.quantity;

        // and perform the appropriate action:
        // either eat or drink.
        if (item.action === 'eat') {
          character.consumables.eat();
        } else if (item.action === 'drink') {
          character.consumables.drink();
        }

        // check and see if it was the last one,
        // if so take the empty stack out of inventory.
        if (item.quantity === 0) {
          inventory.splice(index, 1);
        }

        // if it is a quest item or crafting item, it cant be consumed or equipped:
      } else if (item.type === 'questItem' || item.type === 'crafting') {
        console.log("I can't use that");
      } else {
        // if it gets to here, it must be an equippable item.
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

      let stackQty = 0;

      // if space available in existing stack
      const sameStacks = inventory.filter(stack => stack.name === gear.name)
        .reduce((addedToExisting, stack) => {

          if (stack.quantity + gear.quantity < stack.maxStack) {
            stackQty = stack.quantity + gear.quantity;
            return addedToExisting += 1;
          }
        }, 0);

      // not added to stack, so give its own slot
      if (sameStacks) {

        const filteredInventory = inventory.filter(item => item.name !== gear.name);
        const newGear = Object.assign({}, gear, { quantity: stackQty });

        this.setInventory(filteredInventory.concat([newGear]));
      } else {
        if (inventory.length < capacity) {
          this.setInventory(inventory.concat([gear]));
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
