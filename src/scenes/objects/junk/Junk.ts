abstract class Junk {
  // Parent
  scene: Phaser.Scene;

  // Image
  image: Phaser.Physics.Arcade.Image;

  constructor(
    scene: Phaser.Scene,
    image: string,
    scaleX: number,
    scaleY: number
  ) {
    // Load images
    this.image = scene.physics.add.image(150, 150, image);
    this.image.setMass(1);
    this.image.setScale(scaleX, scaleY);
    this.image.setCollideWorldBounds(true);
    this.image.body.onWorldBounds = true;
    this.image.body.collideWorldBounds = true;
  }
}

const VASE_IMAGE_SCALE = 0.125;
class Vase extends Junk {
  constructor(scene: Phaser.Scene) {
    super(scene, "vase", VASE_IMAGE_SCALE, VASE_IMAGE_SCALE);
  }
}

const BOWLINGBALL_IMAGE_SCALE = 0.075;
class BowlingBall extends Junk {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      "bowlingBall",
      BOWLINGBALL_IMAGE_SCALE,
      BOWLINGBALL_IMAGE_SCALE
    );
  }
}

const SOFA_IMAGE_SCALE = 0.2;
class Sofa extends Junk {
  constructor(scene: Phaser.Scene) {
    super(scene, "sofa", SOFA_IMAGE_SCALE, SOFA_IMAGE_SCALE);
  }
}

export { Junk, Vase, BowlingBall, Sofa };
