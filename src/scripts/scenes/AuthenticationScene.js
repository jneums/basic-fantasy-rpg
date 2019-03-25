

/**
 * TODO: this is where the player will log in
 */
export default class AuthenticationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'AuthenticationScene' })
  }

  create() {

    // create new user, or login existing:

    // if new, get username, pw, and re enter pw:

    // ese if login:
    // get user name and pw:
    console.log('auth scene:')

    this.input.keyboard.on('keyup_SPACE', () => {
      // once player is logged in:
      this.scene.start('CharacterSelectionScene')
    })
  }

}
