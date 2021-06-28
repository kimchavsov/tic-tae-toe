const player = (name, marker) => {
  return {name, marker}
};

const Gameboard = (() => {
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
  const h3 = document.querySelector('h3')

  const player1 = player('Player 1', 'X');
  const player2 = player('Player 2', 'O');
  let turn = 1


  const checkPlayer = () => {
    return (turn % 2 === 1) ? player1: player2
  }

  const playTurn = (index) => {
    let player = checkPlayer() 
    if (Gameboard.checkField(index, player.marker)) {
      turn++
    }
    h3.innerHTML = `${Game.checkPlayer().name}'s turn`

  }; 
  const checkOver = () => {
    if (turn !== 10) {
      return true
    } else {
      h3.innerHTML = 'Draw'
      return false
    }
  }

  const checkWinner

  return { 
    checkOver,
    checkPlayer,
    playTurn
  }
})()

const play = (() => {
  const board = Array.from(document.querySelectorAll('.block'));

  // X and O on board 
  board.forEach(block => {block.addEventListener('click', () => {
    if (Game.checkOver()) {
      const index = board.indexOf(block)
      Game.playTurn(index);


      block.innerHTML = Gameboard.gameBoard[index]
      Game.checkOver()
    }
  })});
})();
