const config = {
  width: 800,
  height: 600,
  parent: "container",
  type: Phaser.CANVAS,
  backgroundColor: "#109fcaff",
  scene: [MainScene],
};

new Phaser.Game(config);
