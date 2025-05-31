class DirectionInput {
  constructor() {
    this.usingGamepad = false;
    this.keyboardDirection = [];
    this.gamepadDirection = [];

    this.map = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right",
    };
  }

  get direction() {
    return this.usingGamepad ? this.gamepadDirection[0] : this.keyboardDirection[0];
  }

  init() {
    document.addEventListener("keydown", e => {
      const dir = this.map[e.code];
      if (dir && this.keyboardDirection.indexOf(dir) === -1) {
        this.usingGamepad = false;
        this.keyboardDirection.unshift(dir);
      }
    });

    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.keyboardDirection.indexOf(dir);
      if (index > -1) {
        this.usingGamepad = false;
        this.keyboardDirection.splice(index, 1);
      }
    })
  }

  checkJoystick() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads.find(g => g?.connected);
  
    if (!gamepad) return;
  
    const [x, y] = gamepad.axes;
    const threshold = 0.6;
  
    let key = null;
  
    if (Math.abs(x) > Math.abs(y)) {
      if (x > threshold) key = "ArrowRight";
      else if (x < -threshold) key = "ArrowLeft";
    } else {
      if (y > threshold) key = "ArrowDown";
      else if (y < -threshold) key = "ArrowUp";
    }

    if (key) {
      this.usingGamepad = true;
    }
  
    if (!key) {
      this.gamepadDirection = [];
      return;
    }
  
    const dir = this.map[key];
    const index = this.gamepadDirection.indexOf(dir);
  
    if (index > -1) {
      this.gamepadDirection.splice(index, 1);
    }
  
    if (dir && this.gamepadDirection.indexOf(dir) === -1) {
      this.gamepadDirection.unshift(dir);
    }
  }
}