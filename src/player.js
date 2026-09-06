import Position from "./position.js";
import { MOVING_DIRECTION } from "./moving-direction.js";
import collisionDetection from "./collision-detection.js";
// import boardBoundariesCollisionDetection from "./board-boundaries-collision-detection.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.size = 20;
    this.speedX = 0;
    this.speedY = 0;
    this.currentMovingDirection = MOVING_DIRECTION.UP;
    this.setStartingPosition();
  }

  setStartingPosition() {
    this.position = new Position(75, 75);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
  }

  update(deltaTime) {
    let collisionDetected = false;
    // if (boardBoundariesCollisionDetection(this, deltaTime)) {
    //   collisionDetected = true;
    //   this.stop();
    // }
    this.game.blocks.forEach((block) => {
      if (collisionDetection(this, block, deltaTime)) {
        collisionDetected = true;
        this.stop();
      }
    });
    if (!collisionDetected) {
      this.position.x = this.position.x + this.speedX * deltaTime;
      this.position.y = this.position.y + this.speedY * deltaTime;
    }
  }

  moveLeft() {
    this.speedY = 0;
    this.speedX = -0.1;
  }

  moveRight() {
    this.speedY = 0;
    this.speedX = 0.1;
  }

  moveUp() {
    this.speedX = 0;
    this.speedY = -0.1;
  }

  moveDown() {
    this.speedX = 0;
    this.speedY = 0.1;
  }

  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }
}
