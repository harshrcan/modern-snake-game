// --- Game Configuration & State ---
const board = document.getElementById("game-board");
const gridElement = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const timeEl = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");

// Must match CSS --box-size
let BOX_SIZE = 40; 

let rows, cols;
let cells = []; 

let snake = [];
let food = { x: 0, y: 0 };
let bombs = []; 
let currentBombCount = 0; 

let direction = { x: 1, y: 0 }; 
let nextDirection = { x: 1, y: 0 }; 
let score = 0;
let highScore = localStorage.getItem("snakeHigh") || 0;
let gameInterval;
let timerInterval;
let seconds = 0;

highScoreEl.innerText = highScore;

// --- Setup the Grid ---
function createGrid() {
    const rect = board.getBoundingClientRect();
    cols = Math.floor(rect.width / BOX_SIZE);
    rows = Math.floor(rect.height / BOX_SIZE);

    gridElement.style.gridTemplateColumns = `repeat(${cols}, ${BOX_SIZE}px)`;
    gridElement.style.gridTemplateRows = `repeat(${rows}, ${BOX_SIZE}px)`;
    
    gridElement.innerHTML = "";
    cells = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            gridElement.appendChild(cell);
            cells.push(cell);
        }
    }
}

function getIndex(x, y) {
    return y * cols + x;
}

// --- Game Logic ---

function startGame() {
    // 1. Get Settings
    const level = document.getElementById("level-select").value;
    let speed;

    if (level === 'easy') {
        speed = 200; 
        currentBombCount = 1;
    } else if (level === 'medium') {
        speed = 130; 
        currentBombCount = 3;
    } else {
        speed = 90;  
        currentBombCount = 5;
    }

    // 2. Reset Variables
    snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    seconds = 0;
    scoreEl.innerText = score;
    timeEl.innerText = "00:00";
    
    // 3. Initial Placements
    generateBombs(currentBombCount);
    placeFood();
    
    // 4. Handle UI
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden"); 
    
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    
    gameInterval = setInterval(update, speed);
    timerInterval = setInterval(updateTimer, 1000);
}

function update() {
    direction = nextDirection; 

    const head = snake[0];
    const newHead = { x: head.x + direction.x, y: head.y + direction.y };

    // 1. Wall Collision
    if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
        gameOver();
        return;
    }

    // 2. Self Collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return;
    }

    // 3. Bomb Collision
    if (bombs.some(bomb => bomb.x === newHead.x && bomb.y === newHead.y)) {
        gameOver();
        return;
    }

    // Move Snake
    snake.unshift(newHead);

    // 4. Check Food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreEl.innerText = score;
        
        placeFood(); 
        generateBombs(currentBombCount); // Shuffle bombs when food is eaten
        
    } else {
        snake.pop(); // Remove tail
    }

    draw();
}

function draw() {
    // Clear classes and styles (reset rotation)
    cells.forEach(cell => {
        cell.className = 'cell';
        cell.style.transform = '';
    });

    // Draw Food
    let foodIdx = getIndex(food.x, food.y);
    if(cells[foodIdx]) cells[foodIdx].classList.add("food");

    // Draw Bombs
    bombs.forEach(bomb => {
        let idx = getIndex(bomb.x, bomb.y);
        if(cells[idx]) cells[idx].classList.add("bomb");
    });

    // Draw Snake
    snake.forEach((segment, index) => {
        let idx = getIndex(segment.x, segment.y);
        if (cells[idx]) {
            cells[idx].classList.add("snake");
            
            // Handle Head Rotation
            if (index === 0) {
                cells[idx].classList.add("head");
                
                // Rotate head.jpg based on direction
                // Assumes head.jpg faces UP by default
                if (direction.x === 1) {
                    cells[idx].style.transform = "rotate(90deg)"; // Right
                } else if (direction.x === -1) {
                    cells[idx].style.transform = "rotate(-90deg)"; // Left
                } else if (direction.y === 1) {
                    cells[idx].style.transform = "rotate(180deg)"; // Down
                } else if (direction.y === -1) {
                    cells[idx].style.transform = "rotate(0deg)";   // Up
                }
            }
        }
    });
}

function placeFood() {
    let valid = false;
    while (!valid) {
        food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
        // Don't spawn on snake or bombs
        const onSnake = snake.some(s => s.x === food.x && s.y === food.y);
        const onBomb = bombs.some(b => b.x === food.x && b.y === food.y);
        
        if (!onSnake && !onBomb) valid = true;
    }
}

function generateBombs(count) {
    bombs = [];
    while (bombs.length < count) {
        let newBomb = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
        
        const onSnake = snake.some(s => s.x === newBomb.x && s.y === newBomb.y);
        const onFood = (newBomb.x === food.x && newBomb.y === food.y);
        const exists = bombs.some(b => b.x === newBomb.x && b.y === newBomb.y);
        // Safety zone around start (0-8 x, 0-8 y) primarily for first spawn
        const safeZone = (score === 0) && (newBomb.x < 8 && newBomb.y < 8); 

        if (!onSnake && !onFood && !exists && !safeZone) {
            bombs.push(newBomb);
        }
    }
}

function updateTimer() {
    seconds++;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    timeEl.innerText = `${m}:${s}`;
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHigh", highScore);
        highScoreEl.innerText = highScore;
    }

    document.getElementById("final-score").innerText = score;
    document.getElementById("final-high-score").innerText = highScore;
    
    // Show End Screen
    endScreen.classList.remove("hidden");
}

// --- Input Handling ---
window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp": case "w": case "W":
            if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown": case "s": case "S":
            if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft": case "a": case "A":
            if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight": case "d": case "D":
            if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
            break;
    }
});

// --- Initialization ---
createGrid();
window.addEventListener("resize", createGrid);

document.getElementById("start-btn").addEventListener("click", startGame);

document.getElementById("restart-btn").addEventListener("click", () => {
    // Go back to start screen to allow level selection
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    createGrid(); 
});