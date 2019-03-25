export default function lootBoxPointerDown(pointer, player) {

  // if pointer is outside the box:
  if (pointer.downX > 400 && pointer.downX < 600) {
    if (pointer.downY > 200 && pointer.downY < 500) {
      player.scene.lootBoxActive = false;
      player.scene.registry.set('closeLootBox');
    }
  }
}
