import { compose } from 'ramda';
import Scene from '../Scene';
import keys from '../keys';
import { LoadsAssets } from '../mixins';

export default class Boot extends compose(LoadsAssets)(Scene) {

    constructor(params) {
        super({ ...params, key: keys.BOOT });
    }

    preload() {
        this.importImages(
            require.context("./loader-assets", false, /\.(png|jpe?g)$/)
        )
    }

    create() { 
        this.scene.start(keys.LOAD);
    }

}

