//Start of the canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Start of the game Structure
let TimeOn = Date.now(); // Get the time at the beginning of the game
let survived = 0; // Variable that is gonna be used for time of play
let count = 0; // Variable that will control the player's fade after being hit
let gen = 0; // Variable used to generate new enemys through time
let state = false;
let engine;

// Our player
let player = {
  x: 100,
  spdX: 50,
  y: 50,
  spdY: 15,
  radius: 25,
  hp: 10
};

//Object thet will save our enemys
let enemies = {};

function startNewGame() {
  player.hp = 10;
  TimeOn = Date.now();
  enemies = {};
  GenerateEnemy(); // Declaring a new enemy
  GenerateEnemy(); // Declaring a new enemy
  GenerateEnemy(); // Declaring a new enemy
  engine = setInterval(update, 40);
  document.getElementById("status").innerText = "Playing...";
  document.getElementById("mainDiv").style.opacity = 0.3;
  document.getElementById("mainDiv").style.opacity = 0.3;
}

function setState() {
  state = !state;

  if (state) {
    startNewGame();
  } else {
    clearInterval(engine);
    state = !state;
    startNewGame();
  }
}

//Function that will randomly create new enemys. The radius is always the same
function GenerateEnemy() {
  let enemy = {
    x: Math.random() * canvas.width,
    spdX: 15 + Math.random() * 5,
    y: Math.random() * canvas.height,
    spdY: 15 + Math.random() * 5,
    id: Math.random(),
    radius: 25
  };
  enemies[enemy.id] = enemy; // Saving the new enemy on the object enemies
}

// Function that will track our mouse location and assing the player to it
document.onmousemove = function(mouse) {
  let mouseX =
    mouse.clientX -
    document.getElementById("myCanvas").getBoundingClientRect().left;
  let mouseY =
    mouse.clientY -
    document.getElementById("myCanvas").getBoundingClientRect().top;

  // Not allowing the player to leave the canvas area
  if (mouseX < player.radius / 2) {
    mouseX = player.radius / 2;
  } else if (mouseX > canvas.width - player.radius / 2) {
    mouseX = canvas.width - player.radius / 2;
  } else if (mouseY < player.radius / 2) {
    mouseY = player.radius / 2;
  } else if (mouseY > canvas.height - player.radius / 2) {
    mouseY = canvas.height - player.radius / 2;
  }

  player.x = mouseX;
  player.y = mouseY;
};

// Function that will allow the collision Circle - Circle--------------------------
function getDistance(entety1, entety2) {
  let vx = entety1.x - entety2.x;
  let vy = entety1.y - entety2.y;
  return Math.sqrt(vx * vx + vy * vy); // Gerando o valor da hipotenusa
}

function collision(entety1, entety2) {
  var distance = getDistance(entety1, entety2);
  return distance < entety2.radius + entety1.radius; // Distance between the two circles
}
//----------------------------------------------------------------------------------
function updateEntity(obj, color) {
  entityPosition(obj);
  drawObj(obj, color);
}

function gameOver() {
  if (player.hp < 0) {
    survived = 0;
    survived = ((Date.now() - TimeOn) / 1000).toFixed(1);
    drawGameOver();
    clearInterval(engine);
  }
}

function drawGameOver() {
  document.getElementById("status").innerText = "Game Over";
  document.getElementById("score").innerHTML = `${survived}s`;
  document.getElementById("mainDiv").style.opacity = 1;
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
//-------------------------------------------------------------------------UPDATE----------------------------------------------------------------
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObj(player, "limegreen");
  ctx.font = "40px Arial";

  for (const key in enemies) {
    updateEntity(enemies[key], randomColor());

    let isColliding = collision(player, enemies[key]);

    if (count !== 0) {
      isColliding = false;
      count += 1;
      drawObj(player, "red");

      if (count === 200) {
        count = 0;
      }
    }

    if (isColliding) {
      console.log(`Collision dettected}`);
      player.hp = player.hp - 1;
      document.getElementById("lives").innerHTML = `${player.hp}HP`;
      enemies[key].spdX = -enemies[key].spdX;
      enemies[key].spdY = -enemies[key].spdY;
      count += 1;
    }
  }

  gameOver();

  gen += 1;
  if (gen === 200) {
    GenerateEnemy();
    gen = 0;
  }
}
