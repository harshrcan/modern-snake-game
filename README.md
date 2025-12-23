# 🐍 Modern Snake Game

A feature-rich, modernized version of the classic arcade game built using HTML5, CSS3, and Vanilla JavaScript. This project introduces strategy elements like dynamic obstacles and difficulty scaling.


<img width="1574" height="710" alt="image" src="https://github.com/user-attachments/assets/26bcbdc8-879f-42e0-b9ce-3d804c52202f" />


## 🌟 Key Features

* **3 Difficulty Levels:**
    * **Easy:** Slow speed, 1 Bomb.
    * **Medium:** Normal speed, 3 Bombs.
    * **Hard:** Fast speed, 5 Bombs.
* **Dynamic Hazard System:** Unlike standard Snake, this game features **Bombs**. Every time you eat an apple, the bombs shuffle to new random locations, keeping the gameplay unpredictable.
* **Responsive Grid:** The game board calculates the available screen size and maximizes the grid area automatically.
* **Persistent High Score:** Uses `localStorage` to save your best score even after you close the browser.
* **Custom Assets:** Supports custom images for the Snake Head, Food (Apple), and Obstacles (Bombs).
* **Rotational Logic:** The snake's head image rotates dynamically to match the direction of movement.

## 🛠️ Tech Stack

* **HTML5** (Structure)
* **CSS3** (Styling, Grid Layout, Flexbox)
* **JavaScript (ES6+)** (Game Loop, DOM Manipulation, Logic)

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/modern-snake-game.git](https://github.com/your-username/modern-snake-game.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd modern-snake-game
    ```
3.  **Add Assets:**
    Ensure you have the following images in the root folder (or the game will fall back to colors/empty blocks):
    * `apple.jpg`
    * `bomb.jpg`
    * `head.jpg`
4.  **Launch:**
    Open `index.html` in your web browser.

## 🎮 Controls

* **Start Game:** Select a level from the dropdown and click "Start Game".
* **Movement:** Use **Arrow Keys** or **WASD** to control the snake.
* **Objective:** Eat the **Apples** to grow and gain points.
* **Game Over:** Avoid hitting the **Walls**, **Your Tail**, or the **Bombs**.

## 🧠 Code Highlights

This project demonstrates several core JavaScript concepts:
* **Game Loop:** utilizing `setInterval` for the game tick.
* **DOM Manipulation:** Dynamically generating the grid and updating classes.
* **Collision Detection:** Checking coordinates against arrays for walls, self, and obstacles.
* **State Management:** Handling game states (Running, Game Over, Paused) and Score.

## 🔮 Future Improvements

* [ ] Add sound effects for eating and game over.
* [ ] Add mobile touch controls (swipe to move).
* [ ] Create a "Campaign Mode" with increasing speed.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
