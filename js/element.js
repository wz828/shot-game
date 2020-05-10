/*父类Element构造函数*/
function Element(options) {
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.speed = options.speed; 
  this.ctx = options.ctx;
}
Element.prototype.move = function (detaX, detaY) {
  this.x += detaX;
  this.y += detaY;
  return this;
};

//继承原型的函数
function inheritPrototype(subType, superType) {
  var protoType = Object.create(superType.prototype);
  protoType.constructor = subType;
  subType.prototype = protoType;
}

// class Element {
//   constructor(opts = {}){
//     this.x = opts.x;
//     this.y = opts.y;
//     this.size = opts.size;
//     this.speed = opts.speed;
//     this.ctx = opts.ctx;
//   }
//   move(){}
//   draw(){}
// }
