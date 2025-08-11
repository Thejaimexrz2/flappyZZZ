class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene.js" });
  }

  preload() {
    this.load.image("bird", "assets/bird.png");
    this.load.image("background", "assets/background");
  }

  create() {
    let graphics = this.add.graphics();

    graphics.fillStyle("#FFFFFF", 1);
    graphics.fillRect(0, 0, 800, 600, "#FFFFFF");
  }

  update(time, delta) {}
}
