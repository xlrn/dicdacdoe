const fakeboard = ['x','x','x','x','o','o','o','o','x'];
const emptyboard = [];

const gameBoard = (() => {
    let board = emptyboard;

    const getSquare = (n) => {
        if (n < 0 || n > 9) {
            return "";
        } else
        return board[n];
    }

    const clearBoard = () => {
        board = emptyboard;
    }
    
    const getBoard = () => {
        return board;
    }

    return {
        getBoard,
        getSquare,
        clearBoard
    }
})();

const displayController = (() => {
    const gameboard = document.querySelector('#gameboard');
    const winner = document.querySelector('#winMessage');
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');

    const createSquare = (number) => {
        const square = document.createElement('div');
        square.setAttribute('id', `square${number}`);
        square.setAttribute('class', 'square');
        square.textContent = gameBoard.getSquare(number);
        return square;
    }

    const renderAllSquares = (boardLength) => {
        let n = 0;
        while(n < boardLength) {
            let square = createSquare(n);
            square.addEventListener("click", handleClick);
            gameboard.appendChild(square);
            n++;
        }
    }

    const handleClick = (e) => {
        const square = e.target;
        if (square.textContent == "") {
            square.textContent = game.currentPlayer().sign;
            game.changeTurn();
        }
        if (game.calculateWinner(gameBoard.getBoard())) {
            console.log('aaaa');
            winner.textContent = game.currentPlayer + " is the winner!"
        }
    }

    const setPlayer1Name = () => {
        player1.textContent = "X = " + game.getPlayer1Name();
    }

    const setPlayer2Name = () => {
        player2.textContent = "O = " + game.getPlayer2Name();
    }

    const reloadBoard = () => {
        while (gameboard.firstChild) {
            gameboard.removeChild(gameboard.lastChild);
        }
        renderAllSquares(9);
    }

    renderAllSquares(9);

    return {setPlayer1Name, setPlayer2Name, reloadBoard}
})();

const playerFactory = (name, sign, isTurn) => {
    return {name, sign, isTurn}
}

const game = (() => {
    let player1 = playerFactory("", "x", true);
    let player2 = playerFactory("", "o", false);

    const currentPlayer = () => {
        if (player1.isTurn) {
            return player1;
        } else return player2;
    }

    const setPlayer1 = (name) => {
        player1 = playerFactory(name, "x", true);
    }

    const setPlayer2 = (name) => {
        player2 = playerFactory(name, "o", true);
    }

    const getPlayer1Name = () => {
        return player1.name;
    }

    const getPlayer2Name = () => {
        return player2.name;
    }

    const changeTurn = () => {
        if (player1.isTurn) {
            player1.isTurn = false;
            player2.isTurn = true;
        } else {
            player1.isTurn = true;
            player2.isTurn = false;
        }
    }

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    return {getPlayer1Name, setPlayer1, getPlayer2Name, setPlayer2, currentPlayer, changeTurn, calculateWinner}
})();

const modalController = (() => {
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.close');
    const submit = document.querySelector('#subwaysandwich');
    const p1name = document.querySelector('#p1name');
    const p2name = document.querySelector('#p2name');
    const reset = document.querySelector('#reset');

    window.onload = () => {
        modal.style.display = "block";
    }

    close.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        } 
    }

    const handleClick = () => {
        game.setPlayer1(p1name.value);
        game.setPlayer2(p2name.value);
        displayController.setPlayer1Name();
        displayController.setPlayer2Name();
        modal.style.display = "none"; 
        p1name.value = "";
        p2name.value = "";
    }

    const openModal = () => {
        modal.style.display = "block";
        gameBoard.clearBoard();
        displayController.reloadBoard();
    }

    reset.addEventListener('click', openModal);
    submit.addEventListener('click', handleClick);
    return {}
})();