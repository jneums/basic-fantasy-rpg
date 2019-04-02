import CONST from '../Const';
import { clearInventory } from './inventory';

export default function itemTooltip(scene, item, type) {
  if (!item || !item.hasOwnProperty('getName')) return;

  if (type === 'compare') {
    scene.compTooltip.removeAll(true);

  } else if (type === 'equip') {
    scene.itemContainer.removeAll(true)

  } else if (type === 'inventory') {
    scene.compTooltip.removeAll(true);
    scene.invTooltip.removeAll(true);
  }

  let name = item.getName();
  let stats = '';
  let statKeys = '';
  let description = item.getDescription();
  let onUse = '';
  let statBonusKey = ''

  switch(item.getType()) {
    case 'armor':
    statBonusKey = Object.keys(item.statBonus())[0];;
    stats = [ item.statBonus()[statBonusKey], item.armor(), item.skillType(), item.lvl(), item.sellPrice(), item.slot() ];
    statKeys = [`${statBonusKey}: `, "Armor: ", "Type: ", "Level Req: ", "Value: ", "Slot: "];
    onUse = item.canUse ? 'equip' : "";

    break;
    case 'weapon':
    statBonusKey = Object.keys(item.statBonus())[0];;
    stats = [ item.statBonus()[statBonusKey], `${item.dmg().min}-${item.dmg().max}`, item.spd(), item.lvl(), item.sellPrice(), item.slot() ];
    statKeys = [`${statBonusKey}: `, "Damage: ", "Speed: ", "Level Req: ", "Value: ", "Slot: "];
    onUse = item.canUse ? 'equip' : "";

    break;
    case 'questItem':
    break;
    case 'consumable':
    onUse = 'use';
    break;
    case 'crafting':
    break;
  }

  let color = 0;

  if (onUse === "") {
    color = 0xbf7b3f;
  } else {
    color = 0x649438;
  }

  let title, itemName, itemStats, itemStatKeys;
  let _x, _y;

  if (type === 'compare') {

    _x = -12 * 4;
    _y = 12 * 4;

    title = scene.add.bitmapText(_x, _y, 'font', 'equipped: ', 16);
    _addTexts(scene, item);
    scene.compTooltip.add([title, itemName, itemStats, itemStatKeys]);

  } else if (type === 'equip') {

    _x = -54 * 4;
    _y = -46 * 4;

    _addTexts(scene, item);

    scene.itemContainer.add([itemName, itemStats, itemStatKeys])
  } else if (type === 'inventory') {

    _x = -12 * 4;
    _y = -46 * 4;
    _addTexts(scene, item);
    const itemDescription = scene.add.bitmapText( -12 * 4, -34 * 4, 'font', description, 16);
    const equip = scene.add.bitmapText( -12 * 4, 0, 'font', onUse, 18).setTint(color)
    const discard = scene.add.bitmapText( 46 * 4, 0, 'font', 'discard', 18).setTint(0xbf7b3f)
    scene.invTooltip.add([itemName, itemStats, itemStatKeys, equip, discard])
    if (item.getType() === 'consumable') {
      scene.invTooltip.add(itemDescription)
    }

  }

  function _addTexts(scene, item) {
    itemName = scene.add.bitmapText(_x, _y + (6 * 4), 'font', name, 18).setTint(item.getTint());
    itemStats = scene.add.bitmapText(_x + (90 * 4), _y + (14 * 4), 'font', stats, 16).setOrigin(1, 0).setRightAlign();
    itemStatKeys = scene.add.bitmapText(_x, _y + (14 * 4), 'font', statKeys, 16);
  }

}
