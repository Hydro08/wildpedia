const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let box = 10;
let snake;
let direction;
let food;
let game_interval;
let obstacles = [];
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

let speed_potion = {
  x: 0,
  y: 0,
  active: false,
};

let double_points_potion = {
  x: 0,
  y: 0,
  active: false,
};
let double_points_active = false;

function update_score(points = 1) {
  if (double_points_active) points *= 2;

  score += points;
  score_value.innerText = score;

  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
  }
  document.getElementById("highscore-value").innerText = highscore;
}

const container_title = document.getElementById("container-title");
const back_btn = document.getElementById("back-btn");
const settings_btn = document.getElementById("settings-btn");
const start_btn = document.getElementById("start-btn");
const restart_btn = document.getElementById("restart-btn");
const canvas_area = document.getElementById("canvas-area");
const difficulties_container = document.getElementById(
  "difficulties-container"
);
const easy_difficulty = document.getElementById("easy-difficulty");
const settings_mode = document.getElementById("settings-mode");
const settings_main = document.getElementById("settings-main");
const food_count = document.getElementById("food-count");
const score_value = document.getElementById("score-value");

function back_page() {
  container_title.innerText = "Snake Game";
  difficulties_container.style.width = "100%";
  easy_difficulty.style.visibility = "hidden";
  easy_difficulty.style.width = "0%";
  easy_difficulty.style.opacity = "0";
  difficulties_container.style.opacity = "1";
  difficulties_container.style.visibility = "visible";
  canvas_area.style.opacity = "0";

  restart_btn.style.display = "none";
  score = 0;
  score_value.innerText = score;
  food_count.value = "";
  clearInterval(game_interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function settings_content() {
  settings_mode.style.width = "0%";
  settings_main.style.width = "40%";
  settings_main.style.visibility = "visible";
  settings_main.style.opacity = "1";
}

function back_settings_mode() {
  settings_mode.style.width = "40%";
  settings_mode.style.visibility = "visible";
  settings_main.style.width = "0%";
  settings_main.style.visibility = "hidden";
  settings_main.style.opacity = "0";
}

function start_easy() {
  container_title.innerText = "Easy Mode";
  difficulties_container.style.width = "0%";
  easy_difficulty.style.visibility = "visible";
  easy_difficulty.style.width = "100%";
  easy_difficulty.style.opacity = "1";
  difficulties_container.style.opacity = "0";
  difficulties_container.style.visibility = "hidden";
  canvas_area.style.opacity = "1";
}

function start_game() {
  const food_value = parseInt(food_count.value);
  if (!food_value || food_value < 1 || food_value > 5) {
    alert("Please enter amount of food [1 - 5]");
    return;
  }

  score = 0;
  score_value.innerText = score;
  restart_btn.style.display = "block";

  if (container_title.innerText === "Easy Mode") easy_mode(food_value);
  else if (container_title.innerText === "Medium Mode") medium_mode(food_value);
  else if (container_title.innerText === "Hard Mode") hard_mode(food_value);

  disabled_buttons_true();
}

function disabled_buttons_true() {
  back_btn.disabled = true;
  settings_btn.disabled = true;
  start_btn.disabled = true;
}

function disabled_buttons_false() {
  back_btn.disabled = false;
  settings_btn.disabled = false;
  start_btn.disabled = false;
}

function restart_game() {
  clearInterval(game_interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  score = 0;
  score_value.innerText = score;

  snake = [{ x: 40 * box, y: 25 * box }];
  direction = "DOWN";
  obstacles = [];

  const food_value = parseInt(food_count.value) || 1;
  food_init(food_value);

  game_interval = setInterval(draw_game, speed || 150);
  draw_game();
}

function food_init(food_value) {
  const cols = Math.floor(canvas.width / box);
  const rows = Math.floor(canvas.height / box);

  if (food_value === 1) {
    food = {
      x: Math.floor(Math.random() * (cols - 4) + 2) * box,
      y: Math.floor(Math.random() * (rows - 4) + 2) * box,
    };
  } else {
    food = [];
    for (let i = 0; i < food_value; i++) {
      food.push({
        x: Math.floor(Math.random() * (cols - 4) + 2) * box,
        y: Math.floor(Math.random() * (rows - 4) + 2) * box,
      });
    }
  }
}

function easy_mode(food_value) {
  food_init(food_value);

  speed = 200;
  snake = [{ x: 40 * box, y: 25 * box }];
  direction = "DOWN";
  obstacle = [];

  if (game_interval) clearInterval(game_interval);
  game_interval = setInterval(draw_game, speed);

  spawn_speed_potion();
  spawn_double_points_potion();
  draw_game();
}

function medium_mode(food_value) {
  food_init(food_value);

  snake = [{ x: 10 * box, y: 10 * box }];
  direction = "DOWN";
  obstacle = [];
}

function hard_mode(food_value) {
  food_init(food_value);

  snake = [{ x: 10 * box, y: 10 * box }];
  direction = "DOWN";
  obstacle = [];
}

function spawn_speed_potion() {
  const spawn_delay = Math.floor(Math.random() * 7000) + 3000;

  setTimeout(() => {
    speed_potion = {
      x: Math.floor(Math.random() * 38 + 1) * box,
      y: Math.floor(Math.random() * 38 + 1) * box,
      active: true,
    };

    setTimeout(() => {
      if (speed_potion.active) {
        speed_potion.active = false;
        spawn_speed_potion();
      }
    }, 10000);
  }, spawn_delay);
}

function spawn_double_points_potion() {
  const cols = Math.floor(canvas.width / box);
  const rows = Math.floor(canvas.height / box);

  double_points_potion = {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
    active: true,
  };

  setTimeout(() => {
    double_points_potion.active = false;
    setTimeout(
      spawn_double_points_potion,
      Math.floor(Math.random() * 15000) + 3000
    );
  }, 10000);
}

function draw_game() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#9f9";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let headX = snake[0].x;
  let headY = snake[0].y;

  ctx.fillStyle = "green";

  if (Array.isArray(food)) {
    food.forEach((f) => {
      ctx.fillRect(f.x, f.y, box, box);
    });
  } else {
    ctx.fillRect(food.x, food.y, box, box);
  }

  if (speed_potion.active) {
    ctx.fillStyle = "blue";
    ctx.fillRect(speed_potion.x, speed_potion.y, box, box);
  }

  if (
    headX === speed_potion.x &&
    headY === speed_potion.y &&
    speed_potion.active
  ) {
    speed_potion.active = false;
    speed *= 0.5;
    clearInterval(game_interval);
    game_interval = setInterval(draw_game, speed);

    setTimeout(() => {
      speed /= 0.5;
      clearInterval(game_interval);
      game_interval = setInterval(draw_game, speed);
      spawn_speed_potion();
    }, 10000);
  }

  if (double_points_potion.active) {
    ctx.fillStyle = "red";
    ctx.fillRect(double_points_potion.x, double_points_potion.y, box, box);
  }

  if (
    headX === double_points_potion.x &&
    headY === double_points_potion.y &&
    double_points_potion.active
  ) {
    double_points_active = true;
    double_points_potion.active = false;

    setTimeout(() => {
      double_points_active = false;
    }, 10000);
  }

  ctx.fillStyle = "#555";
  obstacles.forEach((b) => {
    ctx.fillRect(b.x, b.y, box, box);
  });

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  let ate = false;

  if (Array.isArray(food)) {
    for (let i = 0; i < food.length; i++) {
      if (headX === food[i].x && headY === food[i].y) {
        const cols = Math.floor(canvas.width / box);
        const rows = Math.floor(canvas.height / box);

        food[i] = {
          x: Math.floor(Math.random() * (cols - 4) + 2) * box,
          y: Math.floor(Math.random() * (rows - 4) + 2) * box,
        };

        update_score();
        ate = true;
        break;
      }
    }
  } else {
    if (headX === food.x && headY === food.y) {
      const cols = Math.floor(canvas.width / box);
      const rows = Math.floor(canvas.height / box);

      food = {
        x: Math.floor(Math.random() * (cols - 4) + 2) * box,
        y: Math.floor(Math.random() * (rows - 4) + 2) * box,
      };

      update_score();
      ate = true;
    }
  }

  if (!ate) snake.pop();

  const newHead = { x: headX, y: headY };

  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height
  ) {
    alert("Game Over! You hit the wall.");
    clearInterval(game_interval);
    disabled_buttons_false();
    restart_btn.style.display = "none";
  } else if (checkObstacleCollision(newHead) || collision(newHead, snake)) {
    clearInterval(game_interval);
    disabled_buttons_false();
    restart_btn.style.display = "none";
  }

  snake.unshift(newHead);
  canChangeDirection = true;
}

function checkObstacleCollision(head) {
  const hit = obstacles.some((b) => b.x === head.x && b.y === head.y);
  if (hit) alert("Game Over! You hit the obstacles.");
  return hit;
}

function collision(head, array) {
  const hit = array.some((seg) => seg.x === head.x && seg.y === head.y);
  if (hit) alert("Game Over! You hit your self.");
  return hit;
}

document.addEventListener("keydown", directionControl);

let canChangeDirection = true;

function directionControl(event) {
  if (!canChangeDirection) return;

  if ((event.key === "ArrowLeft" || event.key === "a") && direction !== "RIGHT")
    direction = "LEFT";
  else if (
    (event.key === "ArrowUp" || event.key === "w") &&
    direction !== "DOWN"
  )
    direction = "UP";
  else if (
    (event.key === "ArrowRight" || event.key === "d") &&
    direction !== "LEFT"
  )
    direction = "RIGHT";
  else if (
    (event.key === "ArrowDown" || event.key === "s") &&
    direction !== "UP"
  )
    direction = "DOWN";

  canChangeDirection = false;
}
