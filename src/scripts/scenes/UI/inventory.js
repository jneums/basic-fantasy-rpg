import CONST from '../Const';
import { buildLoot } from './loot';


function selectItem(scene, item) {
  // set active indicator for item tooltip:
  // update description text:
  let name = item.name;
  let stats = '';
  let statKeys = '';
  let description = '';

  switch (item.type) {
    case 'questItem':
    description = ["I need this for a quest."]
    break;
    case 'weapon':
    stats = [ `${item.damage.min}-${item.damage.max}`, item.speed, item.levelRequirement, item.sellPrice, item.slot ];
    statKeys = ["Damage: ", "Speed: ", "Required Level: ", "Sell Price: ", "Slot: " ];
    break;
    case 'consumable':
    description = ["Consume for benefits."]
    break;
    case 'armor':
    stats = [ `${item.armor}`, item.armorType, item.levelRequirement, item.sellPrice, item.slot ];
    statKeys = ["Armor: ", "Type: ", "Required Level: ", "Sell Price: ", "Slot: " ];
    break;
    case 'crafting':
    description = ["Used for crafting."]
    break;
    default:
    break;
  }

  const itemName = scene.add.bitmapText( -38, (-40 * 4), 'font', name, 18);
  const itemStats = scene.add.bitmapText( (56 * 4), -30 * 4, 'font', stats, 16);
  const itemStatKeys = scene.add.bitmapText( -38, (-30 * 4), 'font', statKeys, 16);
  const itemDescription = scene.add.bitmapText( -38, - 38, 'font', description, 16);

  scene.inventoryContainer.add([itemName, itemStats, itemStatKeys, itemDescription])

}

function clearInventory(scene) {
  scene.inventoryContainer.removeAll(true);
}


function showInventory(scene, inventory) {
  if (!inventory) return;

  const inventoryBackground = scene.add.image(0, 0, 'inventory-background');
  inventoryBackground.scaleX = CONST.SCALE;
  inventoryBackground.scaleY = CONST.SCALE;


  scene.inventoryContainer.add([inventoryBackground]);

  inventory.forEach((item, i) => {
    buildLoot(scene, item, i);
  })

  // set active tooltip:
  if (inventory[0]) {
    selectItem(scene, inventory[0])

  }

}



export { clearInventory, showInventory, selectItem }
