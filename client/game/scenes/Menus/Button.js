import Phaser from 'phaser';

const defaultTextStyles = {
    fontFamily:"Consolas",
    fontSize:"26px",
    align:'center',
    color:"#ed4e7e",
}

const defaultGraphicsStyles = {
    lineWidth:3,
    lineColor:0xea638c,
    lineAlpha:1,
    fillGradientTopLeft:0xea7992,
    fillGradientTopRight:0xf95e8e,
    fillGradientBottomLeft:0xf95e8e,
    fillGradientBottomRight:0xed4e7e,
    fillAlpha:1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textColorHover:"#e3e3e3",
}

export default class Button extends Phaser.GameObjects.Text {

    constructor(scene, x, y, btnConfig = {}) {
        super(scene, x, y, btnConfig.text, { 
            ...defaultTextStyles,
            ...btnConfig.textStyle
        })

        // add stroke & fill boxes
        const { width, height } = this;
        this.paddingHorizontal = btnConfig.paddingHorizontal || defaultGraphicsStyles.paddingHorizontal;
        this.paddingVertical = btnConfig.paddingVertical || defaultGraphicsStyles.paddingVertical;
        this.boxWidth = width + 2 * this.paddingHorizontal;
        this.boxHeight = height + 2 * this.paddingVertical;

        this.stroke = this.scene.add.graphics().lineStyle(
            btnConfig.lineWidth || defaultGraphicsStyles.lineWidth,
            btnConfig.lineColor || defaultGraphicsStyles.lineColor,
            btnConfig.lineAlpha || defaultGraphicsStyles.lineAlpha,
        ).strokeRect(0, 0, this.boxWidth, this.boxHeight);

        this.fill = this.scene.add.graphics().fillGradientStyle(
            btnConfig.fillGradientTopLeft || defaultGraphicsStyles.fillGradientTopLeft,
            btnConfig.fillGradientTopRight || defaultGraphicsStyles.fillGradientTopRight,
            btnConfig.fillGradientBottomLeft || defaultGraphicsStyles.fillGradientBottomLeft,
            btnConfig.fillGradientBottomRight || defaultGraphicsStyles.fillGradientBottomRight,
            btnConfig.fillAlpha || defaultGraphicsStyles.fillAlpha
        ).fillRect(0, 0, this.boxWidth, this.boxHeight)
        .setVisible(false);

        const { x:centerX, y:centerY } = this.getCenter();
        const boxX = centerX - this.boxWidth / 2;
        const boxY = centerY - this.boxHeight / 2;

        this.stroke.setPosition(boxX, boxY);
        this.fill.setPosition(boxX, boxY);

        // set hover & click listeners
        this.setInteractive();
        this.on("pointerup", () => {
            if(typeof btnConfig.onClick !== "function") return;
            btnConfig.onClick();
        })
        this.scene.input.on('gameobjectover', (pointer,gameObject) => {
            if(gameObject !== this) return;
            this.stroke.setVisible(true);
            this.fill.setVisible(true);
            this.setColor(btnConfig.textColorHover || defaultGraphicsStyles.textColorHover);
            if(typeof btnConfig.onHoverIn !== "function") return;
            btnConfig.onHoverIn();
        });
        this.scene.input.on('gameobjectout', (pointer,gameObject) => {
            if(gameObject !== this) return;
            this.fill.setVisible(false);
            this.setColor(btnConfig.color || defaultTextStyles.color);
            if(typeof btnConfig.onHoverOut !== "function") return;
            btnConfig.onHoverOut();
        });

    }

    // set x(x) {
    //     this.x = x + this.paddingHorizontal
    // }

    // set y(y) {

    // }



}