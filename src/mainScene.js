class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene.js", active: true });
    this.gameActive = false;
    this.debug = true;
    this.pipes = [];
    this.lastCreatedTime = 0;
    this.gameConfig = {
      timePerPipes: 2500, //En millisegundos
    };
  }

  //Precarga de los assets :D
  preload() {
    this.load.image("bird", "assets/img/bird.png");
    this.load.image("background", "assets/img/background.png");
    this.load.image("pipe", "assets/img/pipe.png");
  }

  // ...existing code...
  create() {
    this.background = this.add.tileSprite(400, 300, 800, 600, "background");
    this.physics.world.pause();

    this.bird = this.physics.add.sprite(100, 400, "bird");
    this.bird.angle = 0;
    this.bird.isflapping = false;
    this.bird.setCollideWorldBounds(true);
    this.bird.body.setGravityY(800);

    //Teclado espacio para saltar o iniciar el juego!
    this.input.keyboard.on("keydown-SPACE", (event) => {
      if (this.gameActive) {
      } else {
        this.physics.world.resume();
        this.gameActive = true;
        this.createNewPipes();
      }

      this.flapBird();
    });
  }

  flapBird() {
    this.bird.isflapping = true;
    this.bird.setVelocityY(-250);
    this.bird.angle = -20;

    this.time.delayedCall(
      500,
      () => {
        this.bird.isflapping = false;
      },
      [],
      this
    );
  }

  createNewPipes() {
    // Random Y position for the gap
    const gapY = Math.random() * (320 - 130) + 130;
    const gapSize = 100; // Adjust gap size as needed

    // Top pipe
    const pipe_up = this.physics.add.image(850, gapY, "pipe");
    pipe_up.setOrigin(0.5, 1);
    pipe_up.flipY = true;
    pipe_up.setVelocityX(-200); // Move left at 100px/sec

    // Bottom pipe
    const pipe_down = this.physics.add.image(850, gapY + gapSize, "pipe");
    pipe_down.setOrigin(0.5, 0);
    pipe_down.setVelocityX(-200);

    this.pipes.push(pipe_up, pipe_down);
  }

  update(time, delta) {
    if (this.gameActive == true) {
      this.background.tilePositionX += 1;
      if (this.bird.body.velocity.y > 0) {
        this.bird.angle = Math.min(this.bird.angle + 1, 30);
      }

      if (time - this.lastCreatedTime >= this.gameConfig.timePerPipes) {
        this.createNewPipes();
        this.lastCreatedTime = time;
      }

      for (let index; index <= this.pipes.length; index++) {
        const pipe = this.pipes[index];
        if (pipe.x < 10) {
          this.pipes.splice(index, index);
        }
      }
    }
  }
}
