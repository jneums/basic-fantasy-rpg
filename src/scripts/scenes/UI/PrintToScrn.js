import FloatingText from '../../objects/FloatingText/FloatingText.js'
import CONST from '../Const';




export default function PrintToScrn(scene) {


  return function log(msg = '', type = '') {
    let position = '';
    let color = 0;

    if (type === 'success') {
      position = 'above';
      color = CONST.PRIEST_COLOR;
    } else {
      position = 'below';
      color = CONST.BARBARIAN_COLOR;
    }


    const errorText = new FloatingText(scene, {
      text: msg,
      size: 20,
      animation: "fade",
      timeToLive: 3000,
      fixedToCamera: true,
      x: CONST.GAME_VIEW_CENTER_X,
      y: CONST.GAME_VIEW_CENTER_Y,
      position: position,
      color: color
    })

  }
}
