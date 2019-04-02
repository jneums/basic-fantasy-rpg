import CONST from '../Const';

const BARB_CLR = 0x6b2222;
const MOB_CLR = 0x8d6845;
const NPC_CLR = 0xe4da99;
const LVL_CLR = 0xccaa44;

const OUTLINE_WIDTH = 20 * 4;
const OUTLINE_HEIGHT = 6 * 4;

const MAIN_WIDTH = 18 * 4;
const MAIN_HEIGHT = 4 * 4;

const OUTLINE = 0x756760;
const MAIN = 0x3a232f;
const HILIGHT = 0x523a42;
const SHADOW = 0x301d27;

export default function NameBar(scene, type) {
  const _x = (type === 'player')
    ? 0
    : CONST.GAME_VIEW_WIDTH;
  const _y = 0;


  let _name = 'Barbarian';
  let _lvl = '34';
  const _nameTxt = scene.add.bitmapText(_x, _y, 'font', '', 24).setTint(MOB_CLR);
  const _lvlTxt = scene.add.bitmapText(_x, _y + 24, 'font', '', 16).setTint(LVL_CLR);;

  if (type === 'target') {
    _nameTxt.setOrigin(1, 0).setRightAlign()
    _lvlTxt.setOrigin(1, 0).setRightAlign()
  }

  this.set = function({name, level}) {
    _name = name;
    _lvl = level;
    _nameTxt.setText(`${_name}`)
    _lvlTxt.setText(`level: ${_lvl}`)
  }


}
