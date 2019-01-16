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


        // ! REMOVE this click listener it's for debugging the error scene
        const load = this.add.bitmapText(100, 300, "BitPotion", "Load", 100)
        .setInteractive()
        .on("pointerup", () => { 
            this.emitError(mockErrors[0]);
            this.emitError(mockErrors[1]);
        })


    }

    startGame() {
        this.scene.start(keys.DEMO)
    }

}

// ! FOR DEBUG
const mockErrors = [
    new Error("ERROR 1: idk a syntax error?"),
    // mockError,
    new Error("ERROR 2: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
]