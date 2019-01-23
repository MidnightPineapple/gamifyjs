import Enemy from '../Enemy';
import anims from './anims';
import constants from './constants';

export default class Robot extends Enemy({ anims }) {

    constructor(scene, x, y){
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        this.idle();
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE)
    }

    onRun(direction) {
        this.anims.play(constants.ANIMS.MOVING, true)
    }

}