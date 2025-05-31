class JoystickPressListener {
  constructor(buttonCode, callback) {
    let buttonSafe = true;

    const gamepads = navigator.getGamepads();
    const gamepad = gamepads.find(g => g?.connected);
  
    if (!gamepad) return;

    this.map = {
      "B": 0,
      "A": 1,
      "X": 3,
      "Y": 2,
      "Start": 9,
      "Select": 8,
      "R1": 5,
      "R2": 7,
      "L1": 4,
      "L2": 6
    };
  
    const index = this.map[buttonCode];
    const button = gamepad.buttons[index];
  
    if (button.pressed && buttonSafe) {
      buttonSafe = false;
      callback();
    } else if (!button.pressed) {
      buttonSafe = true;
    }
  }
}