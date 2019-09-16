let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let player = {
  x: 100,
  spdX: 80,
  y: 50,
  spdY: 15
};

let enemies = {};
Enemy("1", 200, 58, 100, 30);
Enemy("2", 100, 30, 100, 30);
Enemy("3", 40, 30, 40, 52);

function Enemy(id, x, spdX, y, spdY) {
  let enemy = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    id: id
  };
  enemies[id] = enemy;
}

function updateEntity(obj, color) {
  obj.x += obj.spdX;
  obj.y += obj.spdY;
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, 25, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  if (obj.x < 0 || obj.x > canvas.width) {
    obj.spdX = -obj.spdX;
  }
  if (obj.y < 0 || obj.y > canvas.height) {
    obj.spdY = -obj.spdY;
  }
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateEntity(player, "red");
  for (const key in enemies) {
    updateEntity(enemies[key], randomColor());
  }
}

setInterval(update, 50);
