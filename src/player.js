import Position from "./position.js";
import { BOARD } from "./board.js";
import Block from "./block.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.size = 20;
    // this.speedX = 0;
    // this.speedY = 0;
    this.speed = 0;
    this.direction = 1;
    this.turnSpeed = 0;
    this.angle = 0;
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

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.stroke();

    ctx.restore();
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
    this.angle = this.normalizeAngle(this.angle + this.turnSpeed * deltaTime);

    const destinationX =
      this.position.x + Math.cos(this.angle) * this.speed * deltaTime;

    if (!this.isCollisionWithWall(destinationX, this.position.y)) {
      this.position.x = destinationX;
    }

    const destinationY =
      this.position.y + Math.sin(this.angle) * this.speed * deltaTime;

    if (!this.isCollisionWithWall(this.position.x, destinationY)) {
      this.position.y = destinationY;
    }
  }

  normalizeAngle(angle) {
    const full = 2 * Math.PI;
    return ((angle % full) + full) % full;
  }

  moveLeft() {
    // this.speedX = -this.speed;
  }

  moveRight() {
    // this.speedX = this.speed;
  }

  moveUp() {
    this.speed = 0.1;
  }

  moveDown() {
    this.speed = -0.1;
  }

  turnLeft() {
    this.turnSpeed = -0.005;
  }

  turnRight() {
    this.turnSpeed = 0.005;
  }

  stop() {
    this.speed = 0;
  }

  stopTurn() {
    this.turnSpeed = 0;
  }
}
