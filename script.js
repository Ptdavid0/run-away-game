let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let TimeOn = Date.now();
let survived = 0;

let player = {
  x: 100,
  spdX: 50,
  y: 50,
  spdY: 15,
  radius: 25,
  hp: 10
};

let enemies = {};
GenerateEnemy();
GenerateEnemy();
GenerateEnemy();

function GenerateEnemy() {
  let enemy = {
    x: Math.random() * canvas.width,
    spdX: 5 + Math.random() * 5,
    y: Math.random() * canvas.height,
    spdY: 5 + Math.random() * 5,
    id: Math.random(),
    radius: 25
  };
  enemies[enemy.id] = enemy;
}

document.onmousemove = function(mouse) {
  let mouseX =
    mouse.clientX -
    document.getElementById("myCanvas").getBoundingClientRect().left;
  let mouseY =
    mouse.clientY -
    document.getElementById("myCanvas").getBoundingClientRect().top;

  if (mouseX < player.radius / 2) {
    mouse = player.radius / 2;
  } else if (mouseX > canvas.width - player.radius / 2) {
    mouseX = canvas.width - player.radius / 2;
  } else if (mouseY < player.radius / 2) {
    mouseY = player.radius / 2;
  } else if (mouseY > canvas.height - player.radius / 2) {
    mouseY = canvas.height - player.radius / 2;
  }

  player.x = mouseX; //- 650
  player.y = mouseY; //- 75
};

function getDistance(entety1, entety2) {
  let vx = entety1.x - entety2.x;
  let vy = entety1.y - entety2.y;
  return Math.sqrt(vx * vx + vy * vy); // Gerando o valor da hipotenusa
}

function collision(entety1, entety2) {
  var distance = getDistance(entety1, entety2);
  return distance < entety2.radius + entety1.radius;
}

function updateEntity(obj, color) {
  entityPosition(obj);
  drawObj(obj, color);
}
function entityPosition(obj) {
  obj.x += obj.spdX;
  obj.y += obj.spdY;

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

function drawObj(obj, color) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

let count = 0;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObj(player, "yellow");
  ctx.font = "40px Arial";
  ctx.fillText("HP:" + player.hp, 0, 30);

  for (const key in enemies) {
    updateEntity(enemies[key], randomColor());

    let isColliding = collision(player, enemies[key]);
    if (count !== 0) {
      isColliding = false;
      count += 1;
      drawObj(player, "red");
      if (count === 100) {
        count = 0;
      }
    }

    if (isColliding) {
      console.log(`Collision dettected}`);
      player.hp = player.hp - 1;
      if (player.hp < 0) {
        console.log("YOU LOOOOOOOOST");
        player.hp = 10;
        survived = 0;
        survived = Date.now() - TimeOn;
        TimeOn = Date.now();
      }
      enemies[key].spdX = -enemies[key].spdX;
      enemies[key].spdY = -enemies[key].spdY;
      count += 1;
    }
  }
  ctx.fillText(survived, 0, 80);
}

setInterval(update, 50);
