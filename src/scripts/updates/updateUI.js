
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
  // show resources:
  if (scene.player.getCharacterClass() === 'warrior') {
    scene.resourceText.setText(Math.floor(scene.player.rage.rage()));
  } else if (scene.player.getCharacterClass() === 'mage') {
    scene.resourceText.setText(Math.floor(scene.player.mana.mana()));
  }
  scene.hpText.setText(Math.floor(scene.player.stat.hp()));
  scene.myBuffs.setText(myBuffText);
  const mySwingTimerText = scene.player.timer.getSwingTimerMainHand() / 60;
  const myWeaponTimer = scene.player.equipment.getWeaponSpeed('main');
  scene.mySwingTimer.setText((mySwingTimerText).toFixed(2));

  if (scene.player.target.currentTarget() !== undefined) {
    const enemySwing = scene.player.target.currentTarget().timer.getSwingTimerMainHand() / 60;
    const enemyWeapon = scene.player.target.currentTarget().equipment.getWeaponSpeed('main');
    scene.enemySwingTimer.setText((enemySwing).toFixed(2));
    let buffText = '';
    scene.enemyNameText.setText(scene.player.target.currentTarget().getName())
    scene.enemyHpText.setText(Math.floor(scene.player.target.currentTarget().stat.hp()))
    scene.player.target.currentTarget().buffs.getBuffs().forEach(buff => buffText += buff.name + ' : ' + Math.round(buff.duration/60) + '\n');
    scene.enemyBuffs.setText(buffText);
  } else {
    scene.enemyHpText.setText('');
    scene.enemyBuffs.setText('');
    scene.enemySwingTimer.setText('');
    scene.enemyNameText.setText('');
  }
}
