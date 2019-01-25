import { compose } from 'ramda';
import { OverlapsZones } from '../mixins';
import Sprite from '../ArcadeSprite';
import constants from './constants';

class Torch extends compose(OverlapsZones)(Sprite) {
    
    constructor(scene,x,y, { height = constants.DEFAULT_HEIGHT, width = constants.DEFAULT_WIDTH, player }) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);
        Object.assign(this, constants);

        this.body.setEnable(false);
        this.saveCheckpoint = this.addZone(constants.ZONES.SAVE_CHECKPOINT, width, height);
        
        this.overlapZone(constants.ZONES.SAVE_CHECKPOINT, player, () => {
            this.setFrame(7);
            if(typeof this.checkpointCallback === "function") {
                this.checkpointCallback();
            }
        })


    }

    setCheckpointCallback(fn) {
        this.checkpointCallback = fn
    }

}

export default Torch;