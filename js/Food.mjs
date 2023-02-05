class Food {
	static randomizeFoodPosition(snakePos, boardCells) {
		const snakePosition = snakePos;
		const boardCellsNr = boardCells;
		const randomX = Math.floor(Math.random() * (boardCellsNr - 1) + 1);
		const randomY = Math.floor(Math.random() * (boardCellsNr - 1) + 1);

		const duplicated = snakePosition.filter(
			(item) => item.x === randomX && item.y === randomY,
		);

		if (duplicated.length) {
			return this.randomizeFoodPosition(snakePosition, boardCellsNr);
		}
		return { x: randomX, y: randomY };
	}

	static displayFood(board, foodPosition, foodClass) {
		const food = document.createElement('div');
		food.classList.add(foodClass);
		food.style.gridColumnStart = foodPosition.x;
		food.style.gridRowStart = foodPosition.y;
		board.appendChild(food);
	}
}
export default Food;
