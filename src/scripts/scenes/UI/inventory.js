import CONST from '../Const';
import { buildLoot } from './loot';
import itemTooltip from './itemTooltip';


function clearInventory(scene) {
  scene.inventoryContainer.removeAll(true);
  scene.invTooltip.removeAll(true);
  scene.compTooltip.removeAll(true);
}


function showInventory(scene, {inventory, crystals}) {
  if (!inventory) return;
  clearInventory(scene);


  const inventoryBackground = scene.add.image(0, 0, 'inventory-background');
  inventoryBackground.scaleX = CONST.SCALE;
  inventoryBackground.scaleY = CONST.SCALE;

  const crystalsText = scene.add.bitmapText(-36 * 4, 46 * 4, 'font', crystals, 36).setOrigin(1, 0);


  scene.inventoryContainer.add([inventoryBackground, crystalsText]);

  inventory.forEach(item => {
    if (item.active) {
      itemTooltip(scene, item, 'inventory');
    }
  })

  inventory.forEach((item, i) => {
    buildLoot(scene, item, i);
  })


}



export { clearInventory, showInventory }
