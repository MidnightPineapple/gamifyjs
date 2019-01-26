import Menu from '../Menu';
import keys from '../../keys';

const inputLines = ["RegExr","was","created","by","gskinner","com","and","is","proudly","hosted","by","Media","Temple","Edit","the","Expression","Text","to","see","matches","Roll","over","matches","or","the","expression","for","details","PCRE","Javascript","flavors","of","RegEx","are","supported","The","side","bar","includes","a","Cheatsheet","full","Reference","and","Help","You","can","also","Save","Share","with","the","Community","and","view","patterns","you","create","or","favorite","in","My","Patterns","Explore","results","with","the","Tools","below","Replace","List","output","custom","results","Details","lists","capture","groups","Explain","describes","your","expression","in","plain","English"]

export default class MainMenu extends Menu() {

    constructor(params) {
        super({ ...params, key: keys.MENU })
    }

    create() {
        this.cameras.main.setBackgroundColor("#1d212d");

        const start = this.add.bitmapText(100, 200, "BitPotion", "Start", 100)
        .setInteractive()
        .on("pointerup", this.startGame.bind(this))

        const load = this.add.bitmapText(100, 300, "BitPotion", "Levels", 100)
        .setInteractive()
        .on("pointerup", this.openLevelMenu.bind(this));

        this.scene.launch(keys.TEXT_CONSOLE, { inputLines, outputLines: inputLines })

        this.add.button(100,100, {text: "<Hello World>", onClick: () => console.log("CLICKED BUTTON")})
    }

    startGame() {
        this.scene.start(keys.DEMO)
    }

    openLevelMenu() {
        this.scene.start(keys.WELCOME)
    }

}
