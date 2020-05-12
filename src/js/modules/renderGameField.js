const renderGameField = (state) => {
	const table = document.querySelector('.game-field'),
    	replayBtn = document.querySelector('.replay-btn'),
    	currentPlayer = document.querySelector('.current-player');

    let colums = state.col,
    	rows = state.rows;

	for (let i = 0; i < colums; i++) {
        let row = document.createElement('tr');

        table.appendChild(row);

        for (let j = 0; j < rows; j++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            cell.classList.add('cell');
            cell.setAttribute("data-col", j + 1);
            cell.setAttribute("data-row", i + 1);
        }        
    }

    currentPlayer.textContent = 'x';
	currentPlayer.style.color = 'red';
};

export default renderGameField;