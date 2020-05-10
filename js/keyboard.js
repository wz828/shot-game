class Keyboard {
  constructor() {
    this.pressedLeft = false;
    this.pressedRight = false;
    this.pressedUp = false;
    this.pressedSpace = false;
    document.addEventListener("keydown", (e) => {
      this.keydown(e);
    });
    document.addEventListener("keyup", (e) => {
      this.keyup(e);
    });
  }
  keydown(e) {
    let key = event.keyCode;
    switch (key) {
      case 32:
        this.pressedSpace = true;
        break;
      case 37:
        this.pressedLeft = true;
        this.pressedRight = false;
        break;
      case 38:
        this.pressedUp = true;
        break;
      case 39:
        this.pressedLeft = false;
        this.pressedRight = true;
        break;
    }
  }
  keyup(e) {
    let key = event.keyCode;
    switch (key) {
      case 32:
        this.pressedSpace = false;
        break;
      case 37:
        this.pressedLeft = false;
        break;
      case 38:
        this.pressedUp = false;
        break;
      case 39:
        this.pressedRight = false;
        break;
    }
  }
}
