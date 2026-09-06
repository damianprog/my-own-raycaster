export default class Block {
  constructor(game, position, color) {
    this.game = game;
    this.position = position;
    this.color = color;
    this.size = 50;
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
