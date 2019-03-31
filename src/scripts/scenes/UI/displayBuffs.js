export default function displayBuffs(scene, buffs, who) {

  const buffText = buffs.map(buff => buff.name + ': '+ buff.duration);


  if (who === 'player') {
    scene.selfBuffs.removeAll(true);


    const selfText = scene.add.bitmapText(0, 0, 'font', buffText, 18);
    scene.selfBuffs.add(selfText)

  } else if (who === 'target') {
    scene.targetBuffs.removeAll(true);

    const targetText = scene.add.bitmapText(0, 0, 'font', buffText, 18).setOrigin(1, 0).setRightAlign();
    scene.targetBuffs.add(targetText);
  }

}
