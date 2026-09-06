import Player from "./player.js";
import Block from "./block.js";
// import collisionDetection from "./collision-detection.js";
import { BOARD } from "./board.js";
import Position from "./position.js";
import Input from "./input.js";
import { BLOCK_TYPE } from "./block-type.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(this);
    this.input = new Input(this);
    this.initializeBoard();
  }

  draw(ctx) {
    this.blocks.forEach((block) => block.draw(ctx));
    this.player.draw(ctx);
  }

  update(deltaTime) {
    this.player.update(deltaTime);
  }

  clear(ctx) {
    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
  }

  initializeBoard() {
    this.blocks = [];

    for (let y = 0; y < BOARD.length; y++) {
      for (let x = 0; x < BOARD[y].length; x++) {
        const blockType =
          BOARD[y][x] === 1 ? BLOCK_TYPE.wall : BLOCK_TYPE.floor;
        const blockPosition = new Position(x * 50, y * 50);
        this.blocks.push(new Block(this, blockPosition, blockType));
      }
    }
  }
}
