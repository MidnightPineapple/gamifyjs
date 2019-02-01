import { compose } from 'ramda';
import { IsAnimated, OverlapsZones, CanMove, IsMortal } from '../mixins';
import ArcadeSprite from '../ArcadeSprite';
import anims from './anims';
import constants from './constants';

const traits = [
    IsMortal, 
    CanMove, 
    OverlapsZones, 
    IsAnimated(anims)
]

export default class Player extends compose(...traits)(ArcadeSprite) {

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);

        Object.assign(this, constants);

        this.addZone(constants.ZONES.HACK, 100, 32)
        .setOrigin();

        this.addZone(constants.ZONES.INTERACT, 50, 50)
        .setOrigin();

    }

    isPlayer = true;

    onRun(direction) {
        if(!this.isAlive) return false;
    }

    onJump() {
        if(!this.isAlive) return false;
    }

    onIdle() {
        if(!this.isAlive) return false;
    }

    onDie() {
        
    }

    hit() {
        if(!this.isAlive) return false;
        this.anims.play(constants.ANIMS.HITTING, true);
    }

}

// IDEA: I could make a factory function to create an object that provides
// an API for players that can only control what I let them change

// IDEA: There are a set number of actions that any object can perform.
// Those actions are functions as defined in a class above
// Those functions handle the animations and some logic that shouldn't change
// If there's a player-customizable behavior, it will call the function associated with it.
