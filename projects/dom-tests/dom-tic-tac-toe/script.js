const wonbar = document.querySelector("#mySVG");
wonbar.parentElement.style.display = "none";
const x = document.querySelector(".x").cloneNode(true);
document.querySelector(".x").remove();
const o = document.querySelector(".o").cloneNode(true);
document.querySelector(".o").remove();

const game= document.querySelector("#normalgameholder");
const botGame = game.cloneNode(true);

let turn = 0;
let gameOver = false;
let winner = "";
let totalGames = 0;
let botIsPlaying = false;

updateOutliner();

function updateOutliner(){
    let currentTurnPlayer = getPlayer().classList[0];
    let otherPlayer = currentTurnPlayer == "x" ? "o" : "x";
    getPlayerDiv(currentTurnPlayer).classList.add("outliner");
    getPlayerDiv(otherPlayer).classList.remove("outliner");
}

function getPlayer(){
    let _turn = turn + totalGames % 2;
    return _turn % 2 == 0 ? x.cloneNode(true) : o.cloneNode(true);
}

function getPlayerDiv(player){
    if(player == "x") return document.querySelector("#xdisplay");
    else return document.querySelector("#odisplay");
}

game.addEventListener("click", (e) => {
    if(e.target.classList.contains("cell")){
        let cell = e.target;
        playMove(cell);
    }
});

document.querySelector(".resetbutton").addEventListener("click", (e) => {
    let cells = game.querySelectorAll(".cell");
    cells.forEach((cell) => {
        if(cell.children.length > 0){
            cell.children[0].style.transform = "scale(0)";
            setTimeout(() => {
                cell.children[0].remove();
            }, 200);
        }
    });
    wonbar.parentElement.style.display = "none";
    turn = 0;
    gameOver = false;
    winner = "";
    updateOutliner();
});

document.querySelector("#changeplayer").addEventListener("click", (e) => {
    console.log(bestMove());
});

function playMove(cell){
    if(cell.children.length == 0 && !gameOver){
        let player = getPlayer();
        cell.appendChild(player);
        setTimeout(() => {
            player.style.transform = "scale(1)";
        }, 0);
        turn++;
        updateOutliner();
        checkWinner(document);
    }
}

function checkWinner(toQuerySelect){
    //find any x or o element
    let plays = toQuerySelect.querySelectorAll(".x, .o");
    plays.forEach((play) => {
        let myClass = play.classList[0];
        //get column
        let colNum = play.parentElement.getAttribute("id").charAt(6);
        let children = Array.from(play.parentElement.parentElement.children);
        let columnItems = [
            getCellWithNotation(1, colNum),
            getCellWithNotation(2, colNum),
            getCellWithNotation(3, colNum)
        ];
        let diagonal1 = [
            getCellWithNotation(1, "a"),
            getCellWithNotation(2, "b"),
            getCellWithNotation(3, "c")
        ];
        let diagonal2 = [
            getCellWithNotation(1, "c"),
            getCellWithNotation(2, "b"),
            getCellWithNotation(3, "a")
        ];
        const winConditions = [columnItems, children, diagonal1, diagonal2];
        for(let i = 0; i < winConditions.length; i++){
            if(gameOver) break;
            if(checkAllIsSame(winConditions[i], myClass).allSame){
                winner = myClass;
                drawLine(checkAllIsSame(winConditions[i], myClass).list[0], checkAllIsSame(winConditions[i], myClass).list[2]);
                finishGame();
                break;
            }
        }  
        if(gameOver) return;     
    });
    checkDraw();
}

function getCellWithNotation(row, column, toQuerySelect){
    if(toQuerySelect == null) toQuerySelect = document;
    return toQuerySelect.querySelector(`#cell-${row}${column}`);
}

function checkAllIsSame(list, myClass){
    let allSame = true;
    list.forEach((cell) => {
        //check if all in the same row is same
        if(cell.firstElementChild == null){
            allSame = false;
        }
        else if(!cell.firstElementChild.classList.contains(myClass)){
            allSame = false;
        }
    });
    return {
        allSame: allSame,
        list: list
    };
}

function checkDraw(){
    let cells = game.querySelectorAll(".cell");
    let allFilled = true;
    cells.forEach((cell) => {
        if(cell.children.length == 0){
            allFilled = false;
        }
    });
    if(allFilled){
        winner = "draw";
        finishGame();
    }
}

function finishGame(){
    // remove outliner
    document.querySelector("#xdisplay").classList.remove("outliner");
    document.querySelector("#odisplay").classList.remove("outliner");
    if(winner != "draw"){
        let winDisplay = document.querySelector(`#wins${winner.toUpperCase()}`);
        winDisplay.innerHTML = parseInt(winDisplay.innerHTML) + 1;
    }
    gameOver = true;
    totalGames++;
}

function drawLine(cell1, cell2) {
    // make wonbar display from topLeft to bottomRight
    // use the center of the cell as the coordinate
    wonbar.parentElement.style.display = "block";
    let x1 = cell1.offsetLeft + cell1.offsetWidth / 2;
    let y1 = cell1.offsetTop + cell1.offsetHeight / 2;
    let x2 = cell2.offsetLeft + cell2.offsetWidth / 2;
    let y2 = cell2.offsetTop + cell2.offsetHeight / 2;
    wonbar.setAttribute("x1", x1);
    wonbar.setAttribute("y1", y1);
    wonbar.setAttribute("x2", x2);
    wonbar.setAttribute("y2", y2);
}

function bestMove(){
    let bestScore = -1;
    let move = [];
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        if(cell.children.length == 0){
            let score = minimax(cell, 0, false);
            if(score > bestScore){
                bestScore = score;
                move = [cell];
            }
            else if(score == bestScore){
                move.push(cell);
            }
        }
    });
}

// planning: minimax
// object position, needs rewriting of the move engine
// function: evaluates a given position and returns -1, 0, 1, or 2 depending on who wins
// if bot wins, return 1, draw at 0
// 2 means there are legal moves left
// for every move in a position, evaluate
// if there are legal moves after the move, change position for each legal move
// if at any point evaluate returns other than 2, check the score
// if 1 stop searching
// else continue
