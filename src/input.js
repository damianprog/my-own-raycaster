import Position from "./position.js";

export default class Input {
  constructor(game) {
    this.game = game;
    this.player = this.game.player;
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.player.moveLeft();
          break;

        case "ArrowRight":
          this.player.moveRight();
          break;

        case "ArrowDown":
          this.player.moveDown();
          break;

        case "ArrowUp":
          this.player.moveUp();
          break;

        case "a":
          this.player.turnLeft();
          break;

        case "d":
          this.player.turnRight();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.player.stop();
          break;

        case "ArrowRight":
          this.player.stop();
          break;
        case "ArrowUp":
          this.player.stop();
          break;

        case "ArrowDown":
          this.player.stop();
          break;

        case "a":
          this.player.stopTurn();
          break;

        case "d":
          this.player.stopTurn();
          break;
      }
    });

    const canvasElement = document.querySelector("canvas");

    document.addEventListener("mousedown", (event) => {
      const rect = canvasElement.getBoundingClientRect();
      const x = event.clientX - rect.x;
      const y = event.clientY - rect.y;
      this.game.createPoint(new Position(x, y));
    });
  }
}
