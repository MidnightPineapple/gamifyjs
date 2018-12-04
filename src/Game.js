import Phaser from 'phaser';
import * as Scenes from './scenes'

export default class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);

        this.scene.add("boot", Scenes.Boot);



        this.scene.start('boot')
    }
}