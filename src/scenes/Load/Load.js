import Scene from '../Scene';
import keys from '../keys';

export default class Load extends Scene {

    constructor(params) {
        super({ ...params, key: keys.LOAD });
    }

    preload() {
        
        // To Preload Here.

    }

    create() {
        const logo = this.add.image(300,400, 'logo')
        logo.setOrigin()
    }

}

