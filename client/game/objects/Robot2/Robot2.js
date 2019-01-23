import ArcadeSprite from '../ArcadeSprite';
import { CanMove, IsAnimated } from '../mixins';
import { compose } from 'ramda';
import constants from './constants';
import anims from './anims';

export default class Robot2 extends compose(CanMove, IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE);
    }

    onRun(direction) {
        const left = direction === "left" 
        this.setFlip(left)
    }

    MAX_VELOCITY_X = 150;
    ACCELERATION_X = 50;

}