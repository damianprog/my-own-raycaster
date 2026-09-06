import Player from "./player.js";
import collisionDetection from "./collision-detection.js";
import { BOARD } from "./board.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    // this.player = new Player(this);
    // this.input = new Input(this);
    this.initializeBoard();
  }

  draw(ctx) {
    // this.player.draw(ctx);
    this.allBlocks.forEach((block) => block.draw(ctx));
  }

  update(deltaTime) {
    // this.player.update(deltaTime);
  }

  clear(ctx) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
  }

  initializeBoard() {
    const blocks = [];

    for (let y = 0; y < BOARD.length; y++) {
      for (let x = 0; x < BOARD[y].length; x++) {
        ctx.fillStyle = BOARD[y][x] === 1 ? "#0d1117" : "#f2f4f7";
      }
    }

    this.blocks = blocks;
  }
}
