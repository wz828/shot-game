/**
 * 游戏相关配置
 * @type {Object}
 */
const CONFIG = {
  status: 'start', // 游戏开始默认为开始中
  level: 1, // 游戏默认等级
  totalLevel: 6, // 总共6关
  canvasPadding: 30, // 默认画布的间隔

  //子弹
  bulletSize: 10, // 默认子弹长度
  bulletSpeed: 10, // 默认子弹的移动速度

  //怪兽
  numPerLine: 7, // 游戏默认每行多少个怪兽
  enemySpeed: 1, // 默认怪兽移动距离
  enemySize: 50, // 默认怪兽的尺寸
  enemyGap: 10, // 默认怪兽之间的间距
  enemyIcon: './img/enemy.png', // 怪兽的图像
  enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
  enemyDirection: 'right', // 默认敌人一开始往右移动


  //飞机
  planeSpeed: 5, // 默认飞机每一步移动的距离
  planeSize: {
    width: 60,
    height: 100
  }, // 默认飞机的尺寸,
  planeIcon: './img/plane.png',
};