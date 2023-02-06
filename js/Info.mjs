const INFO_SCORES = 'info__scores-number';
const INFO_SPEED = 'info__speed-number';
const GAME_OVER_CLASS = 'board__game-over';

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

	showGameOver(board) {
		const p = document.createElement('p');
		p.classList.add(GAME_OVER_CLASS);
		p.textContent = 'GAME OVER';
		board.appendChild(p);
	}
}

export default Info;
