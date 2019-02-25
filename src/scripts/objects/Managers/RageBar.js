export default class RageBar {

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
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
        this.bar.fillRect(this.x, this.y, 16, 3);

        //  Rage

        this.bar.fillStyle(0xdddddd);
        this.bar.fillRect(this.x + 1, this.y, 14, 2);


        this.bar.fillStyle(0xd04648);


        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 1, this.y, d, 2);
    }

}
