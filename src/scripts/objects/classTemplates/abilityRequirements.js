import FloatingText from '../FloatingText/FloatingText.js'

// log ability error:
function combatError(character, type) {
  let error = '';
  switch (type) {
    case 'casting':
      break;
    case 'target':
      error = 'I need a target!';
      break;
    case 'range':
      error = 'I need to get closer!';
      break;
    case 'team':
      error = "Wrong team!"
      break;
    case 'dead':
      error = "I can't attack that!";
      break;
    case 'rage':
    case 'mana':
    case 'energy':
      error = `I don't have enough ${type}.`
      break;
    default: break;

  }

  const errorText = new FloatingText(character.scene, {
    text: error.toUpperCase(),
    size: 2,
    animation: "fade",
    timeToLive: 2000,
    fixedToCamera: true
  })


}

// requirement check:
export default function abilityRequirements(character = {}, config = {}) {
  const _target = character.target.currentTarget();
  const _benefical = config.beneficial || false;
  const _resourceAmount = config.resourceAmount || 0;
  const _resource = config.resource || 'rage';
  const _range = config.range || 0;
  const _needsTarget = config.needsTarget || false;

  if (_needsTarget) {
    // check for target:
    if (!_target) {
      combatError(character, 'target');
      return false;
    }

    if (_benefical) {
      // is target aggresive:
      if (_target.team() !== character.team()) {
        combatError(character, 'team');
        return false;
      }

    } else {
      // is target friendly:
      if (_target.team() === character.team()) {
        combatError(character, 'team');
        return false;
      }
    }


    if (!character.target.rangeCheck(_target, _range)) {
      combatError(character, 'range');
      return false;
    }

    // is target alive:
    if (_target.combat.isDead()) {
      combatError(character, 'dead');
      return false;
    }
  }

  // is currently casting:
  if (character.casting()) {
    combatError(character, 'casting');
    return false;
  }
  // has enough resources:
  switch (_resource) {
    case 'rage':
      if (!character.rage.spendRage(_resourceAmount)) {
        combatError(character, 'rage');
        return false;
      }
      break;
    case 'mana':
    if (!character.mana.spendMana(_resourceAmount)) {
      combatError(character, 'mana');
      return false;
    }
    break;
    case 'energy':
    break;
  }

  character.movement.faceTarget(_target);
  return true;
}
