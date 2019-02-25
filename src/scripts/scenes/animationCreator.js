export default function animationCreator(scene = {}) {
  scene.anims.create({
    key: 'player-walk',
    frames: scene.anims.generateFrameNumbers('player', {frames: [0, 1, 0, 2]}),
    frameRate: 7,
    yoyo: false,
    repeat: -1
  })
  scene.anims.create({
    key: 'player-idle',
    frames: scene.anims.generateFrameNumbers('player-idle', {frames: [0, 1, 2]}),
    frameRate: 6,
    yoyo: true,
    repeat: -1,
    repeatDelay: 3000
  })
  scene.anims.create({
    key: 'stab',
    frames: scene.anims.generateFrameNumbers('sword-stab', {frames: [4, 3, 2, 1, 0]}),
    frameRate: 25,
    yoyo: false,
    repeat: 0,
  })
  scene.anims.create({
    key: 'sword-walk',
    frames: scene.anims.generateFrameNumbers('sword-walk', {frames: [0,1]}),
    frameRate: 5,
    yoyo: false,
    repeat: -1,
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
  scene.anims.create({
    key: 'blood-spray',
    frames: scene.anims.generateFrameNumbers('blood', {start: 0, end: 4}),
    frameRate: 5,
    yoyo: false,
    repeat: -1,
  })
  scene.anims.create({
    key: 'snow',
    frames: scene.anims.generateFrameNumbers('snow', {start: 0, end: 4}),
    frameRate: 5,
    yoyo: false,
    repeat: -1,
  })
}
