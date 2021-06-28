const player = (name, marker) => {
  return {name, marker}
};

const gameController = (() => {
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
  // Reset fucnction when reset button clicked
  const reset = () => {
    for (let block of gameBoard) {
      block = ""
    } 
  }
  return {
    gameBoard,
    checkField,
    reset
  }
})()

const Game = (() => {
  const h3 = document.querySelector('h3');

  const player1 = player('Player 1', 'X');
  const player2 = player('Player 2', 'O');

  let turn = 1;
  let isOver = false;

  const checkPlayer = () => {
    return (turn % 2 === 1) ? player1: player2;
  }

  const playTurn = (index) => {
    let player = checkPlayer();
    gameController.checkField(index, player.marker);
    console.log('Hel;lo' + checkWinner(index))
    if (checkWinner(index)) {
      isOver = true;
      h3.textContent = `${Game.checkPlayer().name} WIN!!!!!!`
      return;
    }
    else if (turn === 9) {
      isOver = true;
      h3.innerHTML = 'Draw';
      return;
    }
    turn++;
    h3.innerHTML = `${Game.checkPlayer().name}'s turn`
  }; 

  // Check Winner
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
          (index) => gameController.gameBoard[index] === checkPlayer().marker)
      );
  };

  const checkOver = () => {
    console.log(isOver)
    return isOver;
  } 

  return { 
    checkOver,
    checkPlayer,
    playTurn, 
  }
})()

const play = (() => {
  const board = Array.from(document.querySelectorAll('.block'));

  // X and O on board 
  board.forEach(block => {block.addEventListener('click', (e) => {
    if (Game.checkOver() || block.textContent !== "") {
      return;
    }
    const index = board.indexOf(block)
    Game.playTurn(index);
    block.innerHTML = gameController.gameBoard[index]
      // Game.checkOver()
  })});
})();
