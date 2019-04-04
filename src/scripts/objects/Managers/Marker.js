export default class Marker {

    constructor (scene, type)
    {
        this.icon = scene.add.image(0, 0, type);
        this.icon.depth = this.icon.y;


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
      this.icon.depth = this.icon.y + 16;
    }

}
