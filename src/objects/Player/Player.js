import { compose } from 'ramda';
import { IsAnimated } from '../mixins';
import ArcadeSprite from '../ArcadeSprite';
import anims from './anims';

export default class Player extends compose(IsAnimated(anims))(ArcadeSprite) {

    constructor(scene, x, y) {
        super(scene, x, y, "player", 0);

        this.scene.physics.world.enable(this)

        this.setBounce(.1, .1);
        this.setMaxVelocity(300,400);
        this.setDrag(500,0);
        this.setCollideWorldBounds(true)

    }

    accel = 50

    run(direction) {
        if(direction!=="left" && direction!=="right") return
        const left = direction === "left"
        this.setFlip(!!left);
        this.setAccelerationX(!!left?-this.accel:this.accel)
        this.anims.play("player-running", true)
    }

    jump() {
        this.setVelocityY(-200)
    }

    idle() {
        this.setAccelerationX(0)
        this.anims.play("player-idle", true)
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