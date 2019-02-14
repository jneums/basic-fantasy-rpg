
export default function updateUI(scene = {}) {
  scene.hpText.setText(Math.floor(scene.charlie.stat.getHp()))
  scene.rageText.setText(Math.floor(scene.charlie.rage.getRage()))
  if (scene.charlie.target.getCurrentTarget() !== undefined)
    scene.enemyHpText.setText(Math.floor(scene.charlie.target.getCurrentTarget().stat.getHp()))
  else
    scene.enemyHpText.setText('');
}
