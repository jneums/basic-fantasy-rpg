
/**
 * inventoryPointerDown - called when the inventory
 * is open and the user has 'clicked' the screen.
 *
 * useful so the click does not register as a moveToMoveTarget()
 * action.
 *
 * @param  {type} pointer   description
 * @param  {type} character description
 * @return {type}           description
 */
export default function inventoryPointerDown(pointer, character) {
  console.log('clicked on inventory')
}
