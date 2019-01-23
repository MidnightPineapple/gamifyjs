import ArcadeSprite from '../ArcadeSprite';
import { CanMove, IsAnimated } from '../mixins';
import { compose } from 'ramda';
import constants from './constants';
import anims from './anims';

export default class Slime extends compose(CanMove, IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        this.idle();
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE);
    }

    onRun(direction) {
        const left = direction === "left";
        this.setFlip(left);
        this.anims.play(constants.ANIMS.RUNNING, true);
    }

    MAX_VELOCITY_X = 10;
    ACCELERATION_X = 5;

}