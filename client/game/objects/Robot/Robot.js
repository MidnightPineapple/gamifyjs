import { compose } from 'ramda';
import { IsAnimated } from '../mixins';
import ArcadeSprite from '../ArcadeSprite';
import anims from './anims';
import constants from './constants';

export default class Robot extends compose(IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y){
        super(scene, x, y, constants.SPRITESHEET_KEY, 0)

        this.setDrag(1000,0)
        this.setCollideWorldBounds(true)
    }

    idle() {
        this.setAccelerationX(0)
        this.anims.play(constants.anims.IDLE)
    }

    move(direction) {
        if(direction!=="left" && direction!=="right") return
        const left = direction === "left" 

        this.setAccelerationX(left?-constants.DEFAULT_ACCEL:constants.DEFAULT_ACCEL)
        this.setFlip(left)
        this.anims.play(constants.anims.MOVING, true)
    }

}