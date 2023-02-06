const INFO_CLASS = 'info';
const VISIBLE_CLASS = 'visible';
const SCORES_CLASS = 'scores__number';
const SPEED_INPUT_ID = 'speed';
const SPEED_NUMBER_CLASS = 'speed__nr';

class Info {
	#info;
	#scores;
	#speed;
	#speedNr;
	constructor() {
		this.#info = document.querySelector(`.${INFO_CLASS}`);
		this.#scores = document.querySelector(`.${SCORES_CLASS}`);
		this.speedInput = document.querySelector(`#${SPEED_INPUT_ID}`);
		this.speedInput.addEventListener('input', this.#changeSpeed.bind(this));
		this.#speed = this.speedInput.value;
		this.#speedNr = document.querySelector(`.${SPEED_NUMBER_CLASS}`);
	}
	showInfo() {
		this.#info.classList.add(VISIBLE_CLASS);
	}

	hideInfo() {
		this.#info.classList.remove(VISIBLE_CLASS);
	}

	updateScores(scores) {
		this.#scores.textContent = scores;
	}

	#changeSpeed(e) {
		this.#speed = e.target.value;
		this.#viewSpeedNumber(this.#speed - 1);
	}

	#viewSpeedNumber(speed) {
		this.#speedNr.textContent = speed;
	}

	get getSpeed() {
		return this.#speed;
	}
}

export default Info;
