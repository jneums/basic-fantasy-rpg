export default class Marker {

    constructor (scene, type)
    {
        this.icon = scene.add.image(0, 0, type + '-marker');
        this.icon.depth;


    }

    hide()
    {
      this.icon.setVisible(false)
    }


    destroy ()
    {
      this.icon.destroy();
    }

    update (x, y)
    {
      this.icon.x = x;
      this.icon.y = y   - 20;
    }

}
