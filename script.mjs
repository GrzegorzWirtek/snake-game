const board = document.querySelector('.board');
let isSnakeMove = false;
let time = performance.now();
const snakeSpeed = 500;
let key = 'ArrowRight';
const itemsArr = [
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
];

function displayItems() {
	board.textContent = '';
	itemsArr.map((position) => {
		const newItem = document.createElement('div');
		newItem.classList.add('item');
		newItem.style.gridColumnStart = position.x;
		newItem.style.gridRowStart = position.y;
		board.appendChild(newItem);
	});
}

function snakeMove(xNr, yNr) {
	const x = itemsArr[itemsArr.length - 1].x + xNr;
	const y = itemsArr[itemsArr.length - 1].y + yNr;
	if (x > 10 || y > 10 || x <= 0 || y <= 0) return (isSnakeMove = false);
	itemsArr.push({ x, y });
	itemsArr.shift();

	displayItems();
}

function chooseDirection(key) {
	switch (key) {
		case 'ArrowRight':
			return snakeMove(1, 0);
		case 'ArrowLeft':
			return snakeMove(-1, 0);
		case 'ArrowDown':
			return snakeMove(0, 1);
		case 'ArrowUp':
			return snakeMove(0, -1);
	}
}

function timeLoop(currentTime) {
	window.requestAnimationFrame(timeLoop);
	if (!isSnakeMove) return;
	if (currentTime - time < snakeSpeed) return;
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
	key = e.key;
}

document.querySelector('#start-btn').addEventListener('click', startMove);
document.querySelector('#stop-btn').addEventListener('click', stopMove);
document.addEventListener('keydown', keyDown);
