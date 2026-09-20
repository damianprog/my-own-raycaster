import Position from "./position.js";
import { BOARD } from "./board.js";
import Block from "./block.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.size = 20;
    this.speed = 0;
    this.strafeSpeed = 0;
    this.turnSpeed = 0;
    this.angle = 0;
    this.strafeAngle = 0;
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
    this.setSpeeds();

    this.setAngles(deltaTime);

    const dx =
      (Math.cos(this.angle) * this.speed +
        Math.cos(this.strafeAngle) * this.strafeSpeed) *
      deltaTime;
    const dy =
      (Math.sin(this.angle) * this.speed +
        Math.sin(this.strafeAngle) * this.strafeSpeed) *
      deltaTime;

    this.move(dx, dy);
  }

  setSpeeds() {
    const pressedKeys = this.game.input.pressedKeys;

    this.speed = pressedKeys.has("ArrowUp")
      ? 0.1
      : pressedKeys.has("ArrowDown")
        ? -0.1
        : 0;

    this.strafeSpeed = pressedKeys.has("d")
      ? 0.1
      : pressedKeys.has("a")
        ? -0.1
        : 0;

    this.turnSpeed = pressedKeys.has("ArrowLeft")
      ? -0.005
      : pressedKeys.has("ArrowRight")
        ? 0.005
        : 0;
  }

  setAngles(deltaTime) {
    this.angle = this.normalizeAngle(this.angle + this.turnSpeed * deltaTime);

    this.strafeAngle = this.angle + Math.PI / 2;
  }

  move(x, y) {
    const destinationX = this.position.x + x;

    if (!this.isCollisionWithWall(destinationX, this.position.y)) {
      this.position.x = destinationX;
    }

    const destinationY = this.position.y + y;

    if (!this.isCollisionWithWall(this.position.x, destinationY)) {
      this.position.y = destinationY;
    }
  }

  normalizeAngle(angle) {
    const full = 2 * Math.PI;
    return ((angle % full) + full) % full;
  }
}
