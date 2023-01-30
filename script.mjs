const item = document.querySelector('.item');
const itemSize = 40;
let isSnakeMove = false;
let time = performance.now();
const snakeSpeed = 300;
let counterX = 0;
let counterY = 0;
let key = 'ArrowRight';

function snakeMove(key) {
	let x = item.style.transform.slice(10, 13).replace(/p/g, '');
	x = x === '' ? 0 : parseInt(x);
	let y = item.style.transform.slice(-6, -2).replace(/p/g, '');
	y = y === '' ? 0 : parseInt(y);
	console.log(x, y);
	switch (key) {
		case 'ArrowRight':
			return (item.style.transform = `translate(${(counterX +=
				itemSize)}px, ${counterY}px)`);
		case 'ArrowLeft':
			return (item.style.transform = `translate(${(counterX -=
				itemSize)}px, ${counterY}px)`);
		case 'ArrowDown':
			return (item.style.transform = `translate(${counterX}px, ${(counterY +=
				itemSize)}px)`);
		case 'ArrowUp':
			return (item.style.transform = `translate(${counterX}px, ${(counterY -=
				itemSize)}px)`);
	}
}

function timeLoop(currentTime) {
	window.requestAnimationFrame(timeLoop);
	if (!isSnakeMove) return;
	if (currentTime - time < snakeSpeed) return;
	snakeMove(key);
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
	console.log(e.key);
	key = e.key;
}

document.querySelector('#start-btn').addEventListener('click', startMove);
document.querySelector('#stop-btn').addEventListener('click', stopMove);
document.addEventListener('keydown', keyDown);
