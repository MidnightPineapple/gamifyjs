import Phaser from 'phaser';

const textStyles = {
    fontFamily:"Arial",
    align:'left',
    wordWrap: {
        width:800
    },
}

class ErrorText extends Phaser.GameObjects.Text {

    constructor(scene, x, y, config = {}) {
        super(scene,x,y, config.text || "", { ...textStyles, ...config.styles});
        this.setPadding(10,16)
        this.setOrigin(0,0)

    }

    bottom() {
        return this.y + this.height;
    }

    putBelow(textObj) {
        this.y = textObj.bottom();
    }

}

class ErrorButton extends ErrorText {

    constructor(scene, x, y, config ){
        super(scene, x, y, config );
        this.setOrigin(1,0);
        this.setInteractive();
        this.setFontSize(10);
    }

    left() {
        return this.x - this.width
    }

}

export default {
    eText: ErrorText,
    eButton: ErrorButton,
}