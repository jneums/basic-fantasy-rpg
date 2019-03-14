

/**
 * UI:
 */
export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });

    // mini-map:
    // abilities:
    // options:
    // warnings:
  }

  create() {



    // action bars:
    this.actionBars = this.add.image(0,0,'ui')
    this.actionBars.setOrigin(0)
    this.actionBars.scaleX = 4
    this.actionBars.scaleY = 4

    this.buttons = this.add.group();

    // load icons onto action bars:
    function loadActionBar(scene, abilities) {
      let x = 1124;
      let y = 192;
      abilities.forEach((ability, i) => {

        let icon = scene.add.image(x, y, ability)
          .setOrigin(0)
        icon.scaleX = 4
        icon.scaleY = 4
        if (i === 5) {
          x += 80;
          y = 192;
        } else {
          y += 80;
        }
      })
    }
    loadActionBar(this, ['auto-attack', 'rush', 'gore', 'savage-blow', 'shout'])
    // events:
    this.registry.events.on('changedata', this.updateData, this);

  }

  updateData(parent, data, key) {
    console.log(parent, data, key)
    // if key says the character switched, reload action bars
  }
}
