import Phaser from 'phaser';
import { PlayerFunction } from '../../lib';

export default class PlayerFunctionFile extends Phaser.Loader.FileTypes.JSONFile {

    constructor(...args) {
        super(...args);
    }

    onProcess() {
        const json = this.xhrLoader.responseText;
        this.data = PlayerFunction.fromJson(undefined, json);
        this.onProcessComplete();
    }

}