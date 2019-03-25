import 'phaser';
import '@babel/polyfill';

import PreloadScene from './scenes/PreloadScene';
import AuthenticationScene from './scenes/AuthenticationScene';
import CharacterSelectionScene from './scenes/CharacterSelectionScene';
import DungeonScene from './scenes/DungeonScene';
import UIScene from './scenes/UIScene'


const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  backgroundColor: '#1c1117',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [
    PreloadScene,
    AuthenticationScene,
    CharacterSelectionScene,
    DungeonScene,
    UIScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)
})
