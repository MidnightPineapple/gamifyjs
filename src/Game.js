import Phaser from 'phaser';
console.log(require("./img.png"))
console.log(require("./flower.png"))


export default class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);
    }
}