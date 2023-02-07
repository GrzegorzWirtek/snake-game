import Snake from './Snake.mjs';
import Food from './Food.mjs';
import Info from './Info.mjs';

const BOARD_CLASS = 'board';
const FOOD_CLASS = 'food';
const START_GAME_BTN_ID = 'start-game-btn';
const PAUSE_GAME_BTN_ID = 'pause-game-btn';
const NEW_GAME_BTN_ID = 'new-game-btn';
const SPEED_INPUT_ID = 'speed';
const SPEED_LABEL_CLASS = 'ui__speed';
const SNAKE_CELL_CLASS = 'item';
const DISABLE_CLASS = 'disable';
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
	#startGameBtn;
	#pauseGameBtn;
	#newGameBtn;
	#speedInput;
	#info;
	#scores;
	#pause;
	#speed;
	#speedLabel;

	constructor() {
		this.boardCellsNr = BOARD_NR_OF_CELLS;
		this.board = document.querySelector(`.${BOARD_CLASS}`);
		this.#startGameBtn = document.querySelector(`#${START_GAME_BTN_ID}`);
		this.#pauseGameBtn = document.querySelector(`#${PAUSE_GAME_BTN_ID}`);
		this.#newGameBtn = document.querySelector(`#${NEW_GAME_BTN_ID}`);
		this.#speedInput = document.querySelector(`#${SPEED_INPUT_ID}`);
		this.#speedLabel = document.querySelector(`.${SPEED_LABEL_CLASS}`);
		this.#info = new Info();
		this.snakeSpeed = this.#info.speed;
		this.#time = TIME;
		this.#speed = this.#speedInput.value;

		document.addEventListener('keydown', (e) => this.#changeCurrentKey(e.key));
		this.#startGameBtn.addEventListener('click', this.#startGame.bind(this));
		this.#pauseGameBtn.addEventListener('click', this.#pauseGame.bind(this));
		this.#newGameBtn.addEventListener('click', this.#newGame.bind(this));
		this.#speedInput.addEventListener('input', this.#changeSpeed.bind(this));
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
			default:
				return;
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
		if (key === KEY_ENTER) return this.#startGame();
		else if (
			(key !== KEY_DOWN &&
				key !== KEY_LEFT &&
				key !== KEY_RIGHT &&
				key !== KEY_UP) ||
			(this.#currentKey === KEY_RIGHT && key === KEY_LEFT) ||
			(this.#currentKey === KEY_LEFT && key === KEY_RIGHT) ||
			(this.#currentKey === KEY_UP && key === KEY_DOWN) ||
			(this.#currentKey === KEY_DOWN && key === KEY_UP)
		)
			return;
		this.#currentKey = key;
	}

	#startMove() {
		this.#isSnakeMove = true;
		this.snakeSpeed = this.#speed;
		window.requestAnimationFrame(this.#timeLoop.bind(this));
	}

	#changeSpeed(e) {
		this.#speed = e.target.value;
		this.#info.viewSpeedNumber(this.#speed - 1);
	}

	#startGame() {
		this.#pause = false;
		this.#startMove();
		this.#startGameBtn.disabled = true;
		this.#pauseGameBtn.disabled = false;
		this.#speedInput.disabled = true;
		this.#speedLabel.classList.add(DISABLE_CLASS);
	}

	#pauseGame() {
		this.#pause = true;
		this.#startGameBtn.disabled = false;
		this.#isSnakeMove = false;
	}

	#newGame() {
		this.#newGameBtn.disabled = true;
		this.#startGameBtn.disabled = false;
		this.initGame();
	}

	#gameOver() {
		if (this.#pause) return (this.#pauseGameBtn.disabled = true);
		this.#newGameBtn.disabled = false;
		this.#pauseGameBtn.disabled = true;
		this.#info.showGameOver(this.board);
	}

	initGame() {
		this.snakePosition = [...INTITIAL_SNAKE_POSITION];
		this.foodPosition = INITIAL_FOOD_POSITION;
		this.#isSnakeMove = true;
		this.#currentKey = KEY_RIGHT;
		this.#scores = 0;
		this.#pause = false;
		this.#info.updateScores(this.#scores);
		Snake.displaySnake(this.board, this.snakePosition, SNAKE_CELL_CLASS);
		Food.displayFood(this.board, this.foodPosition, FOOD_CLASS);
		this.#info.viewSpeedNumber(this.#speed - 1);
		this.#speedInput.disabled = false;
		this.#speedLabel.classList.remove(DISABLE_CLASS);
	}
}

export default Game;
