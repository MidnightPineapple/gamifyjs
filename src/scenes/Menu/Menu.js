import Scene from "../Scene";
import keys from '../keys';

export default class MenuScene extends Scene {

    constructor(params) {
        super({ ...params, key: keys.MENU })
    }

    create() {
        this.cameras.main.setBackgroundColor("#00004d");
        // this.add.image(30,40,"download")
        // .setOrigin(0,0)

        const start = this.add.bitmapText(100, 200, "BitPotion", "Start", 100)
        .setInteractive()
        .on("pointerup", this.startGame.bind(this))

        const load = this.add.bitmapText(100, 300, "BitPotion", "Load", 100)
        .setInteractive()
        .on("pointerup", () => this.scene.start(keys.ERROR))

    }

    startGame() {
        this.scene.start(keys.DEMO)
    }

}