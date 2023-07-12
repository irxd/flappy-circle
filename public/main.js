let bird;
let pipes = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  if (!gameOver) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].hits(bird)) {
        endGame();
      }

      if (pipes[i].offscreen()) {
        score++;
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 100 === 0) {
      pipes.push(new Pipe());
    }

    fill(255);
    textSize(32);
    text("Score: " + score, 10, 50);
  } else {
    fill(255);
    textSize(32);
    text("Game Over! Score: " + score + "\n Tap to Start Again", 50, height / 2);
    noLoop();
  }
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
  }

  if (gameOver) {
    gameOver = false;
    score = 0;
    pipes = [];
    bird = new Bird();
    pipes.push(new Pipe());
    loop();
  }
}

function mouseClicked() {
  bird.up();

  if (gameOver) {
    gameOver = false;
    score = 0;
    pipes = [];
    bird = new Bird();
    pipes.push(new Pipe());
    loop();
  }
}

function Bird() {
  this.y = height / 2;
  this.x = 64;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 32, 32);
  };

  this.up = function() {
    this.velocity += this.lift;
  };

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

function Pipe() {
  this.top = random(height / 2);
  this.bottom = random(height / 2);
  this.x = width;
  this.w = 40;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };

  this.show = function() {
    fill(0, 255, 0);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function() {
    this.x -= this.speed;
  };

  this.offscreen = function() {
    return this.x < -this.w;
  };
}

function endGame() {
  gameOver = true;
}

