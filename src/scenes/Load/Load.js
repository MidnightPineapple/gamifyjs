import Scene from '../Scene';
import keys from '../keys';
import { importImages } from './helpers';

export default class Load extends Scene {

    constructor(params) {
        super({ ...params, key: keys.LOAD });
    }

    preload() {
        
        importImages.call(this, require.context("./assets/images", false, /\.(png|jpe?g)$/));
        // JSON Assets 

    }

    create() {
        const logo = this.add.image(300,400, 'logo')
        
        logo.setOrigin(.5,.5)
    }

}

