import Phaser from 'phaser';

const defaultTextStyles = {
    fontFamily:"Consolas",
    fontSize:"16px",
    align:'left',
    color:"#e3e3e3",
}

const defaultGraphicsStyles = {
    paddingHorizontal: 10,
    paddingVertical: 10,
}

export default class Row extends Phaser.GameObjects.Text {

    constructor(scene, x, y, rowConfig = {}) {
        super(scene, x, y, rowConfig.text, { 
            ...defaultTextStyles,
            ...rowConfig.textStyle
        })
        this.paddingHorizontal = rowConfig.paddingHorizontal || defaultTextStyles.paddingHorizontal
        this.paddingVertical = rowConfig.paddingVertical || defaultTextStyles.paddingVertical
        this.setOrigin(0,0)
        this.setPosition(x,y);
    }

    setPosition(x, y) {
        super.setPosition(
            x + ( this.paddingHorizontal || 0 ), 
            y + ( this.paddingVertical || 0),
        )
    }

    positionBelowRow(row) {
        this.setPosition(this.x, row.y+row.height);
    }

}