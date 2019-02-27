export default class HealthBar {

    constructor (scene, x, y, startingHp)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.bar.depth = 1;
        this.value = startingHp;
        this.p = 14 / this.value;

        this.draw();

        scene.add.existing(this.bar);
    }

    set (amount)
    {
        this.value = amount;

        this.draw();

        return (this.value === 0);
    }

    destroy ()
    {
      this.bar.destroy();
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x1c1117);
        this.bar.fillRect(this.x, this.y, 16, 4);

        //  Health
        this.bar.fillStyle(0xdddddd);
        this.bar.fillRect(this.x + 1, this.y + 1, 14, 2);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x649438);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 1, this.y + 1, d, 2);
    }

}
