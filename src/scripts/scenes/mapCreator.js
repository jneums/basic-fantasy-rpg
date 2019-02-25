export default function mapCreator(scene = {}) {
  const map = scene.make.tilemap({ key: 'map' })
  const floor = map.addTilesetImage('dungeon', 'v4')
  const colliderLayer = map.createStaticLayer("colliders", floor, 0, 0)
  const floorLayer = map.createStaticLayer("floor", floor, 0, 0)
  const wallLayer = map.createStaticLayer("walls", floor, 0, 0)
  const specials = map.createStaticLayer("specials", floor, 0, 0)
  colliderLayer.setCollisionByProperty({ collides: true });
  wallLayer.setCollisionByProperty({ collides: true });
  specials.setCollisionByProperty({ collides: true });
  // group to hold all characters
  scene.physics.add.collider(scene.characters, wallLayer);
  scene.physics.add.collider(scene.characters, specials);
  scene.physics.add.collider(scene.characters, colliderLayer);
  scene.physics.add.collider(scene.characters, scene.characters);
  return map;
}