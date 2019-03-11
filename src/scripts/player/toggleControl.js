import mageAI from '../objects/classTemplates/mage/mageAI.js'
import barbarianAI from '../objects/classTemplates/barbarian/barbarianAI.js'
import playerUpdate from './playerUpdate';
import playerInput from './playerInput';


export default function toggleControl(scene = {}) {

  if (scene.barbarian && scene.barbarian.controller === 'AI') {
    scene.barbarian.controller = 'player';
    scene.barbarian.AI = playerUpdate();
    if (scene.mage) {
      if (scene.mage.target.currentTarget()) {
        scene.mage.target.currentTarget().healthBar.setBackgroundColor();
      }
      scene.mage.movement.stop();
      scene.mage.controller = 'AI';
      scene.mage.AI = mageAI();
      scene.mage.scene.input.removeAllListeners();
      scene.mage.scene.input.keyboard.removeAllListeners();
    }
    if (scene.barbarian.target.currentTarget()) {
      scene.barbarian.target.currentTarget().healthBar.setBackgroundColor(0xaa3333);
    }

    playerInput(scene.barbarian);
    scene.cameras.main.startFollow(scene.barbarian, true, .05, .05);

  } else if (scene.mage && scene.mage.controller === 'AI') {
    scene.mage.controller = 'player';
    scene.mage.AI = playerUpdate();
    if (scene.barbarian) {
      if (scene.barbarian.target.currentTarget()) {
        scene.barbarian.target.currentTarget().healthBar.setBackgroundColor();
      }
      scene.barbarian.movement.stop();
      scene.barbarian.controller = 'AI';
      scene.barbarian.AI = barbarianAI();
      scene.barbarian.scene.input.removeAllListeners();
      scene.barbarian.scene.input.keyboard.removeAllListeners();
    }
    if (scene.mage.target.currentTarget()) {
      scene.mage.target.currentTarget().healthBar.setBackgroundColor(0xaa3333);
    }
    playerInput(scene.mage);
    scene.cameras.main.startFollow(scene.mage, true, .05, .05);
  }

}
