export default class ResourceBar {

    constructor (scene, type, value)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = 0;
        this.y = 0;
        this.bar.depth = 0;
        this.value = value;
        this.p = 14 / this.value;
        this.type = type;
        this.backgroundColor = 0x1c1117;

        this.draw();
        scene.add.existing(this.bar);
    }

    hideBar()
    {
      this.bar.setVisible(false)
    }

    set (amount)
    {
        this.value = amount;


        this.draw();

        return (this.value === 0);
    }

    setBackgroundColor (newColor = 0x1c1117)
    {
      this.backgroundColor = newColor;

    }

    destroy ()
    {
      this.bar.destroy();
    }

    draw ()
    {
        let fillColor = 0;
        this.bar.clear();

        //  BG
        this.bar.fillStyle(this.backgroundColor);
        this.bar.fillRect(this.x, this.y, 16, 4);

        this.bar.fillStyle(0xdddddd);
        this.bar.fillRect(this.x + 1, this.y + 1, 14, 2);

        if (this.type === 'mana') {
          //  mana

          fillColor = 0x2b6380;
        } else if (this.type === 'rage') {
          //  Rage

          fillColor = 0xd04648;
        } else if (this.type === 'health') {
          //  Health

          fillColor = 0x649438;
        }



        this.bar.fillStyle(fillColor);


        var d = Math.round(this.p * this.value);

        this.bar.fillRect(this.x + 1, this.y + 1, d, 2);
    }

}
