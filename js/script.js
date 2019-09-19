//Start of the canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Start of the game Structure
let TimeOn = Date.now(); // Get the time at the beginning of the game
let survived = 0; // Variable that is gonna be used for time of play
let count = 0; // Variable that will control the player's fade after being hit
let gen = 0; // Variable used to generate new enemys through time
let state = false;
let pause = false;
let engine;
let sound = document.getElementById("music");
let soundtrack = document.getElementById("soundtrack");
let enemies = {}; //Object thet will save our enemys

//-------------------------Levels Control-------------------------
let levels;

document.getElementById("rabbit").onmouseover = () => {
  document.getElementById("1p").innerText = "RABBIT PARTY MODE";
  document.getElementById("2p").innerText =
    "EVERY FEW SECONDS NEW SPHERES ARE GOING TO SPAWN ON THE GAME";
  document.getElementById("3p").innerText = "DO NOT LET THEM TOUCH YOU!!!";
  document.getElementById("mainDiv").style.color = "fuchsia";
};
document.getElementById("rabbit").onmouseout = () => {
  document.getElementById("1p").innerText =
    "THIS GAME IS DESIGNED TO APRIMORATE YOUR ABILITY OF FOCUS";
  document.getElementById("2p").innerText =
    "TRY TO SURVIVE AS LONG AS POSSIBLE. YOU ONLY HAVE 10 LIVES";
  document.getElementById("3p").innerText =
    "CONTROL THE PLAYER WITH THE MOUSE. ESCAPE THE MULTI-COLOR SPHERES. DO NOT LOSE YOUR FOCUS!!!";
  document.getElementById("mainDiv").style.color = "rgb(0, 255, 64)";
};

document.getElementById("runners").onmouseover = () => {
  document.getElementById("1p").innerText = "SPEED RUNNERS MODE";
  document.getElementById("2p").innerText =
    "THIS MODE HAS ONLY 5 SPHERES ON THE SCREEN, BUT THEY WON'T STOP GETTING FASTER. MUCH FASTER!";
  document.getElementById("3p").innerText = "DO NOT LET THEM TOUCH YOU!!!";
  document.getElementById("mainDiv").style.color = "aqua";
};
document.getElementById("runners").onmouseout = () => {
  document.getElementById("1p").innerText =
    "THIS GAME IS DESIGNED TO APRIMORATE YOUR ABILITY OF FOCUS";
  document.getElementById("2p").innerText =
    "TRY TO SURVIVE AS LONG AS POSSIBLE. YOU ONLY HAVE 10 LIVES";
  document.getElementById("3p").innerText =
    "CONTROL THE PLAYER WITH THE MOUSE. ESCAPE THE MULTI-COLOR SPHERES. DO NOT LOSE YOUR FOCUS!!!";
  document.getElementById("mainDiv").style.color = "rgb(0, 255, 64)";
};

document.getElementById("hydra").onmouseover = () => {
  document.getElementById("1p").innerText = "HYDRA MODE";
  document.getElementById("2p").innerText =
    "ONLY 5 SPHERES ON THE SCREEN, BUT BEWARE, IF YOU HIT ONE OF THEM, TWO MORE ARE GOING TO APPER ON IT'S PLACE!";
  document.getElementById("3p").innerText = "DO NOT LET THEM TOUCH YOU!!!";
  document.getElementById("mainDiv").style.color = "yellow";
};
document.getElementById("hydra").onmouseout = () => {
  document.getElementById("1p").innerText =
    "THIS GAME IS DESIGNED TO APRIMORATE YOUR ABILITY OF FOCUS";
  document.getElementById("2p").innerText =
    "TRY TO SURVIVE AS LONG AS POSSIBLE. YOU ONLY HAVE 10 LIVES";
  document.getElementById("3p").innerText =
    "CONTROL THE PLAYER WITH THE MOUSE. ESCAPE THE MULTI-COLOR SPHERES. DO NOT LOSE YOUR FOCUS!!!";
  document.getElementById("mainDiv").style.color = "rgb(0, 255, 64)";
};

