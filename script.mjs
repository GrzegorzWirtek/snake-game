import Game from './js/Game.mjs';

function init() {
	const game = new Game();
	game.startMove();
}

window.onload = init();
