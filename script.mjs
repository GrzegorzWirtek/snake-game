const board = document.querySelector('.board');
const playAgainBtn = document.querySelector('#play-again-btn');
let isSnakeMove = false;
const initialSnakePosition = [
	{
		x: 1,
		y: 1,
	},
	{
		x: 2,
		y: 1,
	},
	{
		x: 3,
		y: 1,
	},
	{
		x: 4,
		y: 1,
	},
];

const initialFoodPosition = {
	x: 5,
	y: 5,
};
const snakeSpeed = 6; //1 slow, 10 fast
const boardCellsNr = 10;
let key = 'ArrowRight';
let time = performance.now();
let snakePosition = [...initialSnakePosition];
let foodPosition = { ...initialFoodPosition };

function playAgain() {
	playAgainBtn.classList.remove('visible');
	playAgainBtn.removeEventListener('click', playAgain);
	snakePosition = [...initialSnakePosition];
	foodPosition = { ...initialFoodPosition };
	key = 'ArrowRight';
	displaySnake();
	displayFood();
}

function gameOver() {
	playAgainBtn.classList.add('visible');
	playAgainBtn.addEventListener('click', playAgain);
}

function randomizeFoodPosition() {
	const randomX = Math.floor(Math.random() * (10 - 1) + 1);
	const randomY = Math.floor(Math.random() * (10 - 1) + 1);

	const duplicated = snakePosition.filter(
		(item) => item.x === randomX && item.y === randomY,
	);

	if (duplicated.length) {
		return randomizeFoodPosition();
	}
	return { x: randomX, y: randomY };
}

function displayFood() {
	const food = document.createElement('div');
	food.classList.add('food');
	food.style.gridColumnStart = foodPosition.x;
	food.style.gridRowStart = foodPosition.y;
	board.appendChild(food);
}

function displaySnake() {
	board.textContent = '';

	snakePosition.map((position) => {
		const newItem = document.createElement('div');
		newItem.classList.add('item');
		newItem.style.gridColumnStart = position.x;
		newItem.style.gridRowStart = position.y;
		board.appendChild(newItem);
	});
}

function isSnakeOffTheBoard(x, y) {
	return x > boardCellsNr || y > boardCellsNr || x <= 0 || y <= 0;
}

function isSnakeTouchedItself() {
	const duplicatedObj = snakePosition.filter(
		(obj, index) =>
			snakePosition.findIndex(
				(item) => item.x === obj.x && item.y === obj.y,
			) !== index,
	).length;

	return duplicatedObj;
}

function snakeMove(xNr, yNr) {
	let x = snakePosition[snakePosition.length - 1].x + xNr;
	let y = snakePosition[snakePosition.length - 1].y + yNr;

	snakePosition.push({ x, y });

	if (isSnakeOffTheBoard(x, y) || isSnakeTouchedItself())
		return (isSnakeMove = false);

	if (x === foodPosition.x && y === foodPosition.y) {
		foodPosition = randomizeFoodPosition();
	} else {
		snakePosition.shift();
	}

	displaySnake();
	displayFood();
}

function chooseDirection(key) {
	switch (key) {
		case 'ArrowRight':
			snakeMove(1, 0);
			break;
		case 'ArrowLeft':
			snakeMove(-1, 0);
			break;
		case 'ArrowDown':
			snakeMove(0, 1);
			break;
		case 'ArrowUp':
			snakeMove(0, -1);
			break;
	}
}

function timeLoop(currentTime) {
	if (!isSnakeMove) return gameOver();
	window.requestAnimationFrame(timeLoop);
	if (currentTime - time < 1000 / snakeSpeed) return;
	chooseDirection(key);
	time = currentTime;
}

function startMove() {
	isSnakeMove = true;
	window.requestAnimationFrame(timeLoop);
}

function stopMove() {
	isSnakeMove = false;
}

function keyDown(e) {
	if (
		(key === 'ArrowLeft' && e.key === 'ArrowRight') ||
		(key === 'ArrowRight' && e.key === 'ArrowLeft') ||
		(key === 'ArrowUp' && e.key === 'ArrowDown') ||
		(key === 'ArrowDown' && e.key === 'ArrowUp')
	)
		return;
	key = e.key;
}

document.querySelector('#start-btn').addEventListener('click', startMove);
document.querySelector('#stop-btn').addEventListener('click', stopMove);
document.addEventListener('keydown', keyDown);
