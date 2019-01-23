import { compose } from 'ramda';
import { IsAnimated, CanMove } from '../mixins';
import ArcadeSprite from '../ArcadeSprite';
import anims from './anims';
import constants from './constants';

export default class Robot extends compose(CanMove, IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y){
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        this.idle();
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE)
    }

    onRun(direction) {
        const left = direction === "left" 
        this.setFlip(left)
        this.anims.play(constants.ANIMS.MOVING, true)
    }

}