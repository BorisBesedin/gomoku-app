import renderGameField from "./modules/renderGameField";
import replay from "./modules/replay";
import gameMechanic from "./modules/gameMechanic";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let gameStatus = {
        col: 15,
        rows: 15,
        winCombo: '+++++',
        isPlaying: true,
        gameOver: false,
        currentPlayer: 'x',
        prevTakeX: [],
        prevTakeO: [],
        allMoves: 0
    };

    renderGameField(gameStatus);
    replay(gameStatus);
    gameMechanic(gameStatus);
});




