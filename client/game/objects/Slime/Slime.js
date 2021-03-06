import Enemy from '../Enemy';
import constants from './constants';
import anims from './anims';

export default class Slime extends Enemy({ anims }){

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        Object.assign(this, constants);
        this.idle();
    }

    onJump() {
        return false;
    }

}