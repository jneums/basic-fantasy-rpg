import CONST from '../Const';

const BG_OUTLINE_WIDTH = 250 * 4;
const BG_OUTLINE_HEIGHT = 9 * 4;

const BG_MAIN_WIDTH = 250 * 4;
const BG_MAIN_HEIGHT = 7 * 4;

const FILL_MAIN_WIDTH = 250 * 4;
const FILL_MAIN_HEIGHT = 7 * 4;

const BG_OUTLINE = 0x756760;
const BG_MAIN = 0x3a232f;
const BG_HILIGHT = 0x523a42;
const BG_SHADOW = 0x301d27;

const FILL_MAIN = 0x6b2222;
const FILL_HILIGHT = 0xd04648;
const FILL_SHADOW = 0x4a1818;

export default function XpBar(scene) {
  let _x = CONST.GAME_VIEW_CENTER_X - (BG_OUTLINE_WIDTH / 2);
  let _y = CONST.TOTAL_HEIGHT - 12 * 4;


  let _bar = new Phaser.GameObjects.Graphics(scene);

  let _nextLvl;
  let _percent;
  let _xp = 0;

  // _bar.depth = 10000;


  _draw();
  scene.add.existing(_bar);

  this.set = function({xp, nextLvl}) {
    if (nextLvl !== _nextLvl) {
      _setNextLvl(nextLvl);
    }
    if (xp !== _xp) {
      _xp = xp;
    }
    _draw();
  }

  function _setNextLvl(nextLvl) {
    _nextLvl = nextLvl;
    _percent = FILL_MAIN_WIDTH / _nextLvl;
  }

  function _draw() {

    _bar.clear();
    // bg outline:
    _bar.fillStyle(BG_OUTLINE);
    _bar.fillRect(_x, _y, BG_OUTLINE_WIDTH, BG_OUTLINE_HEIGHT);

    // bg empty fill main:
    _bar.fillStyle(BG_MAIN);
    _bar.fillRect(_x, _y + (1 * 4), BG_MAIN_WIDTH, BG_MAIN_HEIGHT);

    // bg empty fill hi light:
    _bar.fillStyle(BG_HILIGHT);
    _bar.fillRect(_x, _y + BG_MAIN_HEIGHT, BG_MAIN_WIDTH, 1 * 4)

    // bg empty fill shadow:
    _bar.fillStyle(BG_SHADOW);
    _bar.fillRect(_x, _y + 1 * 4, BG_MAIN_WIDTH, 1 * 4)



    // how much to fill:
    const amt = Math.round(_percent * _xp);


    // fill:
    _bar.fillStyle(FILL_MAIN);
    _bar.fillRect(_x, _y + 4, amt, FILL_MAIN_HEIGHT);

    _bar.fillStyle(FILL_HILIGHT);
    _bar.fillRect(_x, _y + 4, amt, 4);

    _bar.fillStyle(FILL_SHADOW)
    _bar.fillRect(_x, _y + BG_MAIN_HEIGHT, amt, 4);

  }


}