document.getElementById("rabbit").onclick = () => {
  levels = "rabbit";
  document.getElementById("myCanvas").style.border = "2px solid fuchsia";
  document.getElementById("pauseBtn").style.backgroundColor = "fuchsia";
  document.getElementById("secondDiv").style.border = "2px solid fuchsia";
  document.getElementById("btns").style.border = "2px solid fuchsia";
  document.getElementById("mainDiv").style.border = "2px solid fuchsia";
  setState();
};

document.getElementById("runners").onclick = () => {
  levels = "runners";
  document.getElementById("myCanvas").style.border = "2px solid aqua";
  document.getElementById("pauseBtn").style.backgroundColor = "aqua";
  document.getElementById("secondDiv").style.border = "2px solid aqua";
  document.getElementById("btns").style.border = "2px solid aqua";
  document.getElementById("mainDiv").style.border = "2px solid aqua";
  setState();
};

document.getElementById("hydra").onclick = () => {
  levels = "hydra";
  document.getElementById("myCanvas").style.border = "2px solid yellow";
  document.getElementById("pauseBtn").style.backgroundColor = "yellow";
  document.getElementById("secondDiv").style.border = "2px solid yellow";
  document.getElementById("btns").style.border = "2px solid yellow";
  document.getElementById("mainDiv").style.border = "2px solid yellow";
  setState();
};

const startLevels = () => {
  if (levels === "rabbit") {
    GenerateEnemy(); // Declaring a new enemy
    GenerateEnemy();
    GenerateEnemy();
  } else if (levels === "runners") {
    GenerateEnemy();
    GenerateEnemy();
    GenerateEnemy();
    GenerateEnemy();
    GenerateEnemy();
  } else if (levels === "hydra") {
    GenerateEnemy();
    GenerateEnemy();
    GenerateEnemy();
    GenerateEnemy();
    GenerateEnemy();
  }
};
//-----------------------------------------------------------------

// Our player
let player = {
  x: 100,
  spdX: 50,
  y: 50,
  spdY: 15,
  radius: 25,
  hp: 10
};

//Function loading the game on the click of the button "Start Game"
const startNewGame = () => {
  player.hp = 10;
  TimeOn = Date.now();
  enemies = {};
  document.getElementById("mainDiv").style.opacity = 0.3;
  document.getElementById("myCanvas").style.cursor = "none";

  if (levels === "rabbit") {
    document.getElementById("status").innerText = "Rabbit Party On";
    document.getElementById("rabbit").style.opacity = 1;
    document.getElementById("runners").style.opacity = 0.3;
    document.getElementById("hydra").style.opacity = 0.3;
  } else if (levels === "runners") {
    document.getElementById("status").innerText = "Speed Runners On";
    document.getElementById("runners").style.opacity = 1;
    document.getElementById("rabbit").style.opacity = 0.3;
    document.getElementById("hydra").style.opacity = 0.3;
  } else if (levels === "hydra") {
    document.getElementById("status").innerText = "Hydra On";
    document.getElementById("hydra").style.opacity = 1;
    document.getElementById("runners").style.opacity = 0.3;
    document.getElementById("rabbit").style.opacity = 0.3;
  }

  soundtrack.play();
  startLevels();
  engine = setInterval(update, 40);
};

const setState = () => {
  state = !state;

  if (state) {
    startNewGame();
  } else {
    clearInterval(engine);
    soundtrack.pause();
    soundtrack.currentTime = 0;
    soundtrack.play();
    state = !state;
    startNewGame();
  }
};

document.getElementById("pauseBtn").onclick = () => {
  pause = !pause;

  if (pause) {
    soundtrack.pause();
    // document.getElementById().src =
  } else {
    soundtrack.play();
  }
};

