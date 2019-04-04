import CONST from './Const';
import formatDialogue from './formatDialogue';

// TODO:: do not need to create ALL the animations:
import animationCreator from './animationCreator';



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
    const title = this.add.bitmapText(0,0, 'font', 'Choose Your Character:', CONST.TXT_L).setTint(CONST.TXT_COLOR);
    title.x = -(title.width / 2);
    title.y = -238;

    selectionContainer.add(title);


    // add characters to container:
    const characterContainer = this.add.container(selectionContainer.x, selectionContainer.y - 120);

    // barbarian is default selected, starts animated:
    this.barbarian = this.add.sprite(-424, 14, 'barbarian-idle', 0);

    this.barbarian.anims.play('barbarian-combat', true);

    this.mage = this.add.sprite(-244, 14, 'mage-idle');
    this.priest = this.add.sprite(-84, 14, 'priest-idle');

    characterContainer.add([this.barbarian, this.mage, this.priest]);

    this.barbarian.setScale(6).setInteractive();

    this.mage.setScale(6).setInteractive();
    this.priest.setScale(6).setInteractive();


    // add texts:
    const className = this.add.bitmapText(0,0, 'font', 'Labyrinth Barbarian:', CONST.TXT_M).setTint(CONST.BARBARIAN_COLOR);
    className.setOrigin(.5)

    const text = {
      barbarian: formatDialogue("You have spent all your days building your strength and ability to wield weapons. As the strongest, you are the first one into battle, terrifying your foes and inspiring your allies. Because of your strength and weapons skills, you are able to use any armor and can learn to use any weapon.", 'characterSelection'),
      mage: formatDialogue("While your friends were all working out and practicing their weapon abilities, you chose instead to read books and experiment with the elements. As a result, your body is weak and fragile, you sometimes tremble when you have to lift a heavy book off the shelf. You make up for this weakness by casting incredibly powerful spells.", 'characterSelection'),
      priest: formatDialogue("Like your mage friends, you also were uncomfortable with physical exertion. However, you chose instead to devote yourself to spirituality. Through years of pious studies and worship of the old gods, you have gained their favor. They have chosen to grant you powers otherwise unattainable.", 'characterSelection'),
      thief: ["Locked"],
      necro: ["Locked"],
      huntress: ["Locked"],
    }

    let selectedClass = 'barbarian';
    const selectedText = this.add.bitmapText(0, 98, 'font', text[selectedClass], CONST.TXT_S)
      .setTint(CONST.TXT_COLOR)
      .setCenterAlign()
      .setOrigin(.5);

    selectionContainer.add([ className, selectedText ]);


    // event handlers:
    this.barbarian.on('pointerdown', (pointer) => {
      _stopAllAnims(this);
      selectedClass = 'barbarian'
      className.setText('Labyrinth Barbarian:').setTint(CONST.BARBARIAN_COLOR);
      selectedText.setText(text[selectedClass]);
      this.barbarian.anims.play('barbarian-combat', true);
    })

    this.mage.on('pointerdown', (pointer) => {
      _stopAllAnims(this);
      selectedClass = 'mage';
      className.setText('Ice Hardened Battle Mage:').setTint(CONST.MAGE_COLOR);
      selectedText.setText(text[selectedClass]);
      this.mage.anims.play('mage-run', true);
    })

    this.priest.on('pointerdown', (pointer) => {
      _stopAllAnims(this);
      selectedClass = 'priest'
      className.setText('Priest of the Old Gods:').setTint(CONST.PRIEST_COLOR);
      selectedText.setText(text[selectedClass]);
      this.priest.anims.play('priest-combat', true);
    })



    // add start button:
    const startButton = this.add.bitmapText(0, 0, 'font', 'Continue...', CONST.TXT_M).setTint(0x649438);
    startButton.x = 494 - startButton.width;
    startButton.y = 198;

    startButton.setInteractive()

    startButton.on('pointerup', (pointer) => {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(500, () => {

        this.scene.start('UIScene')
        this.scene.start('DungeonScene', { class: selectedClass });
        this.scene.stop('CharacterSelectionScene');

      });
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
