import Game from './Game';
import { gameConfig } from './config';

function boot() {
    new Game(gameConfig);
};

window.onload = boot
