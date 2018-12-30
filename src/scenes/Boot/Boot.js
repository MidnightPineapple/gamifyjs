import { compose } from 'ramda';
import Scene from '../Scene';
import keys from '../keys';
import { ImportsAssets } from '../mixins';

export default class Boot extends compose(ImportsAssets)(Scene) {

    imports = {
        images: require.context("./assets/images", false, /\.(png|jpe?g)$/),
        fonts: require.context("./assets/fonts", false, /\.(png|xml|fnt)$/)            
    }

    constructor(params) {
        super({ ...params, key: keys.BOOT });
    }

    create() { 
        this.scene.start(keys.LOAD);
    }

}

