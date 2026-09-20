export default class Input {
  constructor(game) {
    this.pressedKeys = new Set();
    document.addEventListener("keydown", (event) =>
      this.pressedKeys.add(event.key),
    );

    document.addEventListener("keyup", (event) =>
      this.pressedKeys.delete(event.key),
    );

    // const canvasElement = document.querySelector("canvas");

    // document.addEventListener("mousedown", (event) => {
    //   const rect = canvasElement.getBoundingClientRect();
    //   const x = event.clientX - rect.x;
    //   const y = event.clientY - rect.y;
    //   this.game.createPoint(new Position(x, y));
    // });
  }
}
