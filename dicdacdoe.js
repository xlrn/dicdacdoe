const fakeboard = ['x','x','x','x','o','o','o','o','x'];

const gameBoard = (() => {
    const board = fakeboard;

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
        return square;
    }

    const renderAllSquares = (boardLength) => {
        let n = 0;
        while(n < boardLength) {
            let square = createSquare(n);
            gameboard.appendChild(square);
            console.log('aaaa');
            n++;
        }
    }

    return {renderAllSquares}
})();

const playerFactory = (player, isTurn) => {
    return {player, isTurn}
}

displayController.renderAllSquares(9);