//Function that will randomly create new enemys. The radius is always the same
const GenerateEnemy = () => {
  let enemy = {
    x: Math.random() * canvas.width,
    spdX: 15 + Math.random() * 5,
    y: Math.random() * canvas.height,
    spdY: 15 + Math.random() * 5,
    id: Math.random(),
    radius: 25
  };
  enemies[enemy.id] = enemy; // Saving the new enemy on the object enemies
};

// Function that will track our mouse location and assing the player to it
document.onmousemove = mouse => {
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

const getDistance = (entety1, entety2) => {
  let vx = entety1.x - entety2.x;
  let vy = entety1.y - entety2.y;
  return Math.sqrt(vx * vx + vy * vy); // Gerando o valor da hipotenusa
};

function collision(entety1, entety2) {
  var distance = getDistance(entety1, entety2);
  return distance < entety2.radius + entety1.radius; // Distance between the two circles
}
//----------------------------------------------------------------------------------

// Function updating the objects on the canvas
const updateEntity = (obj, color) => {
  entityPosition(obj);
  drawObj(obj, color);
};

//Function responsable for the gameover verification and actions
const gameOver = () => {
  if (player.hp <= 0) {
    survived = 0;
    survived = ((Date.now() - TimeOn) / 1000).toFixed(1);
    drawGameOver();
    clearInterval(engine);
    soundtrack.pause();
    soundtrack.currentTime = 0;
  }
};

// Function generating enemys on the game every 8 seconds
const multiplyEnemy = () => {
  gen += 1;
  if (gen % 200 === 0) {
    GenerateEnemy();
  }
};

//Function drawing the game over on the screen
const drawGameOver = () => {
  document.getElementById("status").innerText = "Game Over";
  document.getElementById("score").innerHTML = `${survived}s`;
  document.getElementById("mainDiv").style.opacity = 1;
  document.getElementById("btns").style.opacity = 1;
  document.getElementById("myCanvas").style.border =
    "2px solid rgb(0, 255, 64)";
  document.getElementById("pauseBtn").style.backgroundColor = "rgb(0, 255, 64)";
  document.getElementById("secondDiv").style.border =
    "2px solid rgb(0, 255, 64)";
  document.getElementById("btns").style.border = "2px solid rgb(0, 255, 64)";
  document.getElementById("mainDiv").style.border = "2px solid rgb(0, 255, 64)";
  document.getElementById("rabbit").style.opacity = 1;
  document.getElementById("runners").style.opacity = 1;
  document.getElementById("hydra").style.opacity = 1;
  document.getElementById("myCanvas").style.cursor = "unset";
};

//Function controlling the enemys speed and not allowing them to leave the canvas
const entityPosition = obj => {
  obj.x += obj.spdX;
  obj.y += obj.spdY;

  if (obj.x < 0 || obj.x > canvas.width) {
    obj.spdX = -obj.spdX;
  }
  if (obj.y < 0 || obj.y > canvas.height) {
    obj.spdY = -obj.spdY;
  }
};

//Function generating colors for the enemys
const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

//Function drawing the objects on the canvas(enemys and player)
const drawObj = (obj, color) => {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

//-------------------------------------------------------------------------UPDATE----------------------------------------------------------------

const update = () => {
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
      sound.play();

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
      if (levels === "hydra") {
        delete enemies[key];
        GenerateEnemy();
        GenerateEnemy();
      }
    }
  }

  gameOver();
  if (levels === "rabbit") {
    multiplyEnemy();
  }
  if (levels === "runners") {
    if (gen % 400 === 0) {
      let nemysis = Object.values(enemies);
      nemysis.forEach(enemy => {
        if (enemy.spdY > 0) {
          enemy.spdY += 0.02;
        } else {
          enemy.spdY -= 0.02;
        }
        if (enemy.spdX > 0) {
          enemy.spdX += 0.02;
        } else {
          enemy.spdX -= 0.02;
        }
      });
    }
  }
};
