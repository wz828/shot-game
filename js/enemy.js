const ENEMY_DIR = {
  LEFT: "left",
  RIGHT: "right",
};
const ENEMY_STATUS = {
  ALIVE: "alive",
  BOOMING: "booming",
  DEAD: "dead",
};
//ES5写法
// function Enemy(options) {
//   Element.call(this, options); //继承属性
//   this.icon = options.icon;
//   this.boomIcon = options.boomIcon;
//   this.status = ENEMY_STATUS.ALIVE;
//   this.direction = options.direction;
// }
// inheritPrototype(Enemy, Element); //继承方法

// Enemy.prototype.draw = function () {
//   const icon = this.status === ENEMY_STATUS.ALIVE ? this.icon : this.boomIcon;
//   this.ctx.drawImage(icon, this.x, this.y, this.width, this.height);
//   return this;
// };
// Enemy.prototype.swing = function (dir = ENEMY_DIR.LEFT) {
//   const detaX = dir === ENEMY_DIR.LEFT ? -this.speed : this.speed;
//   return this.move(detaX, 0);
// };
// Enemy.prototype.down = function () {
//   return this.move(0, this.height);
// };
// Enemy.prototype.boom = function () {
//   this.boomCount = this.boomCount ? this.boomCount + 1 : 1;
//   this.status = ENEMY_STATUS.BOOMING;
//   if (this.boomCount > 4) {
//     this.status = ENEMY_STATUS.DEAD;
//   }
// };

class Enemy extends Element{
  constructor(options){
    super(options);
    this.icon = options.icon;
    this.boomIcon = options.boomIcon;
    this.status = ENEMY_STATUS.ALIVE;
    this.direction = options.direction;
  }
  draw() {
    const icon = this.status === ENEMY_STATUS.ALIVE ? this.icon : this.boomIcon;
    this.ctx.drawImage(icon, this.x, this.y, this.width, this.height);
    return this;
  };
  swing(dir = ENEMY_DIR.LEFT) {
    const detaX = dir === ENEMY_DIR.LEFT ? -this.speed : this.speed;
    return this.move(detaX, 0);
  };
  down() {
    return this.move(0, this.height);
  };
  boom() {
    this.boomCount = this.boomCount ? this.boomCount + 1 : 1;
    this.status = ENEMY_STATUS.BOOMING;
    if (this.boomCount > 4) {
      this.status = ENEMY_STATUS.DEAD;
    }
  }

}