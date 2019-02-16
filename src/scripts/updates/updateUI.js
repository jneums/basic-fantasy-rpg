
export default function updateUI(scene = {}) {
  const playerInventory = scene.player.inventory.getInventory();
  let iText = 'Inventory: \n'
  playerInventory.forEach((item, i) => {
    const qty = (item.quantity) ? ': ' + item.quantity : ''
    iText += ('shift+' + (i + 1) + ': ' + item.name + qty + '\n')
  }, scene)
  scene.inventoryText.setText(iText);

  const myStatText =
  `Strength: ${scene.player.stat.strength()}\nAgility: ${scene.player.stat.agility()}\nIntellect: ${scene.player.stat.intellect()}\nStamina: ${scene.player.stat.stamina()}\nSpirit: ${scene.player.stat.spirit()}\nCrit: ${scene.player.stat.crit()}\nAttack Power: ${scene.player.stat.attackPower()}`
  scene.myStats.setText(myStatText);
  let myBuffText = '';
  scene.player.buffs.getBuffs().forEach(buff => myBuffText += buff.name + ' : ' + Math.round(buff.duration/60) + '\n');
  scene.hpText.setText(Math.floor(scene.player.stat.hp()))
  scene.rageText.setText(Math.floor(scene.player.rage.getRage()))
  scene.myBuffs.setText(myBuffText);
  const mySwingTimerText = scene.player.timer.getSwingTimerMainHand() / 60;
  const myWeaponTimer = scene.player.equipment.getWeaponSpeed('main');
  scene.mySwingTimer.setText((mySwingTimerText).toFixed(2));

  if (scene.player.target.getCurrentTarget() !== undefined) {
    const enemySwing = scene.player.target.getCurrentTarget().timer.getSwingTimerMainHand() / 60;
    const enemyWeapon = scene.player.target.getCurrentTarget().equipment.getWeaponSpeed('main');
    scene.enemySwingTimer.setText((enemySwing).toFixed(2));
    let buffText = '';
    scene.enemyHpText.setText(Math.floor(scene.player.target.getCurrentTarget().stat.hp()))
    scene.player.target.getCurrentTarget().buffs.getBuffs().forEach(buff => buffText += buff.name + ' : ' + Math.round(buff.duration/60) + '\n');
    scene.enemyBuffs.setText(buffText);
  } else {
    scene.enemyHpText.setText('');
    scene.enemyBuffs.setText('');
    scene.enemySwingTimer.setText('');
  }
}
