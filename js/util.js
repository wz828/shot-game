// 兼容定义 requestAnimFrame
window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (a) {
    console.lof(a)
    window.setTimeout(callback, 1000 / 30);
  };

window.cancelAnimFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  function (id) {
    window.clearTimeout(id);
  };


function imgOnload(res, callback) {
  let len = res.length;
  let loadNum = 0;
  let images = [];
  for (let i = 0; i < len; i++) {
    images[i] = new Image();
    images[i].src = res[i];
    images[i].onload = function () {
      loadNum++;
      if (loadNum === len) {
        callback(images);
      }
    };
  }
}

function getCoordinate(arrs) {
  let minX, maxX, minY, maxY;
  arrs.forEach(function (item) {
    if (!minX && !maxX) {
      minX = item.x;
      maxX = item.x;
    } else {
      if (item.x < minX) {
        minX = item.x;
      }
      if (item.x > maxX) {
        maxX = item.x;
      }
    }
    if (!minY && !maxY) {
      minY = item.y;
      maxY = item.y;
    } else {
      if (item.y < minY) {
        minY = item.y;
      }
      if (item.y > maxY) {
        maxY = item.y;
      }
    }
  });
  return {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY,
  };
}
