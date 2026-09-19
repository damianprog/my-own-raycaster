export default class Point {
  constructor(game, position) {
    this.position = position;
    this.game = game;
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = "#008000";
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.position.x, this.game.player.position.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.game.player.position.y);
    ctx.lineTo(this.game.player.position.x, this.game.player.position.y);
    ctx.stroke();

    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(this.game.player.position.x, this.game.player.position.y);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.stroke();

    ctx.restore();
  }
}
