import Game from './Game';
import { gameConfig } from './config';

function boot() {

    // ensure iframe on a recognized origin
    // ping root page
    // get level & objects from cdn
    // load in global helpers
    // start up phaser
    new Game(gameConfig);
    // dynamically add in levels and game objects
    
};

window.onload = boot
