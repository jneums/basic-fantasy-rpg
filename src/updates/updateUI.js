
export default function updateUI(scene = {}) {
  let myBuffText = '';
  scene.charlie.buffs.getBuffs().forEach(buff => myBuffText += buff.name + ' : ' + Math.round(buff.duration/60) + '\n');
  scene.hpText.setText(Math.floor(scene.charlie.stat.getHp()))
  scene.rageText.setText(Math.floor(scene.charlie.rage.getRage()))
  scene.myBuffs.setText(myBuffText);
  const mySwingTimerText = scene.charlie.timer.getSwingTimerMainHand() / 60;
  const myWeaponTimer = scene.charlie.equipment.getWeaponSpeed('main');
  scene.mySwingTimer.setText((mySwingTimerText).toFixed(2));

  if (scene.charlie.target.getCurrentTarget() !== undefined) {
    const enemySwing = scene.charlie.target.getCurrentTarget().timer.getSwingTimerMainHand() / 60;
    const enemyWeapon = scene.charlie.target.getCurrentTarget().equipment.getWeaponSpeed('main');
    scene.enemySwingTimer.setText((enemySwing).toFixed(2));
    let buffText = '';
    scene.enemyHpText.setText(Math.floor(scene.charlie.target.getCurrentTarget().stat.getHp()))
    scene.charlie.target.getCurrentTarget().buffs.getBuffs().forEach(buff => buffText += buff.name + ' : ' + Math.round(buff.duration/60) + '\n');
    scene.enemyBuffs.setText(buffText);
  } else {
    scene.enemyHpText.setText('');
    scene.enemyBuffs.setText('');
    scene.enemySwingTimer.setText('');
  }
}
