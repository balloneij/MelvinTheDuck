import "phaser";
import TestScene from "./scenes/PlayScene";

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: "content",
  width: 960,
  height: 640,
  resolution: 1,
  backgroundColor: "#EDEEC9",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 1000 }
    }
  },
  scene: [TestScene]
};

new Phaser.Game(config);
