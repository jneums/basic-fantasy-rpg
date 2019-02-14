/**
 * corpseDisposal
 *
 * @param  {scene} scene which scene to search
 * @returns {array} of characters that were removed
 */
function corpseDisposal(scene = {}) {
  if (scene.children)
    return scene.characters.children.entries.filter(child => child.stat.getHp() <= 0)
      .map((deadChild) => {
        const deadChildCopy = Object.assign(deadChild);
        deadChild.stat.setHp(0)
        deadChild.destroy()
        return deadChildCopy;
      })
}

export {
  corpseDisposal,
};
