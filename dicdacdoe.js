const fakeboard = ['x','x','x','x','o','o','o','o','x'];
const emptyboard = [];

const gameBoard = (() => {
    const board = emptyboard;

    const getSquare = (n) => {
        if (n < 0 || n > 9) {
            return "";
        } else
        return board[n];
    }

    return {
        getSquare
    }
})();

const displayController = (() => {
    const gameboard = document.querySelector('#gameboard');
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
    }

    renderAllSquares(9);

    return {}
})();

const playerFactory = (sign, isTurn) => {
    return {sign, isTurn}
}

const game = (() => {
    const player1 = playerFactory("x", true);
    const player2 = playerFactory("o", false);

    const currentPlayer = () => {
        if (player1.isTurn) {
            return player1;
        } else return player2;
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

    return {currentPlayer, changeTurn}
})();

const modalController = (() => {
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.close');
    
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
})();