import Scene from '../Scene';
import keys from '../keys';

const textStyles = {
    fontFamily:"Courier New",
    fontSize:"72px",
    fontStyle:"bold",
    align:'center',
    wordWrap: {
        width:600
    },
}

export default class Jumbotron extends Scene {

    constructor(params) {
        super({ key: keys.JUMBOTRON, ...params });
    }

    init({ title, subtitle, onDismiss, parent }) {
        this.title = title;
        this.subtitle = subtitle;
        this.parent = parent;
        onDismiss && (this.onDismiss = onDismiss);
    }

    create() {
        this.parent.scene.pause();

        const { width, height } = this.sys.game.canvas;

        this.bg = this.add.graphics();
        this.bg.fillStyle(0x00052d, 0.7);
        this.bg.fillRect(100, 100, width-200, height-200);
        
        this.titleBox = this.add.text(width/2, height/2,this.title, textStyles).setOrigin();
        this.subtitleBox = this.add.text(width/2, height-100, this.subtitle, textStyles).setFontSize(32).setOrigin(0.5,1);
        
        this.tweens.add({
            targets:this.subtitleBox,
            loop:-1,
            alpha: { value: 0, duration: 2000, ease: "Cubic.easeIn" },
            yoyo: true
        })
        
        this.input.keyboard.on("keydown_SPACE", this.dismiss.bind(this));
    }

    dismiss() {
        this.parent.scene.resume();
        this.scene.stop();
        if(typeof this.onDismiss === "function") {
            this.onDismiss();
        }
    }

    setOnDismiss(fn) {
        this.onDismiss = fn;
        return this;
    }

}