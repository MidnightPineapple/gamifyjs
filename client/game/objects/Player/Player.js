import { compose } from 'ramda';
import { IsAnimated, OverlapsZones, CanMove } from '../mixins';
import ArcadeSprite from '../ArcadeSprite';
import anims from './anims';
import constants from './constants'

export default class Player extends compose(CanMove, OverlapsZones, IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);

        Object.assign(this, constants);

        this.addZone("hackable-range", 100, 100)
        .setOrigin();

    }

    isPlayer = true;

    onRun(direction) {
        this.anims.play(constants.ANIMS.RUNNING, true)
    }

    onJump() {
        this.anims.play(constants.ANIMS.JUMPING)
    }

    onIdle() {
        this.anims.play(constants.ANIMS.IDLE, true)
    }

    die() {
        this.anims.play(constants.ANIMS.DYING);
        
    }

    hit() {
        this.anims.play(constants.ANIMS.HITTING, true);
    }

}

// IDEA: I could make a factory function to create an object that provides
// an API for players that can only control what I let them change

// IDEA: There are a set number of actions that any object can perform.
// Those actions are functions as defined in a class above
// Those functions handle the animations and some logic that shouldn't change
// If there's a player-customizable behavior, it will call the function associated with it.
