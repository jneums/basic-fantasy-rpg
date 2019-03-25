import CONST from '../Const';



function buildLoot(scene, item, index) {

  let _x = 0;
  let _y = 0;
  let _xOffset = 0;
  let _yOffset = 0;


  // looting position:
  if (index > 5) {
    _xOffset = 360 / 2;
    _yOffset = (-126 / 2) - 13;
    _x = _xOffset;
    _y = (-376 / 2) + ((-index + 6) * _yOffset);
  } else if (index > 0) {
    _xOffset = -512 / 2;
    _yOffset = (-126 / 2) - 13;
    _x = _xOffset;
    _y = (-376 / 2) + (-index * _yOffset);
  } else if (index > -1) {
    _x = -512 / 2;
    _y = -376 / 2;
  }



  // add colored bg:
  const bg = scene.add.image(_x, _y, item.color + '-bg');
  bg.scaleX = CONST.SCALE;
  bg.scaleY = CONST.SCALE;

  // set loot icon over bg:
  const lootIcon = scene.add.image(_x -136, _y, item.icon);
  lootIcon.scaleX = CONST.SCALE;
  lootIcon.scaleY = CONST.SCALE;

  // name:

  // qty:
  let qtyText = item.quantity ? `x${item.quantity}` : ''

  const lootName = scene.add.bitmapText(_x - 100, _y - 18, 'font', item.name + ' ' + qtyText, 16);

   if (index > -1) {
     scene.inventoryContainer.add([bg, lootIcon, lootName]);

   } else {
     scene.lootBoxContainer.add([bg, lootIcon, lootName]);

   }

}



function hideLoot(scene) {
  scene.lootBoxContainer.removeAll(true);
}


function showLoot(scene, loot) {

  const lootBoxBackground = scene.add.image(0, -8, 'loot-box-background');
  lootBoxBackground.scaleX = CONST.SCALE;
  lootBoxBackground.scaleY = CONST.SCALE;

  scene.lootBoxContainer.add(lootBoxBackground);

  buildLoot(scene, loot, -1);

  scene.lootBoxContainer.setVisible(true);
}




export { hideLoot, showLoot, buildLoot }
