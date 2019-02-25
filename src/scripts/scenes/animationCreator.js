export default function animationCreator(scene = {}) {
  scene.anims.create({
    key: 'barbarian-run',
    frames: scene.anims.generateFrameNumbers('barbarian-run', {start: 0, end: 4}),
    duration: 500,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'barbarian-idle',
    frames: scene.anims.generateFrameNumbers('barbarian-idle', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 2900
  })
  scene.anims.create({
    key: 'barbarian-die',
    frames: scene.anims.generateFrameNumbers('barbarian-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
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
    repeatDelay: 500
  })

  scene.anims.create({
    key: 'orc-mask-idle',
    frames: scene.anims.generateFrameNumbers('orc-mask-idle', {start: 0, end: 3}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3200
  })
  scene.anims.create({
    key: 'orc-mask-die',
    frames: scene.anims.generateFrameNumbers('orc-mask-die', {start: 0, end: 4}),
    frameRate: 6,
    yoyo: false,
    repeat: 0,
  })
  scene.anims.create({
    key: 'orc-sword',
    frames: scene.anims.generateFrameNumbers('orc-sword', {frames: [0,1]}),
    frameRate: 5,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'small-red',
    frames: scene.anims.generateFrameNumbers('small-red', {frames: [0,1, 1, 0, 0, 0]}),
    frameRate: 2,
    yoyo: false,
    repeat: -1,
  })
}
