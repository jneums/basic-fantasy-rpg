import mageAI from '../objects/classTemplates/mage/mageAI.js'
import barbarianAI from '../objects/classTemplates/barbarian/barbarianAI.js'
import playerUpdate from './playerUpdate';
import inputListeners from './inputListeners';

let index = 0;

export default function toggleControl(scene = {}) {
  index++;
  const playerCharacters = scene.characters.getChildren().filter(child => child.team() !== 'mob');
  const currentCharacter = playerCharacters.filter(character => character.controller === 'player')[0]
  const nextCharacter = playerCharacters[index % playerCharacters.length]
  // starting with mage, switch to barbarian:
  if (currentCharacter && nextCharacter) {
    // change character flag:
    nextCharacter.controller = 'player';

    // strip all input and visuals from current character:
    if (currentCharacter) {
      strip(currentCharacter);
    }

    inputListeners(nextCharacter);
    scene.cameras.main.startFollow(nextCharacter, true, .05, .05);
  }
}

// reduces repeating self:
function strip(character = {}) {
  character.target.clearCurrentTarget();
  character.controller = 'AI';
  character.movement.stop();
  character.scene.input.removeAllListeners();
  character.scene.input.keyboard.removeAllListeners();
}
