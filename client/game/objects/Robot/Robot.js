import Enemy from '../Enemy';
import anims from './anims';
import constants from './constants';

export default class Robot extends Enemy({ anims }) {

    constructor(scene, x, y){
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        Object.assign(this, constants);

        this.idle()
    }

    onIdle() {

    }

    onRun(direction) {
    
    }

}