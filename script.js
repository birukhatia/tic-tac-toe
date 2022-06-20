const parent = document.querySelector('.boxes').children;
const boxes = document.querySelectorAll('[data-box="b"]');
const playerTurn = document.querySelector('[data-turn="p"]');

boxes.forEach(box => {
    box.addEventListener('click', clickedBox);
});

let boxArray = [];
let choices = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

//boolean to keep track of player turns
let pT = new Boolean(false);

//store all 9 text values in an array
function storeBoxesInArray(){
    for (let i = 0; i < parent.length; i++){
        boxArray.push(parent.item(i).firstChild.textContent);
    }
}

storeBoxesInArray();

//upon clicking an area, make text visible and output X or O depending on turns
function clickedBox() {
    pT = !pT;

    if (pT) {
        this.firstChild.textContent = 'O';
        playerTurn.textContent = "Player 1's turn";

        //prevent user from clicking the same spot
        this.removeEventListener('click', clickedBox);
    }
    
    if (!pT) {
        this.firstChild.textContent = 'X';
        playerTurn.textContent = "Player 2's turn";

        //prevent user from clicking the same spot
        this.removeEventListener('click', clickedBox);
    }

    this.firstChild.style.visibility = 'visible';

    //replace choices with X or O
    for (let i = 0; i < boxArray.length; i++){
        if (this === parent.item(i)){
            choices[i] = this.firstChild.textContent;
        }
    }

    //check if there is a match/victory
    checkVictory(choices);
}

//check horizontal, vertical, and diagonals for matching letters
function checkVictory(array){
    let arr = Array.from(array);

    if (arr[0] === arr[1] && arr[1] === arr[2]){
        victory();
    }

    if (arr[3] === arr[4] && arr[4] === arr[5]){
        victory();
    }

    if (arr[6] === arr[7] && arr[7] === arr[8]){
        victory();
    }

    if (arr[0] === arr[3] && arr[3] === arr[6]){
        victory();
    }

    if (arr[1] === arr[4] && arr[4] === arr[7]){
        victory();
    }

    if (arr[2] === arr[5] && arr[5] === arr[8]){
        victory();
    }

    if (arr[0] === arr[4] && arr[4] === arr[8]){
        victory();
    }

    if (arr[2] === arr[4] && arr[4] === arr[6]){
        victory();
    }
}

//print who one and prevent user from clicking any areas anymore
function victory() {
    if (pT) {
        playerTurn.textContent = "Player 2 wins";
    } 
    else {
        playerTurn.textContent = "Player 1 wins";
    }

    boxes.forEach(box => {
        box.removeEventListener('click', clickedBox);
    });
}