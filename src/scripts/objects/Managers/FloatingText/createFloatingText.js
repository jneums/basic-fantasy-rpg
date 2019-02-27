function _textColor (combatObject = {}) {
  switch (combatObject.type) {
    case 'dot':
      return 0xd04648;
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
  const _combatObject = options.combatObject;
  const _side = options.side;

  // set color:
  const _color = _textColor(_combatObject);
  const _size = 4 + options.size;

  // create the element
  let _obj = scene.add.bitmapText(0, 0, 'font', _text, _size).setTint(_color);
  //_obj.anchor.setTo(_spriteAnchor);

  // adjust rotation:
  if (_rotation !== false) {
      _obj.angle = _rotation;
  }

  // set position:
  _obj.x = _parentObj.x - _obj.width / 2;
  _obj.y = _parentObj.y - _obj.height / 2 - 20;

  _obj._animation = _animation;
  _obj._easing = _easing;
  _obj._timeToLive = _timeToLive;
  _obj._distance = _distance;
  _obj._side = _side;

  _obj.setVisible(false);
  // animateFloatingText();
  return _obj;
}
