import AI from "./AI";

const gameMechanic = (state) => {
	const cells = document.querySelectorAll('.cell'),
		currentPlayer = document.querySelector('.current-player');

	const checkCellsForWin = (cellPressed, player) => {
		let col = cellPressed.getAttribute("data-col"),
			row = cellPressed.getAttribute("data-row"),
			horizontal = document.querySelectorAll(`.cell[data-row="${row}"]`),
			vertical = document.querySelectorAll(`.cell[data-col="${col}"]`);


		function checkLine(elems) {
			let line = '';

		    elems.forEach(item => {
		        if (item.classList.contains(state.currentPlayer)) {
		            line+='+';
		        } else {
		            line+='-';
		        }
		    });

		    if (line.includes(state.winCombo)) {
		        gameOver(state.currentPlayer);

		        elems.forEach((item, i) => {
		        	if (i >= line.indexOf(state.winCombo) &&
		        		i <= line.indexOf(state.winCombo) + 4) {
		        		item.classList.add('win');
		        	}		        	
		        });
		    }
		}

		function getDiagonal(direction) {
			let position = {
		        col: +col,
		        row: +row
		    },
		    	diagonal = [];

		    for (let i = -4; i <= 4; i++) {
		        let col,
		            row;

		        if (direction === 'toRightUp') {
		            col = position.col - i;
		            row = position.row + i;
		        }

		        if (direction === 'toRightDown') {
		            col = position.col + i;
		            row = position.row + i;
		        }

		        cells.forEach(function(item) {
		            if (item.getAttribute("data-col") === `${col}` && 
		                item.getAttribute("data-row") === `${row}`) {
		                diagonal.push(item);
		            }
		        });		        
		    }
		    return diagonal;
		}

		checkLine(vertical);
		checkLine(horizontal);
		checkLine(getDiagonal('toRightUp'));
		checkLine(getDiagonal('toRightDown'));
	};

	const gameOver = () => {
	    let popup = document.querySelector('.game-over'),
	        winner = document.querySelector('.player-win'),
	        close = document.querySelector('.close');

	    popup.style.display = 'flex';
	    winner.textContent = state.currentPlayer;
	    state.gameOver = true;

	    if (state.currentPlayer === 'x') {
	        winner.style.color = 'red';
	    } else {
	        winner.style.color = 'green';
	    }
	    close.addEventListener('click', () => popup.style.display = 'none');
	}

	cells.forEach(function(cell) {
	    cell.addEventListener('click', () => {
	        if (cell.className === 'cell' && state.isPlaying === true && state.gameOver === false) {
	            cell.classList.add(state.currentPlayer);

	            state.isPlaying = false;

	            checkCellsForWin(cell, state.currentPlayer);

	            if (state.currentPlayer === 'x') {
	                currentPlayer.textContent = 'o';
	                currentPlayer.style.color = 'green';
	                state.currentPlayer = 'o';
	                
	                state.prevTakeX.push(cell);
	                state.allMoves++;

	            setTimeout(() => {
	            	let moveAI = AI(state);
	            	state.isPlaying = true;
	            	moveAI[0].click();
	            	
	            }, 200);

	            } else {
	                currentPlayer.textContent = 'x';
	                currentPlayer.style.color = 'red';
	                state.currentPlayer = 'x';
	                state.prevTakeO.push(cell);
	                state.isPlaying = true;
	            }
	        }
	    }); 
	});


};

export default gameMechanic;