import Phaser from 'phaser';
import * as Scenes from './scenes'

export default class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);

        this.scene.add("", Scenes.Boot);
        this.scene.add("", Scenes.Load);



        this.scene.start('boot')
    }
}