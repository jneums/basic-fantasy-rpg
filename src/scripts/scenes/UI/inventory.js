import CONST from '../Const';
import { buildLoot } from './loot';

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

}



export { clearInventory, showInventory }
