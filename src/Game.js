import Phaser from 'phaser';
import * as Scenes from './scenes'

export default class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);
        Object.values(Scenes).forEach( s => this.scene.add("", s))

        this.scene.start(Scenes.keys.BOOT);
    }
}