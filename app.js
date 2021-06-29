const player = (name, marker) => {
  return {name, marker}
};

const boardController = (() => {
  // Gameboard array
  const gameBoard = ["","","","","","","","",""];

  const setField = (index, sign) => {
    gameBoard[index] = sign
  }

  const checkField = (index, mark) => {
    if (gameBoard[index] === "") {
      setField(index, mark);
      return true
    } 
    return false
  }

  // Function to reset gameBoard
  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++ ) {
      gameBoard[i] = "";
    }  
  }

  return {
    gameBoard,
    checkField,
    resetBoard
  }
})()

const gameController = (() => {
  const h3 = document.querySelector('h3');

  const player1 = player('X', 'X');
  const player2 = player('O', 'O');

  let turn = 1;
  let isOver = false;

  // Check player and return player according to turn
  const checkPlayer = () => {
    return (turn % 2 === 1) ? player1: player2;
  }

  // function is to play a turn and increment the turn as the game go
  const playTurn = (index) => {
    let player = checkPlayer();
    boardController.checkField(index, player.marker);
    if (checkWinner(index)) {
      isOver = true;
      h3.textContent = `${gameController.checkPlayer().name} WIN!!!!!!`
      return;
    }
    else if (turn === 9) {
      isOver = true;
      h3.innerHTML = 'It is a Draw';
      return;
    }
    turn++;
    h3.innerHTML = `${gameController.checkPlayer().name}'s turn`
  }; 

  // Check Winning condition return boolean value
  const checkWinner = (index) => {
    const winConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    return winConditions
      .filter((combination) => combination.includes(index))
      .some(
        (possibleCombination) => 
        possibleCombination.every(
          (index) => boardController.gameBoard[index] === checkPlayer().marker)
      );
  };

  // Function to return the over status
  const checkOver = () => {
    return isOver;
  } 

  // Reset function that restart the game
  const reset = () => {
    turn = 1;
    boardController.resetBoard()
    isOver = false;
    h3.innerHTML = "X's Turn"
  }

  return { 
    checkOver,
    checkPlayer,
    playTurn,
    reset 
  }
})()

// Module to play the game
const play = (() => {
  const board = Array.from(document.querySelectorAll('.block'));
  const resetBtn = document.querySelector('#reset');

  // Update the current board
  const updateBoard = () => {
    for (let i =  0; i < board.length; i++) {
      board[i].textContent = boardController.gameBoard[i];
    }
  }

  // X and O on board 
  board.forEach(block => {block.addEventListener('click', (e) => {
    if (gameController.checkOver() || block.textContent !== "") {return}
    const index = board.indexOf(block)
    gameController.playTurn(index);
    updateBoard()
  })});

  // Add reset butoon
  resetBtn.addEventListener('click', () => {
    gameController.reset()
    updateBoard()
  })
})();
