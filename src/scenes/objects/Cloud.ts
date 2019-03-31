const CLOUD_IMAGE_SCALE = 0.333;

export default class Cloud {
  // Parent
  scene: Phaser.Scene;

  // Image
  image: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    // Parent
    this.scene = scene;

    // Load images
    this.image = scene.add.image(0, 64, "cloud");
    this.image.setScale(CLOUD_IMAGE_SCALE, CLOUD_IMAGE_SCALE);
    this.image.setX(960 + this.image.width * CLOUD_IMAGE_SCALE);

    // Animate flying across the screen
    this.scene.tweens.add({
      targets: this.image,
      x: 0 - this.image.width * CLOUD_IMAGE_SCALE,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 50000,
      repeatDelay: 100000,
      repeat: -1
    });

    // Puffing up
    this.scene.tweens.add({
      targets: this.image,
      scaleX: CLOUD_IMAGE_SCALE + CLOUD_IMAGE_SCALE * 0.05,
      scaleY: CLOUD_IMAGE_SCALE + CLOUD_IMAGE_SCALE * 0.05,
      ease: Phaser.Math.Easing.Elastic.InOut,
      duration: 10000,
      repeatDleay: 5000,
      yoyo: true,
      repeat: -1
    });
  }
}
