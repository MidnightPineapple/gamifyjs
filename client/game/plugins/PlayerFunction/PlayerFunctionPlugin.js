import Phaser from 'phaser';
import PlayerFunctionFile from './PlayerFunctionFile';

export default class PlayerFunctionPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType("playerFunction", function(key, url, xhrSettings) {
            this.addFile(new PlayerFunctionFile(this, key, url, xhrSettings));
            return this;
        })
    }

}