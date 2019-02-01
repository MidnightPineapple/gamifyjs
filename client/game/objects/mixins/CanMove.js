const CanMoveFactory = superclass => class CanMove extends superclass {

    constructor(...args) {
        super(...args);
        Object.assign(this.constants, { CanMoveItself: CONSTANTS });

        this.setBounce( this.BOUNCE_X || CONSTANTS.DEFAULT_BOUNCE_X, this.BOUNCE_Y || CONSTANTS.DEFAULT_BOUNCE_Y )
        this.setMaxVelocity( this.MAX_VELOCITY_X || CONSTANTS.DEFAULT_MAX_VELOCITY_X,  this.MAX_VELOCITY_Y || CONSTANTS.DEFAULT_MAX_VELOCITY_Y )
        this.setDrag( this.DRAG_X || CONSTANTS.DEFAULT_DRAG_X , 0);
        
    }

    run(direction) {
        if(typeof this.onRun === "function") {
            if(this.onRun(direction) === false) return;
        }
        if(direction!=="left" && direction!=="right") return
        const left = direction === "left"
        const accel = (left ? -1 : 1 ) * ( this.ACCELERATION_X || CONSTANTS.DEFAULT_ACCELERATION_X ); 
        if(this.body.acceleration.x * accel < 0) {
            // cancel out momentum
            this.setVelocityX(0);
        }
        this.setAccelerationX(accel);
        this.setFlip(this.FLIP_X ? !left : left)
        if(this.ANIMS.RUNNING) this.anims.play(this.ANIMS.RUNNING, true)

    }

    jump() {
        const vY = this.body.velocity.y
        
        const velocity = this.VELOCITY_Y || CONSTANTS.DEFAULT_VELOCITY_Y;
        if(this.onGround()) {
            if(typeof this.onJump === "function") {
                if(this.onJump() === false) return;
                if(this.ANIMS.JUMPING) this.anims.play(this.ANIMS.JUMPING, true);
            }
            this.setVelocityY(velocity);
        } else {
            if(typeof this.onHoldJump === "function") {
                if(this.onHoldJump() === false) return;
            }
            const dampener = velocity * -1 * ( this.JUMP_DAMPENER || CONSTANTS.DEFAULT_JUMP_DAMPENER )
            this.setVelocityY( vY - dampener );
        }

    }

    idle() {
        if(typeof this.onIdle === "function") {
            if(this.onIdle() === false) return;
        }
        this.setAccelerationX(0);
        if(this.ANIMS.IDLE) this.anims.play(this.ANIMS.IDLE, true)        
    }

    onGround() {
        return this.body.blocked.down || this.body.touching.down

        // ? I could actually make it so u can't jump if in a hack zone...
        // ? also just make the hack zone elliptical
    }

}

const CONSTANTS = {
    DEFAULT_ACCELERATION_X:50,
    DEFAULT_VELOCITY_Y:-85,
    DEFAULT_JUMP_DAMPENER: 0.01,
    DEFAULT_MAX_VELOCITY_X: 40,
    DEFAULT_MAX_VELOCITY_Y: 100,
    DEFAULT_BOUNCE_X: .1,
    DEFAULT_BOUNCE_Y: .1,
    DEFAULT_DRAG_X: 500,
} 

// these defaults allow jumping just over 2 blocks high and just under 5 blocks across

Object.assign(CanMoveFactory, { CONSTANTS });

export default CanMoveFactory;