import createFloatingText from './createFloatingText';
import animateFloatingText from './animateFloatingText';

export default function FloatingText (scene, options) {
  animateFloatingText(scene, createFloatingText(scene, options))
};
