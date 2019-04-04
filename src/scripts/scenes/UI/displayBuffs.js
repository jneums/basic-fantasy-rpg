import CONST from '../Const';

export default function displayBuffs(scene, buffs, who) {

  const buffText = buffs.map(buff => buff.name + ': '+ _timeFormat(buff.duration));

  const _x = 0;
  const _y = 12 * 4;

  if (who === 'player') {
    scene.selfBuffs.removeAll(true);


    const selfText = scene.add.bitmapText(_x, _y, 'font', buffText, 18)
      .setTint(CONST.TXT_COLOR);
    scene.selfBuffs.add(selfText)

  } else if (who === 'target') {
    scene.targetBuffs.removeAll(true);

    const targetText = scene.add.bitmapText(_x, _y, 'font', buffText, 18)
      .setOrigin(1, 0)
      .setRightAlign()
      .setTint(CONST.TXT_COLOR);
    scene.targetBuffs.add(targetText);
  }

}

function _timeFormat(duration) {
    // change to seconds:
    const secs = duration / 60;
    // change to minutes:
    const mins = Math.floor(secs / 60);
    const remainderSecs = Math.floor(secs % 60) < 10 ? '0' + Math.floor(secs% 60) : Math.floor(secs % 60);

    return mins + ':' + remainderSecs;
}
