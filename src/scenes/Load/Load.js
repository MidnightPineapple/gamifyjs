import { compose } from 'ramda';
import { LoadsAssets } from '../mixins';
import Scene from '../Scene';
import keys from '../keys';

export default class Load extends compose(LoadsAssets)(Scene) {

    constructor(params) {
        super({ ...params, key: keys.LOAD });
    }

    preload() {
        this.importImages(
            require.context("./assets/images", false, /\.(png|jpe?g)$/)
        );

    }

    create() {
        const logo = this.add.image(300,400, 'logo')
        
        logo.setOrigin(.5,.5)
    }

}

