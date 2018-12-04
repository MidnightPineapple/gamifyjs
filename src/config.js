import Phaser from 'phaser';

export const gameConfig = {
    type:Phaser.AUTO,
    width:800,
    height: 600,
    title: "Gamify JS",
    // url: "http://url.to.my.game",
    version: "0.0.1",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: true
        }
    },
}