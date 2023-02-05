const INFO_CLASS = 'info';
const VISIBLE_CLASS = 'visible';
const SCORES_CLASS = 'scores__number';

class Info {
	#info;
	#scores;
	constructor() {
		this.#info = document.querySelector(`.${INFO_CLASS}`);
		this.#scores = document.querySelector(`.${SCORES_CLASS}`);
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
}

export default Info;
