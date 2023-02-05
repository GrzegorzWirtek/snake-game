import Snake from './Snake.mjs';
import Food from './Food.mjs';
import Info from './Info.mjs';

const BOARD_CLASS = 'board';
const FOOD_CLASS = 'food';
const PLAY_AGAIN_BTN_CLASS = 'play-again-btn';
const VISIBLE_CLASS = 'visible';
const SNAKE_CELL_CLASS = 'item';
const BOARD_NR_OF_CELLS = 15;
const INTITIAL_SNAKE_POSITION = [
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

const INITIAL_FOOD_POSITION = { x: 8, y: 8 };
const TIME = performance.now();
const KEY_RIGHT = 'ArrowRight';
const KEY_LEFT = 'ArrowLeft';
const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_ENTER = 'Enter';

class Game {
	#isSnakeMove;
	#time;
	#currentKey;
	#playAgainBtn;
	#boundPlayAgain;
	#info;
	#scores;

	constructor() {
		this.boardCellsNr = BOARD_NR_OF_CELLS;
		this.board = document.querySelector(`.${BOARD_CLASS}`);
		this.#playAgainBtn = document.querySelector(`.${PLAY_AGAIN_BTN_CLASS}`);
		this.#info = new Info();
		this.snakeSpeed = 6;
		this.snakePosition = [...INTITIAL_SNAKE_POSITION];
		this.foodPosition = INITIAL_FOOD_POSITION;
		this.#isSnakeMove = true;
		this.#time = TIME;
		this.#scores = 0;
		this.#currentKey = KEY_RIGHT;
		this.#boundPlayAgain = () => this.playAgain();
	}

	#nextFrame(xNr, yNr) {
		let x = this.snakePosition[this.snakePosition.length - 1].x + xNr;
		let y = this.snakePosition[this.snakePosition.length - 1].y + yNr;

		this.snakePosition.push({ x, y });

		if (
			Snake.isSnakeOffTheBoard(x, y, this.boardCellsNr) ||
			Snake.isSnakeTouchedItself(this.snakePosition)
		)
			return (this.#isSnakeMove = false);

		if (x === this.foodPosition.x && y === this.foodPosition.y) {
			this.foodPosition = Food.randomizeFoodPosition(
				this.snakePosition,
				this.boardCellsNr,
			);
			this.#scores++;
			this.#info.updateScores(this.#scores);
		} else {
			this.snakePosition.shift();
		}

		Snake.displaySnake(this.board, this.snakePosition, SNAKE_CELL_CLASS);
		Food.displayFood(this.board, this.foodPosition, FOOD_CLASS);
	}

	#chooseDirection(key) {
		switch (key) {
			case KEY_RIGHT:
				this.#nextFrame(1, 0);
				break;
			case KEY_LEFT:
				this.#nextFrame(-1, 0);
				break;
			case KEY_DOWN:
				this.#nextFrame(0, 1);
				break;
			case KEY_UP:
				this.#nextFrame(0, -1);
				break;
		}
	}

	#timeLoop(currentTime) {
		if (!this.#isSnakeMove) return this.#gameOver();
		window.requestAnimationFrame(this.#timeLoop.bind(this));
		if (currentTime - this.#time < 1000 / this.snakeSpeed) return;
		this.#chooseDirection(this.#currentKey);
		this.#time = currentTime;
	}

	#changeCurrentKey(key) {
		if (key === KEY_ENTER) return this.#startMove();
		else if (
			key !== KEY_DOWN &&
			key !== KEY_LEFT &&
			key !== KEY_RIGHT &&
			key !== KEY_UP
		)
			return;

		this.#currentKey = key;
	}

	#startMove() {
		this.#isSnakeMove = true;
		window.requestAnimationFrame(this.#timeLoop.bind(this));
		this.#info.hideInfo();
	}

	playAgain() {
		this.#playAgainBtn.removeEventListener('click', this.#boundPlayAgain);
		this.#playAgainBtn.classList.remove(VISIBLE_CLASS);

		this.snakePosition = [...INTITIAL_SNAKE_POSITION];
		this.foodPosition = INITIAL_FOOD_POSITION;
		this.#isSnakeMove = true;
		Snake.displaySnake(this.board, this.snakePosition, SNAKE_CELL_CLASS);
		Food.displayFood(this.board, this.foodPosition, FOOD_CLASS);
		this.#currentKey = KEY_RIGHT;
		this.#info.showInfo();
		this.#scores = 0;
		this.#info.updateScores(this.#scores);
	}

	#gameOver() {
		this.#playAgainBtn.classList.add(VISIBLE_CLASS);
		this.#playAgainBtn.addEventListener('click', this.#boundPlayAgain);
	}

	initGame() {
		Snake.displaySnake(this.board, this.snakePosition, SNAKE_CELL_CLASS);
		Food.displayFood(this.board, this.foodPosition, FOOD_CLASS);
		this.#info.showInfo();
		this.#info.updateScores(this.#scores);
		document.addEventListener('keydown', (e) => this.#changeCurrentKey(e.key));
	}
}

export default Game;
