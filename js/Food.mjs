class Food {
	static randomizeFoodPosition(snakePos) {
		const snakePosition = snakePos;
		const randomX = Math.floor(Math.random() * (10 - 1) + 1);
		const randomY = Math.floor(Math.random() * (10 - 1) + 1);

		const duplicated = snakePosition.filter(
			(item) => item.x === randomX && item.y === randomY,
		);

		if (duplicated.length) {
			return this.randomizeFoodPosition(snakePosition);
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
