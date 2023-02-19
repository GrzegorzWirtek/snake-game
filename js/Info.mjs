const INFO_SCORES_CLASS = 'info__scores-number';
const INFO_SPEED_CLASS = 'info__speed-number';
const INFO_RECORD_CLASS = 'info__record-number';
const INFO_RECORD_SPEED_CLASS = 'info__record-speed-number';
const GAME_OVER_CLASS = 'board__game-over';
const LOCAL_STORAGE_KEY = 'snake-game';

class Info {
	#infoScores;
	#infoSpeed;
	#infoRecord;
	#infoRecordSpeed;
	constructor() {
		this.#infoScores = document.querySelector(`.${INFO_SCORES_CLASS}`);
		this.#infoSpeed = document.querySelector(`.${INFO_SPEED_CLASS}`);
		this.#infoRecord = document.querySelector(`.${INFO_RECORD_CLASS}`);
		this.#infoRecordSpeed = document.querySelector(
			`.${INFO_RECORD_SPEED_CLASS}`,
		);
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

	viewRecord(record, speed) {
		this.#infoRecord.textContent = record;
		this.#infoRecordSpeed.textContent = speed;
	}

	#setLocalStorage(record, speed) {
		window.localStorage.setItem(
			'snake-game',
			JSON.stringify({
				record,
				speed,
			}),
		);
		this.viewRecord(record, speed);
	}

	checkLocalStorage(speedWithFactor, scores) {
		const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!localStorageData) return this.#setLocalStorage(0, speedWithFactor);
		const { record, speed: localStorageSpeed } = JSON.parse(localStorageData);
		if (scores > record) return this.#setLocalStorage(scores, speedWithFactor);
		this.viewRecord(record, localStorageSpeed);
	}
}

export default Info;
