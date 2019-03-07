export default function animateFloatingText(scene = {}, floatingText) {

  floatingText.setVisible(true);

  if (floatingText._animation === 'up') {
    let side = floatingText._side;// which way are we facing;
    let firstBezierPointX;
    let firstBezierPointY;
    let secondBezierPointX;
    let secondBezierPointY;
    let endX;
    let endY;
    // set variables used to tween:
    if (side > 0) {
        endX = floatingText.x + 10;
        endY = floatingText.y + -50;
    } else {
        endX = floatingText.x - 10;
        endY = floatingText.y + -50;
    }
    const timeline = scene.tweens.timeline({
      targets: floatingText,
      ease: 'Quint',
      duration: floatingText._timeToLive,
      tweens: [
        { x: endX, y: endY, alpha: 0}
      ],
      onComplete: destroy,
      onCompleteParams: [floatingText]
    });

    function destroy(timeline, targets) {
      targets.destroy();
    }
  }
}
