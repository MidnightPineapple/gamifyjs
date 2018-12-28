import Scene from "../Scene";
import keys from '../keys';

const textStyle = { 
    color:"#42f44b", 
    fontSize:30 
}

export default class Menu extends Scene {

    constructor(params) {
        super({ ...params, key: keys.MENU })
    }

    create() {
        this.cameras.main.setBackgroundColor("#00004d");
        // this.add.image(30,40,"download")
        // .setOrigin(0,0)

        const start = this.add.text(100,200,"Start", textStyle)
        .setInteractive()
        .on("pointerup", this.startGame.bind(this))

        const load = this.add.text(100,300,"Load", textStyle)

    }

    startGame() {
        this.scene.start(keys.DEMO)
    }

}