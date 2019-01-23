import Enemy from '../Enemy';
import constants from './constants';
import anims from './anims';

export default class Robot2 extends Enemy({ anims }) {

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE);
    }

    MAX_VELOCITY_X = 150;
    ACCELERATION_X = 50;

}