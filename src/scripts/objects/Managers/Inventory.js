
/**
 * Inventory Manager - Takes care of items that are looted,
 * or taken off equipment manager. Also tracks money amount.
 */
export default class Inventory {
  constructor(character) {

    // how many spaces in bag:
    let capacity = 16;

    // how many copper pieces:
    let crystals = 0;

    // inventory, holds ${capacity} elements:
    let inventory = [];

    let _activeIndex = -1;

    this.dismantleActive = function() {
      if (!inventory[_activeIndex]) return;
      inventory[_activeIndex].sell(character);
    }


    this.useActive = function() {
      if (!inventory[_activeIndex]) return;
      inventory[_activeIndex].active = false;
      this.use(_activeIndex);
    }

    this.discardActive = function(amt) {
      if (!inventory[_activeIndex]) return;
      if (inventory[_activeIndex].getQty() > amt) {
        while (amt--) {
          inventory[_activeIndex].dec()
        }
      } else {
        inventory[_activeIndex].active = false;
        inventory = inventory.filter((item, i) => i !== _activeIndex);
      }
    }

    this.setActive = function(index) {
      if (!inventory[index]) return;

      if (inventory[_activeIndex]) {
        inventory[_activeIndex].active = false;
      }
      _activeIndex = index;
      inventory[_activeIndex].active = true;
    }

    this.getActive = function() {
      if (!inventory[_activeIndex]) return;
      return inventory[_activeIndex];
    }

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
      // or if it is not an Item:
      if (!inventory[index].hasOwnProperty('getType')) return;
      // otherwise:
      const item = inventory[index];
      const type = item.getType();
      item.active = false;

      // if item is a 'consumable':
      if (type === 'consumable') {

        // reduce quantity by one:
        item.dec();

        // and perform the appropriate action:
        // either eat or drink.
        if (item.getAction() === 'eat') {
          character.consumables.eat();
        } else if (item.getAction() === 'drink') {
          character.consumables.drink();
        }

        // check and see if it was the last one,
        // if so take the empty stack out of inventory.
        if (item.getQty() === 0) {
          inventory.splice(index, 1);
        }

        // if it is a quest item or crafting item, it cant be consumed or equipped:
      } else if (type === 'questItem' || type === 'crafting') {
        console.log("I can't use that");
      } else {
        // if it gets to here, it must be an equippable item.
        //returns true if swapped:
        character.equipment.equip(item);

        if (inventory.length) {
          _activeIndex = inventory.length - 1;
        }

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
      if (!gear.hasOwnProperty('getName')) return;
      // if space available in existing stack
      const sameStacks = inventory.filter(stack => stack.getName() === gear.getName())
        .reduce((addedToExisting, stack) => {

          if (stack.getQty() + gear.getQty() < stack.getMax()) {
            stackQty = stack.getQty() + gear.getQty();
            return addedToExisting += 1;
          }
        }, 0);

      if (sameStacks) {

        const filteredInventory = inventory.filter(item => item.getName() !== gear.getName());
        const newGear = Object.assign({}, gear)
        newGear.setQty(stackQty);

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
    this.getCrystals = function() {
      return crystals;
    }

    this.isFull = function() {
      if (inventory.length >= capacity) return true;
      else return false;
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
    this.addCrystals = function(newCrystals) {
      crystals += newCrystals;
    }

    this.removeCrystals = function (amount) {
      if (crystals - amount < 0) return false;
      else {
        crystals -= amount;
        return true;
      }
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
