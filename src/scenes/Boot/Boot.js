import Scene from '../Scene';
import keys from '../keys';

const logo = require("./insta-logo.jpg")

export default class Boot extends Scene {

    constructor(params) {
        super({ ...params, key: keys.BOOT });
    }

    preload() {
        this.load.image('logo', logo);
    }

    create() {
        
    }

}

