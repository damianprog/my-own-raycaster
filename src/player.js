import Position from "./position.js";
import { MOVING_DIRECTION } from "./moving-direction.js";
import { BOARD } from "./board.js";
import Block from "./block.js";

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

  isCollisionWithWall(x, y) {
    const kx = Math.floor(x / Block.SIZE);
    const ky = Math.floor(y / Block.SIZE);
    if (ky < 0 || ky >= BOARD.length) {
      return true;
    }
    if (kx < 0 || kx >= BOARD[0].length) {
      return true;
    }
    return BOARD[ky][kx] === 1;
  }

  update(deltaTime) {
    const destinationX = this.position.x + this.speedX * deltaTime;
    if (!this.isCollisionWithWall(destinationX, this.position.y)) {
      this.position.x = destinationX;
    }

    const destinationY = this.position.y + this.speedY * deltaTime;
    if (!this.isCollisionWithWall(this.position.x, destinationY)) {
      this.position.y = destinationY;
    }
  }

  moveLeft() {
    this.speedX = -0.1;
  }

  moveRight() {
    this.speedX = 0.1;
  }

  moveUp() {
    this.speedY = -0.1;
  }

  moveDown() {
    this.speedY = 0.1;
  }

  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }
}
