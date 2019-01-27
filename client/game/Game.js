import { Phaser } from './lib';
import * as Scenes from './scenes';
import * as Plugins from './plugins';

export default class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);
        Object.values(Scenes).forEach( s => this.scene.add("", s))
        Object.keys(Plugins).forEach( pk => this.plugins.install(pk, Plugins[pk], true, Plugins[pk].alias || undefined) )

        this.scene.start(Scenes.keys.BOOT);

    }
}