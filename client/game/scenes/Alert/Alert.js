import Scene from '../Scene';
import keys from '../keys';

const textStyles = {
    fontFamily:"Courier New",
    fontSize:"26px",
    align:'left',
    wordWrap: {
        width:785
    },
}

export default class Alert extends Scene {

    constructor(params) {
        super({ key: keys.ALERT, ...params });
    }

    init({ messages, parent, onDismiss }) {
        this.messages = messages instanceof Array ? messages.slice() : [ messages ];
        this.parent = parent;
        this.scene.bringToTop();
        this.onDismiss = onDismiss
    }

    create() {
        this.parent.scene.pause();

        const { width, height } = this.sys.game.canvas;

        this.bg = this.add.graphics();
        this.bg.fillStyle(0x00052d, 0.7);
        this.bg.fillRect(10, 10, width-20, height/8);

        
        this.textbox = this.add.text(15, 15,"", textStyles);
        this.prompt = this.add.text(width-15, height/8+5, "",textStyles).setFontSize(10).setOrigin(1,1);
        
        this.tweens.add({
            targets:this.prompt,
            loop:-1,
            alpha: { value: 0, duration: 2000, ease: "Cubic.easeIn" },
            yoyo: true
        })
        
        this.input.keyboard.on("keydown_SPACE", this.advance.bind(this))
        this.refresh();
    }

    dismiss() {
        this.parent.scene.resume();
        this.scene.stop();
        if(typeof this.onDismiss === "function") this.onDismiss();
    }

    nextMessage() {
        this.messages.shift();
        this.refresh();
    }

    refresh() {
        this.textbox.setText(this.messages[0]);
        this.prompt.setText( this.messages.length > 1 ? "Next (space)" : "Dismiss (space)")
    }

    advance() {
        if(this.messages.length > 1) {
            this.nextMessage();
        } else {
            this.dismiss();
        }
    }

}