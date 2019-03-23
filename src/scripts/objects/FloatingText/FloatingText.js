import createFloatingText from './createFloatingText';
import animateFloatingText from './animateFloatingText';

export default function FloatingText (scene, options) {

  const floatingText = createFloatingText(scene, options);

  animateFloatingText(scene, floatingText);

};
