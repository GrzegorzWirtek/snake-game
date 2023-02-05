import Game from './js/Game.mjs';

function init() {
	const game = new Game();
	game.startGame();
}

window.onload = init();
