const board = document.querySelector('.board');
let isSnakeMove = false;
const snakeSpeed = 6; //1 slow, 10 fast
const boardCellsNr = 10;
let key = 'ArrowRight';
let time = performance.now();
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
	{
		x: 4,
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
	let x = itemsArr[itemsArr.length - 1].x + xNr;
	let y = itemsArr[itemsArr.length - 1].y + yNr;

	itemsArr.push({ x, y });
	itemsArr.shift();

	if (x > boardCellsNr || y > boardCellsNr || x <= 0 || y <= 0)
		return (isSnakeMove = false);

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
	window.requestAnimationFrame(timeLoop);
	if (!isSnakeMove) return;
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
