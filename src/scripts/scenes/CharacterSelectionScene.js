

import animationCreator from './animationCreator';

const H1_SIZE = 24;
const H2_SIZE = 20;
const H3_SIZE = 18;

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterSelectionScene' });

  }

 create() {
   animationCreator(this);

    const selectionContainer = this.add.container(this.scale.width / 2, this.scale.height / 2)

    // create background:
    const background = this.add.image(0, 0, 'character-select').setOrigin(0.5);
    background.scaleX = 4;
    background.scaleY = 4;

    selectionContainer.add(background);

    // create scene title:
    const title = this.add.bitmapText(0,0, 'font', 'Choose Your Character:', H1_SIZE);
    title.x = -(title.width / 2);
    title.y = -238;

    selectionContainer.add(title);


    // add characters to container:
    const characterContainer = this.add.container(selectionContainer.x, selectionContainer.y - 120);

    // barbarian is default selected, starts animated:
    this.barbarian = this.add.sprite(-424, 0, 'barbarian-idle', 0);
    this.barbarian.anims.play('barbarian-combat', true);

    this.mage = this.add.sprite(-244, 0, 'mage-idle');
    this.priest = this.add.sprite(-84, 0, 'priest-idle');

    characterContainer.add([this.barbarian, this.mage, this.priest]);

    this.barbarian.setScale(8).setInteractive();
    this.mage.setScale(8).setInteractive();
    this.priest.setScale(8).setInteractive();


    // add texts:
    const className = this.add.bitmapText(0,0, 'font', 'Barbarian:', H2_SIZE);
    className.setOrigin(.5)

    const text = {
      barbarian: ["Strong and brutal melee fighter"],
      mage: ["Frail and old spell caster"],
      priest: ["Pious and dedicated healer"],
      thief: ["Locked"],
      necro: ["Locked"],
      huntress: ["Locked"],
    }

    let selectedClass = 'barbarian';
    const selectedText = this.add.bitmapText(0, 28, 'font', text[selectedClass], H3_SIZE);
    selectedText.setOrigin(.5);

    selectionContainer.add([ className, selectedText ]);


    // event handlers:
    this.barbarian.on('pointerdown', (pointer) => {
      _stopAllAnims(this);
      selectedClass = 'barbarian'
      className.setText('Barbarian:');
      selectedText.setText(text[selectedClass]);
      this.barbarian.anims.play('barbarian-combat', true);
    })

    this.mage.on('pointerdown', (pointer) => {
      _stopAllAnims(this);
      selectedClass = 'mage';
      className.setText('Mage:');
      selectedText.setText(text[selectedClass]);
      this.mage.anims.play('mage-run', true);
    })

    this.priest.on('pointerdown', (pointer) => {
      _stopAllAnims(this);
      selectedClass = 'priest'
      className.setText('Priest:');
      selectedText.setText(text[selectedClass]);
      this.priest.anims.play('priest-combat', true);
    })



    // add start button:
    const startButton = this.add.bitmapText(0, 0, 'font', 'Continue...', H2_SIZE);
    startButton.x = 494 - startButton.width;
    startButton.y = 198;

    startButton.setInteractive()
    startButton.on('pointerup', (pointer) => {
      this.scene.start('UIScene')
      this.scene.start('DungeonScene', { class: selectedClass });
    })

    selectionContainer.add(startButton);
  }

}

function _stopAllAnims(scene) {
  scene.barbarian.anims.stop();
  scene.barbarian.setTexture('barbarian-idle', 0);

  scene.mage.anims.stop();
  scene.mage.setTexture('mage-idle', 0);

  scene.priest.anims.stop();
  scene.priest.setTexture('priest-idle', 0);
}
