const x_class = 'x'
const circle_class= 'circle'
const winningCombinations = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]


const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    hoverState()
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circle_class : x_class
    //placemark
    placeMark(cell, currentClass);
    //check win
    if (checkWin(currentClass)) {
        endgame(false)
    } else if (isDraw()) {
        endgame(true)
    } else {
        //switch turns    
        switchTurn()
        //hover state
        hoverState()
    }
}

function endgame(draw) {
    if (draw){
        winningMessage.innerText = "Draw!"
    } else{
        winningMessage.innerText = `${ circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    circleTurn = !circleTurn
}

function hoverState() {
    board.classList.remove(x_class)
    board.classList.remove(circle_class)

    if(circleTurn){
        board.classList.add(circle_class)
    } else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}