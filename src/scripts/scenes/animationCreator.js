


/**
 * animationCreator - put your animations in here!
 * Eventually we will use an atlas, however it is easier
 * to update and change things if we use individual spritesheets.
 *
 * This function inserts the animaions into the game object,
 * making the animations available from any scene in the game.
 *
 * @param  {Scene} scene
 * @return {void}
 */
export default function animationCreator(scene = {}) {

  // guard animations:
  scene.anims.create({
    key: 'guard-idle',
    frames: scene.anims.generateFrameNumbers('guard-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'guard-run',
    frames: scene.anims.generateFrameNumbers('guard-idle', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'guard-combat',
    frames: scene.anims.generateFrameNumbers('guard-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'guard-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })

  scene.anims.create({
    key: 'guard-sword-idle',
    frames: scene.anims.generateFrameNumbers('guard-sword-idle', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3500
  })
  scene.anims.create({
    key: 'guard-sword-run',
    frames: scene.anims.generateFrameNumbers('guard-sword-idle', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'guard-sword-stab',
    frames: scene.anims.generateFrameNumbers('guard-sword-idle', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })

  // npc animations:
  scene.anims.create({
    key: 'npc-idle',
    frames: scene.anims.generateFrameNumbers('npc-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'npc-run',
    frames: scene.anims.generateFrameNumbers('npc-idle', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'npc-combat',
    frames: scene.anims.generateFrameNumbers('npc-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'npc-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })

  scene.anims.create({
    key: 'npc-unarmed-idle',
    frames: scene.anims.generateFrameNumbers('npc-unarmed-idle', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3500
  })
  scene.anims.create({
    key: 'npc-unarmed-run',
    frames: scene.anims.generateFrameNumbers('npc-unarmed-idle', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'npc-unarmed-stab',
    frames: scene.anims.generateFrameNumbers('npc-unarmed-idle', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })


  // priest animations:
  scene.anims.create({
    key: 'priest-idle',
    frames: scene.anims.generateFrameNumbers('priest-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'priest-run',
    frames: scene.anims.generateFrameNumbers('priest-idle', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'priest-combat',
    frames: scene.anims.generateFrameNumbers('priest-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'priest-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })


  scene.anims.create({
    key: 'priest-sword-nature-cast',
    frames: scene.anims.generateFrameNumbers('priest-sword-nature-cast', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })

  scene.anims.create({
    key: 'mage-sword-frost-cast',
    frames: scene.anims.generateFrameNumbers('mage-sword-frost-cast', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  // mage sword (hand) anims:
  scene.anims.create({
    key: 'priest-sword-idle',
    frames: scene.anims.generateFrameNumbers('mage-sword-idle', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3000
  })
  scene.anims.create({
    key: 'priest-sword-run',
    frames: scene.anims.generateFrameNumbers('mage-sword-run', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'priest-sword-stab',
    frames: scene.anims.generateFrameNumbers('mage-sword-stab', {frames: [0, 1, 2]}),
    frameRate: 9,
    yoyo: true,
    repeat: 0,
  })

  // mage animations:
  // change from barabrian anims as you import mage anims:
  // (barbarian anim are placeholders atm for mage)
  scene.anims.create({
    key: 'mage-idle',
    frames: scene.anims.generateFrameNumbers('mage-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'mage-run',
    frames: scene.anims.generateFrameNumbers('mage-run', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'mage-combat',
    frames: scene.anims.generateFrameNumbers('mage-combat', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'mage-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })

  // mage sword (hand) anims:
  scene.anims.create({
    key: 'mage-sword-idle',
    frames: scene.anims.generateFrameNumbers('mage-sword-idle', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3000
  })
  scene.anims.create({
    key: 'mage-sword-run',
    frames: scene.anims.generateFrameNumbers('mage-sword-run', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'mage-sword-stab',
    frames: scene.anims.generateFrameNumbers('mage-sword-stab', {frames: [0, 1, 2]}),
    frameRate: 9,
    yoyo: true,
    repeat: 0,
  })

  // red mage animations:
  // change from barabrian anims as you import mage anims:
  // (barbarian anim are placeholders atm for mage)
  scene.anims.create({
    key: 'archmage-idle',
    frames: scene.anims.generateFrameNumbers('archmage-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'archmage-run',
    frames: scene.anims.generateFrameNumbers('archmage-idle', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'archmage-combat',
    frames: scene.anims.generateFrameNumbers('archmage-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'archmage-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })

  // mage sword (hand) anims:
  scene.anims.create({
    key: 'archmage-staff-idle',
    frames: scene.anims.generateFrameNumbers('mage-sword-idle', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3000
  })
  scene.anims.create({
    key: 'archmage-staff-run',
    frames: scene.anims.generateFrameNumbers('mage-sword-run', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'archmage-staff-stab',
    frames: scene.anims.generateFrameNumbers('mage-sword-stab', {frames: [0, 1, 2]}),
    frameRate: 9,
    yoyo: true,
    repeat: 0,
  })

  // barbarian animations:
  // notice there are body animations, as well as hand/weapon animations.
  // this is to make it easier to swap out weapons when they are equipped:
  scene.anims.create({
    key: 'barbarian-idle',
    frames: scene.anims.generateFrameNumbers('barbarian-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'barbarian-run',
    frames: scene.anims.generateFrameNumbers('barbarian-run', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'barbarian-combat',
    frames: scene.anims.generateFrameNumbers('barbarian-combat', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'barbarian-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })

  // start the sword animations:
  scene.anims.create({
    key: 'barbarian-sword-idle',
    frames: scene.anims.generateFrameNumbers('barbarian-sword-idle', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3000
  })
  scene.anims.create({
    key: 'barbarian-sword-run',
    frames: scene.anims.generateFrameNumbers('barbarian-sword-run', {start: 0, end: 3}),
    frameRate: 5,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'barbarian-sword-stab',
    frames: scene.anims.generateFrameNumbers('barbarian-sword-stab', {frames: [0, 1, 2]}),
    frameRate: 9,
    yoyo: true,
    repeat: 0,
  })

  // orc body animations:
  scene.anims.create({
    key: 'orc-mask-idle',
    frames: scene.anims.generateFrameNumbers('orc-mask-idle', {start: 0, end: 3}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3200
  })
  scene.anims.create({
    key: 'orc-mask-run',
    frames: scene.anims.generateFrameNumbers('orc-mask-run', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'orc-mask-combat',
    frames: scene.anims.generateFrameNumbers('orc-mask-combat', {start: 0, end: 4}),
    frameRate: 4,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'orc-mask-die',
    frames: scene.anims.generateFrameNumbers('orc-mask-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })
  scene.anims.create({
    key: 'orc-mask-stun',
    frames: scene.anims.generateFrameNumbers('orc-mask-stun', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })

  // and orc sword animations:
  scene.anims.create({
    key: 'orc-sword-idle',
    frames: scene.anims.generateFrameNumbers('orc-sword-idle', {frames: [2, 1, 0]}),
    frameRate: 4,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3200
  })
  scene.anims.create({
    key: 'orc-sword-run',
    frames: scene.anims.generateFrameNumbers('orc-sword-run', {start: 0, end: 3}),
    frameRate: 8,
    yoyo: true,
    repeat: -1,
  })
  scene.anims.create({
    key: 'orc-sword-stab',
    frames: scene.anims.generateFrameNumbers('orc-sword-stab', {frames: [2, 1, 0]}),
    frameRate: 9,
    yoyo: true,
    repeat: 0,
  })

  // poly animation:
  scene.anims.create({
    key: 'polymorph',
    frames: scene.anims.generateFrameNumbers('polymorph', {start: 0, end: 4}),
    frameRate: 2,
    yoyo: true,
    repeat: -1,
  })

  // drinking animation:
  scene.anims.create({
    key: 'small-red',
    frames: scene.anims.generateFrameNumbers('small-red', {frames: [0,1, 1, 0, 0, 0]}),
    frameRate: 2,
    yoyo: false,
    repeat: -1,
  })
}
