import CONST from '../Const';
import { buildLoot } from './loot';


function selectItem(scene, item) {
  if (!item) return;
  clearInventory(scene);

  const inventoryBackground = scene.add.image(0, 0, 'inventory-background');
  inventoryBackground.scaleX = CONST.SCALE;
  inventoryBackground.scaleY = CONST.SCALE;


  // set active indicator for item tooltip:
  // update description text:
  let name = item.getName();
  let stats = '';
  let statKeys = '';
  let description = item.getDescription();
  let onUse = '';

  switch (item.getType()) {
    case 'questItem':
    break;
    case 'armor':
    stats = [ `${item.armor()}`, item.skillType(), item.lvl(), item.sellPrice(), item.slot() ];
    statKeys = ["AC: ", "Type: ", "Lvl: ", "$$$: ", "Slot: "];
    onUse = item.canUse ? 'equip' : "(can't equip)";
    break;
    case 'weapon':
    stats = [ `${item.dmg().min}-${item.dmg().max}`, item.spd(), item.lvl(), item.sellPrice(), item.slot() ];
    statKeys = ["Dmg: ", "Spd: ", "Lvl: ", "$$$: ", "Slot: "];
    onUse = item.canUse ? 'equip' : "(can't equip)";
    break;
    case 'consumable':
    onUse = 'use';
    break;
    case 'crafting':
    break;
    default:
    break;
  }

  let color = 0;

  if (onUse === "(can't equip)") {
    color = 0xbf7b3f;
  } else {
    color = 0x649438;
  }

  const itemName = scene.add.bitmapText( -16 * 4, (-40 * 4), 'font', name, 18);
  const itemDescription = scene.add.bitmapText( -16 * 4, -34 * 4, 'font', description, 16);
  const itemStats = scene.add.bitmapText( (38 * 4), - 28 * 4, 'font', stats, 16).setOrigin(1, 0).setRightAlign();
  const itemStatKeys = scene.add.bitmapText( -16 * 4, - 28 * 4, 'font', statKeys, 16);
  const equip = scene.add.bitmapText( -16 * 4, 0, 'font', onUse, 18).setTint(color)
  const discard = scene.add.bitmapText( 56 * 4, 0, 'font', 'discard', 18).setTint(0xbf7b3f)
  scene.inventoryContainer.add([inventoryBackground, itemName, itemStats, itemStatKeys, itemDescription, equip, discard])

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

  inventory.forEach(item => {
    if (item.active) {
      selectItem(scene, item);
    }
  })

  inventory.forEach((item, i) => {
    buildLoot(scene, item, i);
  })





}



export { clearInventory, showInventory, selectItem }
