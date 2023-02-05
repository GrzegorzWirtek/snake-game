const board = document.querySelector('.board');
const playAgainBtn = document.querySelector('#play-again-btn');
let isSnakeMove = false;
const snakeSpeed = 6; //1 slow, 10 fast
const boardCellsNr = 10;
let key = 'ArrowRight';
let time = performance.now();
let itemsArr = [
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

let foodPosition = {
	x: 5,
	y: 5,
};

function playAgain() {
	playAgainBtn.classList.remove('visible');
	playAgainBtn.removeEventListener('click', playAgain);
	itemsArr = [
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
	key = 'ArrowRight';
	displayItems();
}

function gameOver() {
	playAgainBtn.classList.add('visible');
	playAgainBtn.addEventListener('click', playAgain);
}

function randomizeFoodPosition() {
	const randomX = Math.floor(Math.random() * 10 + 1);
	const randomY = Math.floor(Math.random() * 10 + 1);

	const duplicated = itemsArr.filter(
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

function displayItems() {
	board.textContent = '';

	itemsArr.map((position) => {
		const newItem = document.createElement('div');
		newItem.classList.add('item');
		newItem.style.gridColumnStart = position.x;
		newItem.style.gridRowStart = position.y;
		board.appendChild(newItem);
	});

	displayFood();
}

function snakeMove(xNr, yNr) {
	let x = itemsArr[itemsArr.length - 1].x + xNr;
	let y = itemsArr[itemsArr.length - 1].y + yNr;

	itemsArr.push({ x, y });

	if (x > boardCellsNr || y > boardCellsNr || x <= 0 || y <= 0)
		return (isSnakeMove = false);

	if (x === foodPosition.x && y === foodPosition.y) {
		foodPosition = randomizeFoodPosition();
	} else {
		itemsArr.shift();
	}

	displayItems();
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
