import Controller from "../../controllers/Controller";

// Movement constants
const MAX_JUMPS = 3;
const MOVEMENT_SPEED = 350;
const JUMP_VELOCITY = 500;
const DUCK_IMAGE_SCALE = 0.125;

export default class Player {
  // Parent
  scene: Phaser.Scene;

  // Visual / Physics
  image: Phaser.Physics.Arcade.Image;
  facingRight: boolean;

  // Movement
  controller: Controller;
  velocityX: number;
  velocityY: number;

  // Jumping
  jumping: boolean;
  jumpsRemaining: number;
  jumpCount: number;

  constructor(scene: Phaser.Scene, controller: Controller) {
    // Parent
    this.scene = scene;

    // Load images
    this.image = scene.physics.add.image(50, 700, "duck");

    // Scaling and drawing
    this.image.setScale(DUCK_IMAGE_SCALE, DUCK_IMAGE_SCALE);
    this.facingRight = true;

    // Configure the physics
    this.image.setDragX(MOVEMENT_SPEED * 5);
    this.image.setCollideWorldBounds(true);
    this.image.setBounceY(0.1);

    // Input
    this.controller = controller;
    scene.input.on("pointerdown", pointer => {
      this.attack(pointer.worldX, pointer.worldY);
    });

    // Jumping
    this.jumping = false;
    this.jumpsRemaining = 0;
    this.jumpCount = 0;
  }

  update(time: number, delta: number) {
    // If the player is on the ground
    if (this.image.body.onFloor()) {
      this.jumping = false;
      this.jumpsRemaining = MAX_JUMPS;
      this.jumpCount = 0;
    }

    // Movement
    if (!this.controller.moveRight() || !this.controller.moveLeft()) {
      // Don't move if both left and right are down
      if (this.controller.moveLeft()) this.moveX(-MOVEMENT_SPEED);
      if (this.controller.moveRight()) this.moveX(MOVEMENT_SPEED);
    }

    // Jumping
    if (this.controller.jump()) {
      this.jump();
    } else {
      this.jumping = false;
    }
  }

  moveX(velocity: number) {
    this.image.setVelocityX(velocity);
    if (velocity > 0 && !this.facingRight) {
      this.swapDirectionAnimation();
    } else if (velocity < 0 && this.facingRight) {
      this.swapDirectionAnimation();
    }
  }

  jump() {
    if (this.jumpsRemaining > 0 && !this.jumping) {
      this.jumping = true;
      this.jumpsRemaining--;
      this.jumpCount++;
      this.image.setVelocityY(-JUMP_VELOCITY);
      //   this.head.setVelocityY(-this.jumpAcceleration);

      if (this.jumpCount == 3) this.frontFlipAnimation();
    }
  }

  attack(x: number, y: number) {
    // const angle =
    //   Phaser.Math.Angle.Between(x, y, this.legs.x, this.legs.y) *
    //   Phaser.Math.RAD_TO_DEG;
    // const distance = Phaser.Math.Distance.Between(
    //   x,
    //   y,
    //   this.legs.x,
    //   this.legs.y
    // );
    // console.log("distance ", distance / 15);
    // this.scene.tweens.add({
    //   targets: this.legs,
    //   scaleY: ((distance / 15) * 3) / 4,
    //   angle: angle - 90,
    //   ease: Phaser.Math.Easing.Quadratic.In,
    //   duration: 300,
    //   yoyo: true
    // });
  }

  swapDirectionAnimation() {
    this.facingRight = !this.facingRight;
    this.scene.tweens.add({
      targets: this.image,
      scaleX: 0,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 100,
      onComplete: () => {
        this.image.setFlipX(!this.facingRight);
      }
    });
    this.scene.tweens.add({
      targets: this.image,
      scaleX: DUCK_IMAGE_SCALE,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 100,
      delay: 100
    });
  }

  frontFlipAnimation() {
    this.scene.tweens.add({
      targets: this.image,
      angle: this.facingRight ? 360 : -360,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 500
    });
  }
}
