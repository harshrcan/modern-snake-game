(function () {
    const BOX = 50;
    const board = document.getElementById("game-board");

    let grid = document.createElement("div");
    grid.className = "grid";
    board.appendChild(grid);

    function buildGrid() {
        const boardRect = board.getBoundingClientRect();

        const cols = Math.floor(boardRect.width / BOX);
        const rows = Math.floor(boardRect.height / BOX);

        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        grid.innerHTML = "";

        for (let i = 0; i < cols * rows; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            grid.appendChild(cell);
        }
    }

    window.addEventListener("resize", buildGrid);
    document.addEventListener("DOMContentLoaded", buildGrid);
})();
