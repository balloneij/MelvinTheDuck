import Controller from "./Controller";

export default class Keyboard extends Controller {
  cursors: any;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super();
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  moveLeft() {
    return this.cursors.left.isDown;
  }

  moveRight() {
    return this.cursors.right.isDown;
  }

  jump() {
    return this.cursors.space.isDown;
  }
}
