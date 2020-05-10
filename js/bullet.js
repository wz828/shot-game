/*子弹Bullet*/
function Bullet(options) {
  Element.call(this, options); //继承父类属性
}
inheritPrototype(Bullet, Element); //继承父类方法
Bullet.prototype.draw = function () {
  context.beginPath();
  context.moveTo(this.x, this.y - this.height);
  context.lineTo(this.x, this.y);
  context.strokeStyle = "white";
  context.stroke();
};
Bullet.prototype.fly = function () {
  return this.move(0, -this.speed);
};
Bullet.prototype.hasHit = function (enemy) {
  return (
    this.x > enemy.x &&
    this.x < enemy.x + enemy.width &&
    this.y > enemy.y &&
    this.y < enemy.y + enemy.height
  );
};
