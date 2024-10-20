const utils = {
  withGrid(n) {
    return n * 16;
  },

  asGridCoords(x, y) {
    return `${x*16},${y*16}`
  },

  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;

    const size = 16;

    if (direction ==="left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }

    return {x, y};
  },


  oppositeDirection(diretion) {
    if (diretion === "left") { return "right"; }
    if (diretion === "right") { return "left"; }
    if (diretion === "up") { return "down"; }
    return "up";
  },

  wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail
    });
    document.dispatchEvent(event);
  }
}