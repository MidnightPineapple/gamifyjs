import Menu from '../Menu';
import keys from '../../keys';

export default class PauseMenu extends Menu() {

    constructor(config) {
        super({ key: keys.PAUSE_MENU, ...config });
    }

    init(data) {
        if(typeof super.init === "function") super.init(data);
        this.parent = data.parent;
        this.parent.scene.pause();
        this.scene.bringToTop();
    }

    create(data) {
        if(typeof super.create === "function") super.create(data);
        const { width, height } = this.sys.game.canvas;

        this.input.keyboard.on("keyup_ESC", this.resume.bind(this));

        this.add.graphics()
        .fillStyle(0x000000, 0.2)
        .fillRect(0,0,width,height)
        .lineStyle(5, 0xea638c)
        .beginPath()
        .moveTo(250,50)
        .lineTo(250,500)
        .closePath()
        .closePath()
        .strokePath()

        this.add.button(350,100,{ text: "<Resume>", onClick: this.resume.bind(this)});
        this.add.button(350,200,{ text: "<Change Level>", onClick: this.resume.bind(this)});
        this.add.button(350,300,{ text: "<Quit To Main Menu>", onClick: this.quitToMain.bind(this)});
    }

    resume() {
        this.parent.scene.resume();
        this.scene.stop();
    }

    quitToMain() {
        this.parent.scene.stop();
        this.scene.start(keys.MAIN_MENU);
    }

}