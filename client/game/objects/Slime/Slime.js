import Enemy from '../Enemy';
import constants from './constants';
import anims from './anims';

export default class Slime extends Enemy({ anims }){

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        this.idle();
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE);
    }

    onRun(direction) {
        this.anims.play(constants.ANIMS.RUNNING, true);
    }

    MAX_VELOCITY_X = 5;
    ACCELERATION_X = 5;

}