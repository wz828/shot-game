const PLANE_DIR = {
  LEFT: "left",
  RIGHT: "right",
};
function Plane(options) {
  Element.call(this, options); //继承父类属性
  this.icon = options.icon;
  this.bullets = [];
  this.bulletSpeed = options.bulletSpeed;
  this.bulletSize = options.bulletSize;
  this.overheated = false;
}
inheritPrototype(Plane, Element); //继承父类方法

Plane.prototype.draw = function () {
  this.ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
  this.bullets.forEach((bullet) => {
    bullet.fly();
    bullet.draw();
  });
};
Plane.prototype.swing = function (dir = PLANE_DIR.LEFT) {
  const detaX = dir === PLANE_DIR.LEFT ? -this.speed : this.speed;
  return this.move(detaX, 0);
};
Plane.prototype.shoot = function () {
  if (this.overheated) {
    return;
  }
  this.bullets.push(
    new Bullet({
      ctx: this.ctx,
      x: this.x + this.width / 2,
      y: this.y,
      width: 1,
      height: this.bulletSize,
      speed: this.bulletSpeed,
    })
  );
  this.overheated=true;
  setTimeout(() => {
    this.overheated = false;
  }, 200);
};
Plane.prototype.hasHit = function (enemy) {
  const idx = this.bullets.findIndex((bullet) => {
    return bullet.hasHit(enemy);
  });
  if (idx > -1) {
    this.bullets.splice(idx, 1);
    return true;
  }
  return false;
};
