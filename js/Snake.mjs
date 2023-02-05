class Snake {
	static displaySnake(board, snakePosition, snakeCellClass) {
		board.textContent = '';

		snakePosition.map((position) => {
			const newItem = document.createElement('div');
			newItem.classList.add(snakeCellClass);
			newItem.style.gridColumnStart = position.x;
			newItem.style.gridRowStart = position.y;
			board.appendChild(newItem);
		});
	}

	static isSnakeOffTheBoard(x, y, boardCellsNr) {
		return x > boardCellsNr || y > boardCellsNr || x <= 0 || y <= 0;
	}

	static isSnakeTouchedItself(snakePosition) {
		const duplicatedObjLength = snakePosition.filter(
			(obj, index) =>
				snakePosition.findIndex(
					(item) => item.x === obj.x && item.y === obj.y,
				) !== index,
		).length;

		return duplicatedObjLength;
	}
}
export default Snake;
