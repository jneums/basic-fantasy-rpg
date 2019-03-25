
/**
 * createFloatingText - create text group
 *
 * @param  {Scene} scene the text belongs to
 * @param  {object} options for creating text
 * @returns {object} text object that was put into group
 */
export default function createFloatingText(scene = {}, options = {}) {

  // setting default options if none were provided:
  const _text = options.text || "";

  // position:
  const _x = options.x || "auto";
  const _y = options.y || "auto";

  const _posisition = options.position || "below";
  // rotation:
  const _rotation = options.rotation || false;
  // parent object reference:
  const _parentObj = options.parentObj || null;
  // which animation to use:
  const _animation = options.animation || "up"; // explode, smoke, custom, directional: up, down, left, right, fade, physics
  // how far to move during animation:
  const _distance = options.distance || 40;
  // tween type:
  const _easing = options.easing || Phaser.Math.Easing.Quintic.Out;
  // how long to stay:
  const _timeToLive = options.timeToLive || 5000; // in ms
  // whether or not to move with the camera:
  const _fixedToCamera = options.fixedToCamera || false;
  const _combatObject = options.combatObject || null;
  const _side = options.side || null;

  // set color:
  const _color = options.color || _textColor(_combatObject);
  const _size = 4 + options.size;

  // create the element
  let _obj = scene.add.dynamicBitmapText(0, 0, 'font', _text, _size)
    .setTint(_color)
  //_obj.anchor.setTo(_spriteAnchor);

  // adjust rotation:
  if (_rotation !== false) {
      _obj.angle = _rotation;
  }

  if (_parentObj) {
    // set position:
    _obj.x = _parentObj.x - _obj.width / 2;
    _obj.y = _parentObj.y - _obj.height / 2 - 20;
  } else {
    const yOffset = (_posisition === "below") ? 40 : -40
    _obj.x = (scene.cameras.main.midPoint.x) - _obj.width / 2;
    _obj.y = (scene.cameras.main.midPoint.y + yOffset) - _obj.height / 2;
  }

  if (_fixedToCamera) {
    // _obj.setScrollFactor(0)

  }


  _obj._animation = _animation;
  _obj._easing = _easing;
  _obj._timeToLive = _timeToLive;
  _obj._distance = _distance;
  _obj._side = _side;

  _obj.setVisible(false);
  // animateFloatingText();
  return _obj;
}

function _textColor (combatObject) {
  if (!combatObject) return 0xd04648;
  switch (combatObject.type()) {
    case 'magic':
    case 'wand':
      switch (combatObject.damageType()) {
        case 'fire':
          return 0xbf7b3f;
        case 'frost':
          return 0x8ebbd1;
        case 'arcane':
          return 0x5ba3c7;
        case 'shadow':
          return 0x944a9c;
        case 'holy':
          return 0xe4da99;
      }
    case 'dot':
    case 'special':
      return 0xccaa44;
    case 'eat':
    case 'heal':
      return 0x649438;
    case 'drink':
      return 0x337799;
    case 'autoAttack':
      return 0xc8dae3;
    default:
      break;
  }
}
