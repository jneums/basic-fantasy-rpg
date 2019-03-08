

/**
 * TODO: this is where the character selection and menus
 * will be.
 */
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.scene.start('CharacterCreationScene')
  }

  update() {
  }
}
