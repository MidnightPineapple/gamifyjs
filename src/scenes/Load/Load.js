import { compose } from 'ramda';
import { ImportsAssets } from '../mixins';
import Scene from '../Scene';
import keys from '../keys';

export default class Load extends compose(ImportsAssets)(Scene) {

    constructor(params) {
        super({ ...params, key: keys.LOAD });
    }

    preload() {
        this.importImages(
            require.context("./assets/images", false, /\.(png|jpe?g)$/)
        );

    }

    create() {

        this.cameras.main.setBackgroundColor("#00004d")

        const logo = this.add.image(300,400, 'logo')
        
        logo.setOrigin(.5,.5)
    }

}

