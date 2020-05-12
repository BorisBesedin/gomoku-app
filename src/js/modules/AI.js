const AI = (state) => {
	const checkCellsForTurn = (prevCell) => {
		let col = prevCell.getAttribute("data-col"),
			row = prevCell.getAttribute("data-row"),
			horizontal = document.querySelectorAll(`.cell[data-row="${row}"]`),
			vertical = document.querySelectorAll(`.cell[data-col="${col}"]`),
			player = 'x';

		let combos = ['--x--', '--x0-', '-0x--', 'x----', '----x',   
					  '-0xx-', '-xx0-',								 
					  '-xx--', '0xxx-', '-x-x-', 'x-x-x', '-xxxx-',		 
					  '--xx-', '-xxx0', '-xxx-', '-x-xx', 'xx-x-',	 
		 			  '-xxxx0', 'x-xxx', 'xx-xx', 'xxx-x', '0xxxx-',	 
					];

		if (prevCell.classList.contains('x')) {
			player = 'x';
		} else {
			player = 'o';
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

		        let cells = document.querySelectorAll('.cell');

		        cells.forEach(function(item) {
		            if (item.getAttribute("data-col") === `${col}` && 
		                item.getAttribute("data-row") === `${row}`) {
		                diagonal.push(item);
		            }
		        });		        
		    }
		    return diagonal;
		}

		function checkLine(elems) {
			let line = '',
				possibleMoves = [];


		    elems.forEach(item => {
		        if (item.classList.contains(player)) {
		            line+='x';
		        } else if (item.className !== 'cell'){
		        	line+='0';
		        } else {
					line+='-';
		        }
		    });

		    function getMovesAndPriority(line, combo, priority) {
		    	let moves = [],
		    		comboIndex = line.indexOf(combo),
		    		length = comboIndex + (combo.length - 1);

		    	function getRandom(max) {
		    		return Math.floor(Math.random() * Math.floor(max))
		    	}

		    	function setPriority(moveIndex) {
		    		elems.forEach((item, i) => {
				    	if (i >= comboIndex && i <= length && item.className === 'cell') {
				    		moves.push(item);
				    	}
				    });
				    if (+moves[moveIndex].getAttribute('data-priority') < +priority) {
				    	moves[moveIndex].setAttribute('data-priority', priority);	
				    }    
		    	}

		    	switch(combo) {
		    		case '--x--':
		    		case '--x0-':
		    		case '-0x--':
		    		case '--xx-':		    		
		    		case '-xxx-':
		    		case '-xx--':
		    		case '-x-x-':
		    		case '-x-xx':
		    		case 'xx-x-':
		    			setPriority(1);			    	
		    			break;

		    		case '----x':
		    			setPriority(3);			    	
		    			break;

		    		case '-0xx-':
		    		case '-xx0-':
		    		case '-xxxx-':
		    			setPriority(getRandom(2));	
		    			break;

		    		case '-xxxx0':
		    		case 'x-xxx':
		    		case 'xx-xx':
		    		case 'xxx-x':
		    		case '0xxxx-':
		    		case 'x----':
		    		case '0xxx-':
		    		case 'x-x-x':
		    		case '-xxx0':
		    			setPriority(0);			    	
		    			break;
		    	}
		    	return moves;
		    }

		    combos.forEach((item) => {
		    	if (line.includes(item)) {	    	
		    		switch(item) {
		    			case '--x--':
		    			case '--x0-':
		    			case '-0x--':
		    			case 'x----':
		    			case '----x':
		    				possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '1'));
		    				break;

		    			case '-0xx-':
		    			case '-xx0-':
		    				if (player === 'x') {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '2'));
		    				} else {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '3'));
		    				}
		    				break;

		    			case '-xx--':
		    			case '--xx-':		    					    			
		    				if (player === 'x') {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '4'));
		    				} else {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '5'));
		    				}
		    				break;

		    			case '-xxx0':
		    			case '0xxx-':
		    			case '-x-x-':		    			
		    				if (player === 'x') {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '6'));
		    				} else {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '7'));
		    				}
		    				break;

		    			case '-xxx-':
		    			case '-x-xx':
		    			case 'xx-x-':
		    			case 'x-x-x':
		    				if (player === 'x') {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '8'));
		    				} else {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '9'));
		    				}
		    				break;

		    			case '-xxxx0':
		    			case 'x-xxx':
		    			case 'xx-xx':
		    			case 'xxx-x':
		    			case '0xxxx-':
		    			case '-xxxx-':
		    				if (player === 'x') {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '10'));
		    				} else {
		    					possibleMoves = possibleMoves.concat(getMovesAndPriority(line, item, '11'));
		    				}
		    				break;    			
		    		}	
		    	}    		
		    });

		    return possibleMoves;
		}
		return checkLine(horizontal)
			.concat(checkLine(vertical))
			.concat(checkLine(getDiagonal('toRightUp')))
			.concat(checkLine(getDiagonal('toRightDown')));		
	};

	let prevMovesX = state.prevTakeX,
		prevMovesO = state.prevTakeO; 

	let moves = [];

	function checkPrevMoves(prevMovesArr) {
		let arr = prevMovesArr;

		if (prevMovesArr.length > 2) {
			arr = prevMovesArr.slice((prevMovesArr.length - 2), prevMovesArr.length);
		}
		arr.forEach(item => {
			moves = moves.concat(checkCellsForTurn(item));
		});	
	}

	if (prevMovesX) {
		checkPrevMoves(prevMovesX);
	}

	if (prevMovesO) {
		checkPrevMoves(prevMovesO);
	}

	moves.sort(function(a, b) {
		return +b.getAttribute('data-priority') - +a.getAttribute('data-priority');
	});

	let priorityMoves = moves.filter((a, b)=>{
		return a.getAttribute('data-priority') === moves[0].getAttribute('data-priority');
	});

	return priorityMoves;
};

export default AI;