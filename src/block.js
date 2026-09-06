import { BLOCK_TYPE } from "./block-type.js";
export default class Block {
  constructor(game, position, type) {
    this.game = game;
    this.position = position;
    this.type = type;
    this.color = this.type === BLOCK_TYPE.wall ? "#0d1117" : "#f2f4f7";
    this.size = 50;
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
