import Player from "./objects/Player";
import Keyboard from "../controllers/Keyboard";
import Cloud from "./objects/Cloud";
import { BowlingBall, Junk } from "./objects/junk/Junk";
import JunkPortal from "./objects/junk/JunkPortal";

class PlayScene extends Phaser.Scene {
  player: Player;
  // Junk
  junkPortal: JunkPortal;

  bonkCount: number;
  text: any;

  constructor() {
    super({
      key: "TestScene"
    });
  }

  // Load game settings
  init() {}

  // Load game assets
  preload() {
    // Background
    this.load.image("background", "/assets/background/background.png");
    this.load.image("branch", "/assets/background/branch.png");
    this.load.image("cloud", "/assets/background/cloud.png");

    // Duck
    this.load.image("duck", "/assets/objects/duck.png");

    // Portal
    this.load.image("portal", "/assets/objects/portal.png");

    // Junk
    this.load.image("bowlingBall", "/assets/objects/junk/bowlingBall.png");
    this.load.image("vase", "/assets/objects/junk/vase.png");
    this.load.image("sofa", "/assets/objects/junk/sofa.png");

    // Old
    this.load.image("playerBody", "/assets/objects/body_old.png");
    this.load.image("playerHead", "/assets/objects/head_old.png");

    // Google font
    this.load.script(
      "webfont",
      "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"
    );
  }

  // Execurted after everything is loaded
  create() {
    // Set the background
    const background = this.add.sprite(0, 0, "background");
    background.setDisplaySize(960, 640);
    background.setOrigin(0);
    const cloud = new Cloud(this);

    // Add junk portal
    this.junkPortal = new JunkPortal(this);

    const branch = this.add.sprite(0, 0, "branch");
    branch.setOrigin(0);
    branch.setScale(0.25);

    this.tweens.add({
      targets: branch,
      angle: 2,
      ease: Phaser.Math.Easing.Quadratic.Out,
      duration: 900,
      repeat: -1,
      yoyo: true,
      repeatDelay: 2000
    });

    // Add player
    this.player = new Player(this, new Keyboard(this));
    this.bonkCount = 0;
    // Physics
    this.physics.add.collider(
      this.player.image,
      this.junkPortal.group,
      (player, junk) => {
        this.bonkCount++;
        junk.setVelocityX(this.player.facingRight ? 500 : -500);
        junk.setVelocityY(-1000);
        this.tweens.add({
          targets: junk,
          angle: this.player.facingRight ? 360 : -360,
          duration: 500,
          repeat: -1
        });
        this.text.setText(`Junk Bonked: \t${this.bonkCount}`);
      },
      null,
      null
    );
    var style = {
      font: "28px Finger Paint",
      fill: "#00F",
      tabs: [150, 150, 200]
    };
    this.text = this.add.text(
      720,
      16,
      `Junk Bonked: \t${this.bonkCount}`,
      style
    );
    this.text.setShadow(-3, 3, "rgba(0,0,0,0.5)", 0, true, true);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.junkPortal.update(time, delta);
  }
}

export default PlayScene;
