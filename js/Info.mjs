const INFO_SCORES = 'info__scores-number';
const INFO_SPEED = 'info__speed-number';

class Info {
	#infoScores;
	#infoSpeed;
	constructor() {
		this.#infoScores = document.querySelector(`.${INFO_SCORES}`);
		this.#infoSpeed = document.querySelector(`.${INFO_SPEED}`);
	}

	updateScores(scores) {
		this.#infoScores.textContent = scores;
	}

	viewSpeedNumber(speed) {
		this.#infoSpeed.textContent = speed;
	}
}

export default Info;
