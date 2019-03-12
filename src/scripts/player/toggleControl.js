import mageAI from '../objects/classTemplates/mage/mageAI.js'
import barbarianAI from '../objects/classTemplates/barbarian/barbarianAI.js'
import playerUpdate from './playerUpdate';
import inputListeners from './inputListeners';


export default function toggleControl(scene = {}) {
  const currentCharacter = scene.availableCharacters[0];
  const nextCharacter = scene.availableCharacters[1];
  // starting with mage, switch to barbarian:
  if (scene[currentCharacter] && scene[currentCharacter].controller === 'AI') {
    scene[currentCharacter].controller = 'player';
    if (scene[nextCharacter]) {
      swap(scene[nextCharacter]);
    }

    inputListeners(scene[currentCharacter]);
    scene.cameras.main.startFollow(scene[currentCharacter], true, .05, .05);
    scene.availableCharacters.shift();
    scene.availableCharacters.push(currentCharacter)
  }
}

// reduces repeating self:
function swap(character = {}) {
  character.movement.stop();
  character.controller = 'AI';
  character.scene.input.removeAllListeners();
  character.scene.input.keyboard.removeAllListeners();
}
