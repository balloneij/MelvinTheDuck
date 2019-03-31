import { Junk, BowlingBall, Vase, Sofa } from "./Junk";

const JUNK_DROP_INTERVAL = 1000;

export default class JunkPortal {
  scene: Phaser.Scene;
  image: Phaser.GameObjects.Image;
  junk: Junk[];
  group: Phaser.Physics.Arcade.Group;
  elapsedTime: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.image = this.scene.add.image(240, 70, "portal");
    this.image.setScale(0.5, 0.25);
    this.scene.tweens.add({
      targets: this.image,
      x: 720,
      ease: Phaser.Math.Easing.Elastic.InOut,
      duration: 5000,
      repeat: -1,
      yoyo: true
    });

    this.junk = [];
    this.group = this.scene.physics.add.group();

    this.elapsedTime = 0;
  }

  update(time: number, delta: number) {
    this.elapsedTime += delta;

    if (this.elapsedTime > JUNK_DROP_INTERVAL) {
      this.elapsedTime -= JUNK_DROP_INTERVAL;
      this.dropJunk();
    }

    this.junk = this.junk.filter(junk => {
      const x = junk.image.x;
      const y = junk.image.y;
      if (0 < x && x < 960 && 0 < y && y < 640) {
        return true;
      }

      this.group.remove(junk.image, true);
      return false;
    });
  }

  dropJunk() {
    const choice = Math.floor(Math.random() * Math.floor(3));
    this.scene.tweens.add({
      targets: this.image,
      scaleX: 0.52,
      scaleY: 0.27,
      ease: Phaser.Math.Easing.Circular.Out,
      duration: 400,
      yoyo: true
    });

    let newJunk: Junk;
    if (choice == 0) {
      newJunk = new BowlingBall(this.scene);
    } else if (choice == 1) {
      newJunk = new Vase(this.scene);
    } else if (choice == 2) {
      newJunk = new Sofa(this.scene);
    }

    const scaleX = newJunk.image.scaleX;
    const scaleY = newJunk.image.scaleY;

    newJunk.image.setScale(0, 0);

    this.scene.tweens.add({
      targets: newJunk.image,
      scaleX: scaleX,
      scaleY: scaleY,
      angle: 720 + 5 - Math.floor(Math.random() * Math.floor(10)),
      ease: Phaser.Math.Easing.Circular.In,
      duration: 400
    });

    newJunk.image.setX(this.image.x);
    newJunk.image.setY(this.image.y);
    this.junk.push(newJunk);
    this.group.add(newJunk.image);
  }
}
