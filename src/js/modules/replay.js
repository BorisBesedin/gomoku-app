const replay = (state) => {
	const replayBtn = document.querySelector('.replay-btn'),
		currentPlayer = document.querySelector('.current-player'),
		cells = document.querySelectorAll('.cell');

	function replay() {
		state.currentPlayer = 'x';
		state.isPlaying = true;
		state.gameOver = false;
		state.prevTakeX = [];
		state.prevTakeO = [];

	    currentPlayer.textContent = 'x';
	    currentPlayer.style.color = 'red';	    

	    cells.forEach(cell => {
	    	cell.className = "cell";
	    	cell.removeAttribute('data-priority');
	    });
	}

	replayBtn.addEventListener('click', replay);

};

export default replay;