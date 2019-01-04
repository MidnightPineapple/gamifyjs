import { compose } from 'ramda';
import { IsAnimated, OverlapsZones } from '../mixins';
import ArcadeSprite from '../ArcadeSprite';
import anims from './anims';
import constants from './constants'

export default class Player extends compose(OverlapsZones, IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y) {
        super(scene, x, y, constants.SPRITESHEET_KEY, 0);

        this.setBounce(.1, .1);
        this.setMaxVelocity(300,400);
        this.setDrag(500,0);
        this.setCollideWorldBounds(true)

        this.addZone("hackable-range", 100, 100)
        .setOrigin();

    }

    accel = constants.DEFAULT_ACCEL
    isPlayer = true

    run(direction) {
        if(direction!=="left" && direction!=="right") return
        const left = direction === "left"
        this.setFlip(!!left);
        this.setAccelerationX(!!left?-this.accel:this.accel)
        this.anims.play(constants.anims.RUNNING, true)
    }

    jump() {
        this.setVelocityY(-200)
    }

    idle() {
        this.setAccelerationX(0)
        this.anims.play(constants.anims.IDLE, true)
    }

    onGround() {
        return this.body.blocked.down
    }

}

// IDEA: I could make a factory function to create an object that provides
// an API for players that can only control what I let them change

// TODO: make a place to put behavior functions --- Object.assign the mutable way lol

// IDEA: There are a set number of actions that any object can perform.
// Those actions are functions as defined in a class above
// Those functions handle the animations and some logic that shouldn't change
// If there's a player-customizable behavior, it will call the function associated with it.

// ? If we emit an event in this object, is it received by other objects? any global event emitters/listeners?

// ! I can do the hack range & proximity thing with the physics zone detection!
// ! http://labs.phaser.io/edit.html?src=src\physics\arcade\overlap%20zone.js

// useful for colliding logic w/o adding a collider
// http://www.html5gamedevs.com/topic/36632-changing-collision-detection-for-arcade-physics/ 