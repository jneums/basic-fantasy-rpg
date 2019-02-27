export default function animateFloatingText(scene = {}, floatingText) {

  floatingText.setVisible(true);

  if (floatingText._animation === 'physics') {
    let side = floatingText._side;// which way are we facing;
    let firstBezierPointX;
    let firstBezierPointY;
    let secondBezierPointX;
    let secondBezierPointY;
    let endX;
    let endY;
    // set variables used to tween:
    if (side > 0) {
        firstBezierPointX = floatingText.x + 25;
        firstBezierPointY = floatingText.y - 50;
        secondBezierPointX = floatingText.x + 50;
        secondBezierPointY = floatingText.y - 25;
        endX = floatingText.x + 100;
        endY = floatingText.y + 50;
    } else {
        firstBezierPointX = floatingText.x - 25;
        firstBezierPointY = floatingText.y - 50;
        secondBezierPointX = floatingText.x - 50;
        secondBezierPointY = floatingText.y - 25;
        endX = floatingText.x - 100;
        endY = floatingText.y + 50;
    }
    const timeline = scene.tweens.timeline({
      targets: floatingText,
      ease: 'Linear',
      duration: floatingText._timeToLive,
      tweens: [
        { x: firstBezierPointX, y: firstBezierPointY, alpha: 25 },
        { x: secondBezierPointX, y: secondBezierPointY, alpha: 5 },
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
