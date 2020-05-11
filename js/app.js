var container = document.getElementById("game");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

let isStop = false;
/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts
   * @return {[type]}      [description]
   */
  init: function (opt) {
    this.status = "start";
    this.keyboard = new Keyboard();
    const opts = Object.assign({}, CONFIG, opt);

    const imgSrc = [opts.enemyIcon, opts.enemyBoomIcon, opts.planeIcon];
    imgOnload(imgSrc, (imgs) => {
      opts.enemyIcon = imgs[0];
      opts.enemyBoomIcon = imgs[1];
      opts.planeIcon = imgs[2];
    });
    this.opts = opts;
    this.score = 0;
    this.bindEvent();
  },
  bindEvent: function () {
    let self = this;
    let playBtn = document.querySelector(".js-play");
    let replayBtn = document.querySelectorAll(".js-replay");
    let nextBtn = document.querySelector(".js-next");
    let stopBtn = document.querySelector(".js-stop");

    // 开始游戏按钮绑定
    playBtn.onclick = function () {
      self.play();
    };
    replayBtn.forEach((btn) => {
      btn.onclick = function () {
        self.play();
      };
    });

    nextBtn.onclick = function () {
      self.play();
    };
    stopBtn.onclick = function (e) {
      self.stop();
      e.target.blur();
    };
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停
   */
  setStatus: function (status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function () {
    this.setStatus("playing");

    const { opts } = this;
    const {
      level,
      canvasPadding,
      numPerLine,
      enemySpeed,
      enemySize,
      enemyGap,
      enemyIcon,
      enemyBoomIcon,
      enemyDirection,
      planeSize,
      planeSpeed,
      planeIcon,
      bulletSize,
      bulletSpeed,
    } = opts;

    const enemyopts = {
      ctx: context,
      x: canvasPadding,
      y: canvasPadding,
      width: enemySize,
      height: enemySize,
      icon: enemyIcon,
      boomIcon: enemyBoomIcon,
      speed: enemySpeed,
      direction: enemyDirection,
    };

    const planeopts = {
      ctx: context,
      x: (canvas.width - planeSize.width) / 2,
      y: canvas.height - canvasPadding - planeSize.height,
      width: planeSize.width,
      height: planeSize.height,
      icon: planeIcon,
      speed: planeSpeed,
      bulletSpeed: bulletSpeed,
      bulletSize: bulletSize,
    };
    this.enemys = [];
    this.plane = new Plane(planeopts);

    for (let i = 0; i < level; i++) {
      for (let j = 0; j < numPerLine; j++) {
        enemyopts.x = canvasPadding + j * (enemyopts.width + enemyGap);
        enemyopts.y = canvasPadding + i * enemyopts.height;
        this.enemys.push(new Enemy(enemyopts));
      }
    }

    this.update();
  },

  update: function () {
    this.clear();
    this.moveEnemy();
    this.movePlane();
    this.setScore();
    const { opts } = this;
    const { canvasPadding, enemySize, planeSize } = opts;
    const { minX, maxX, maxY } = getCoordinate(this.enemys);

    if (!this.enemys.length) {
      this.end("success");
    } else if (
      maxY > canvas.height - canvasPadding - planeSize.height - enemySize &&
      (minX < canvasPadding || maxX > canvas.width - canvasPadding - enemySize)
    ) {
      this.end("failed");
    } else {
      this.draw();

      // timer = setTimeout(() => {
      //   this.update();
      // }, 1000 / 30);

      animate = requestAnimFrame(this.update.bind(this));
    }
  },

  end: function (status) {
    window.cancelAnimFrame(animate);
    const { opts } = this;
    const { level, enemySpeed } = opts;
    this.clear();
    if (status === "success") {
      this.opts.level = level + 1;
      this.opts.enemySpeed = enemySpeed + 1;
      document.querySelector(".next-level").innerHTML = `${this.opts.level}`;
    } else {
      this.opts.level = 1;
      this.opts.enemySpeed = 1;
      this.score = 0;
    }
    if (status === "success" && this.opts.level >= this.opts.totalLevel) {
      status = "all-success";
      this.opts.level = 1;
      this.opts.enemySpeed = 1;
      this.score = 0;
    }
    this.setStatus(status);
  },
  draw: function () {
    this.plane.draw();
    this.enemys.forEach((enemy) => {
      enemy.draw();
    });
  },
  clear: function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
  },
  moveEnemy: function () {
    const { opts } = this;
    const { canvasPadding, enemySize, enemyDirection } = opts;
    const { minX, maxX } = getCoordinate(this.enemys);
    let isBoundary = false;
    if (
      minX < canvasPadding ||
      maxX > canvas.width - canvasPadding - enemySize
    ) {
      opts.enemyDirection =
        enemyDirection === ENEMY_DIR.RIGHT ? ENEMY_DIR.LEFT : ENEMY_DIR.RIGHT;
      isBoundary = true;
    }
    this.enemys = this.enemys
      .map((enemy) => {
        if (isBoundary) {
          enemy.down();
        }
        enemy.swing(opts.enemyDirection);
        switch (enemy.status) {
          case ENEMY_STATUS.ALIVE:
            if (this.plane.hasHit(enemy)) {
              enemy.boom();
            }
            break;
          case ENEMY_STATUS.BOOMING:
            enemy.boom();
            break;
          case ENEMY_STATUS.DEAD:
            enemy.__readyToDead = true;
            this.score += 1;
            break;
        }
        return enemy;
      })
      .filter((enemy) => {
        return !enemy.__readyToDead;
      });
  },
  movePlane: function () {
    const {
      pressedLeft,
      pressedRight,
      pressedUp,
      pressedSpace,
    } = this.keyboard;
    const { opts, plane } = this;
    const { canvasPadding } = opts;
    let isLeftBoundary = false;
    let isRightBoundary = false;
    if (plane.x < canvasPadding) {
      isLeftBoundary = true;
    } else if (plane.x > canvas.width - canvasPadding - plane.width) {
      isRightBoundary = true;
    }

    if (pressedLeft && !pressedRight) {
      !isLeftBoundary && this.plane.swing(PLANE_DIR.LEFT);
    } else if (!pressedLeft && pressedRight) {
      !isRightBoundary && this.plane.swing(PLANE_DIR.RIGHT);
    } else if (pressedUp || pressedSpace) {
      this.plane.shoot();
    }
  },
  setScore: function () {
    document.querySelectorAll(".score").forEach((item) => {
      item.innerHTML = `${this.score}`;
    });
  },
  stop: function () {
    if (isStop) {
      // timer = setTimeout(() => {
      //   this.update();
      // }, 1000 / 30);
      animate = requestAnimFrame(this.update.bind(this));
      document.querySelector(".js-stop").innerHTML = "游戏暂停";
      isStop = false;
    } else {
      // window.clearTimeout(timer);
      window.cancelAnimFrame(animate);
      document.querySelector(".js-stop").innerHTML = "游戏恢复";
      isStop = true;
    }
  },
};

GAME.init();
