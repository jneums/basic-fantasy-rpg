import CONST from '../Const';



function buildLoot(scene, item, index) {

  let _x = 0;
  let _y = 0;
  let _xOffset = 0;
  let _yOffset = 0;
  let _bg = '-bg';
  let _iconOffset = -32 * 4;


  // looting position:
  if (index > 15) {
    _xOffset = 21 * 4;
    _yOffset = 21 * 4;
    _x = -94 * 4 + (_xOffset * (index - 16));
    _y = -33 * 4 + (_yOffset * 4);
    _bg = '-sm-bg';
    _iconOffset = 0;

  } else if (index > 11) {
    _xOffset = 21 * 4;
    _yOffset = 21 * 4;
    _x = -94 * 4 + (_xOffset * (index - 12));
    _y = -33 * 4 + (_yOffset * 3);
    _bg = '-sm-bg';
    _iconOffset = 0;


  } else if (index > 7) {
    _xOffset = 19 * 4;
    _yOffset = 19 * 4;
    _x = -91 * 4 + (_xOffset * (index - 8));
    _y = -29 * 4 + (_yOffset * 2);
    _bg = '-sm-bg';
    _iconOffset = 0;


  } else if (index > 3) {
    _xOffset = 19 * 4;
    _yOffset = 19 * 4;
    _x = -91 * 4 + (_xOffset * (index - 4));
    _y = -29 * 4 + (_yOffset);
    _bg = '-sm-bg';
    _iconOffset = 0;


  } else if (index > 0) {
    _xOffset = 19 * 4;
    _x = -91 * 4 + (_xOffset * index);
    _y = -29 * 4;
    _bg = '-sm-bg';
    _iconOffset = 0;


  } else if (index > -1) {
    _x = -91 * 4;
    _y = -29 * 4;
    _bg = '-sm-bg';
    _iconOffset = 0;


  }



  // add colored bg:
  const bg = scene.add.image(_x, _y, item.color + _bg);
  bg.scaleX = CONST.SCALE;
  bg.scaleY = CONST.SCALE;

  // set loot icon over bg:
  const lootIcon = scene.add.image(_x + _iconOffset, _y, item.icon);
  lootIcon.scaleX = CONST.SCALE;
  lootIcon.scaleY = CONST.SCALE;

  // loot tooltip name:

  // qty:
  const lootName = scene.add.bitmapText(_x - 100, _y - 18, 'font', item.name, 16);

  // if building loot for inventory:
  if (index > -1) {
   const qtyText = scene.add.bitmapText(_x, _y, 'font', item.quantity, 26);
   scene.inventoryContainer.add([bg, lootIcon, qtyText]);

  // if building loot for looting mob:
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
