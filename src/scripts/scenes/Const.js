export default (function Const() {

  const constants = {

    // canvas size:
    TOTAL_WIDTH: 1280,
    TOTAL_HEIGHT: 720,

    // text sizes:
    TXT_L: 24,
    TXT_M: 22,
    TXT_S: 20,

    // colors:
    BG_COLOR: 0x1c1117,
    // offwhite:
    TXT_COLOR: 0xccccaa,

    BARBARIAN_COLOR: 0xaa3333,
    MAGE_COLOR: 0x337799,
    PRIEST_COLOR: 0xccaa44,

    // amount the objects/camera is changed:
    SCALE: 4,

    // action bar size:
    ACTION_BAR_WIDTH: 43 * 4,

    GAME_VIEW_WIDTH: 1280 - (43 * 4),

    // width - action bar, / 2.
    GAME_VIEW_CENTER_X: (1280 - (43 * 4)) / 2,

    // height / 2
    GAME_VIEW_CENTER_Y: 720 / 2,

  }

  return Object.freeze(constants);
})()
