const config = {
  width: 800,
  height: 500,
  parent: "container",
  type: Phaser.AUTO,
  backgroundColor: "#109fcaff",
  scene: [MainScene],
  physics: {
    default: "arcade",
  },
};

new Phaser.Game(config);
