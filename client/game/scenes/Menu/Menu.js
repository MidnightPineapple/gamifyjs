import Scene from "../Scene";
import keys from '../keys';
import { HandlesErrors } from '../mixins';

export default class MenuScene extends HandlesErrors(Scene) {

    constructor(params) {
        super({ ...params, key: keys.MENU })
    }

    create() {
        this.cameras.main.setBackgroundColor("#00004d");

        const start = this.add.bitmapText(100, 200, "BitPotion", "Start", 100)
        .setInteractive()
        .on("pointerup", this.startGame.bind(this))

        const load = this.add.bitmapText(100, 300, "BitPotion", "Levels", 100)
        .setInteractive()
        .on("pointerup", this.openLevelMenu.bind(this));


    }

    startGame() {
        this.scene.start(keys.DEMO)
    }

    openLevelMenu() {
        this.scene.start(keys.WELCOME)
    }

}