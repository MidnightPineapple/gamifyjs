import Phaser from 'phaser';

const config = {
    width:800,
    height: 600,
    title: "Mygame",
    url: "http://url.to.my.game",
    version: "0.0.1",
}

function boot() {
    const game = new Phaser.Game(config)
}

window.onload = boot
