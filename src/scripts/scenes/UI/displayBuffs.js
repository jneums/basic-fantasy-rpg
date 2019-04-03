import CONST from '../Const';

export default function displayBuffs(scene, buffs, who) {

  const buffText = buffs.map(buff => buff.name + ': '+ Math.ceil(buff.duration / 60));

  const _x = 0;
  const _y = 10 * 4;

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
