export default function mapCreator(scene = {}) {
  const map = scene.make.tilemap({ key: 'map' })
  const floor = map.addTilesetImage('dungeon', 'v4', 16, 16, 1, 2)
  const colliderLayer = map.createStaticLayer("colliders", floor, 0, 0)
  const floorLayer = map.createStaticLayer("floor", floor, 0, 0)
  const wallLayer = map.createStaticLayer("walls", floor, 0, 0)
  const specials = map.createStaticLayer("specials", floor, 0, 0)
  colliderLayer.setCollisionByProperty({ collides: true });
  wallLayer.setCollisionByProperty({ collides: true });
  specials.setCollisionByProperty({ collides: true });
  // group to hold all characters
  scene.physics.add.collider(scene.characters, wallLayer, (a, b) => {
    a.movement.stop();
  });
  scene.physics.add.collider(scene.characters, specials, (a, b) => {
    a.movement.stop();
  });
  scene.physics.add.collider(scene.characters, colliderLayer, (a, b) => {
    a.movement.stop();
  });

  return map;
}
