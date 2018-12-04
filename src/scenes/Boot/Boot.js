import { Scene } from 'phaser';

const logo = require("./insta-logo.jpg")

export default class Boot extends Scene {

    preload() {
        this.load.image('logo', logo);
    }

    create() {
        const logo = this.add.image(300,400, 'logo')
        logo.setOrigin()
    }

}

