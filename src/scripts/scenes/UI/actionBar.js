import CONST from '../Const';


function clearActionBar(scene) {
  scene.icons.clear(true, true)
}

// load icons onto action bars:
function loadActionBar(scene, abilities) {

  // action bars:
  const actionBars = scene.add.image(0,0,'ui');
  actionBars.setOrigin(0);
  actionBars.scaleX = CONST.SCALE;
  actionBars.scaleY = CONST.SCALE;

  let x = 1124;
  let y = 60;
  abilities.forEach((ability, i) => {

    // if even, x = 1124, if odd, x = 1124 + 80;
    // every two, increase y by 80.
    if (i % 2 === 0) {
      x = 1124;
      y += 80
    } else {
      x = 1124 + 80;
    }

    if (!ability) return;
    let icon = scene.add.image(x, y, ability)
      .setOrigin(0)

    scene.icons.add(icon);
    icon.scaleX = 4
    icon.scaleY = 4
  })
}


export { clearActionBar, loadActionBar };
