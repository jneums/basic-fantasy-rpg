import FloatingText from '../../objects/FloatingText/FloatingText.js'
import CONST from '../Const';




export default function ErrorLog(scene) {

  return function log(msg = '') {
    const errorText = new FloatingText(scene, {
      text: msg,
      size: 20,
      animation: "fade",
      timeToLive: 3000,
      fixedToCamera: true,
      x: CONST.GAME_VIEW_CENTER_X,
      y: CONST.GAME_VIEW_CENTER_Y,
      position: 'below'
    })

  }
}
