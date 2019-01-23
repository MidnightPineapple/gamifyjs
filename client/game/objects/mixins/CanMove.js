const CanMoveFactory = superclass => class CanMove extends superclass {

    constructor(...args) {
        super(...args);
        Object.assign(this.constants, { CanMoveItself: CONSTANTS });

        this.setBounce( this.BOUNCE_X || CONSTANTS.DEFAULT_BOUNCE_X, this.BOUNCE_Y || CONSTANTS.DEFAULT_BOUNCE_Y )
        this.setMaxVelocity( this.MAX_VELOCITY_X || CONSTANTS.DEFAULT_MAX_VELOCITY_X,  this.MAX_VELOCITY_Y || CONSTANTS.DEFAULT_MAX_VELOCITY_Y )
        this.setDrag( this.DRAG_X || CONSTANTS.DEFAULT_DRAG_X , 0);
        
    }

    run(direction) {
        if(direction!=="left" && direction!=="right") return
        const left = direction === "left"
        const accel = this.ACCELERATION_X || CONSTANTS.DEFAULT_ACCELERATION_X; 
        this.setAccelerationX(!!left?-accel:accel);
        this.setFlip(left)
        if(typeof this.onRun === "function") this.onRun(direction);
    }

    jump() {
        const velocity = this.VELOCITY_Y || CONSTANTS.DEFAULT_VELOCITY_Y;
        if(this.onGround()) {
            this.setVelocityY(velocity);
            if(typeof this.onJump === "function") this.onJump();
        } else {
            const dampener = - velocity * ( this.JUMP_DAMPENER || CONSTANTS.DEFAULT_JUMP_DAMPENER )
            const vY = this.body.velocity.y
            this.setVelocityY( vY - dampener );
            if(typeof this.onHoldJump === "function") this.onHoldJump();
        }
    }

    idle() {
        this.setAccelerationX(0);
        if(typeof this.onIdle === "function") this.onIdle();
    }

    onGround() {
        return this.body.blocked.down
    }

}

const CONSTANTS = {
    DEFAULT_ACCELERATION_X:50,
    DEFAULT_VELOCITY_Y:-100,
    DEFAULT_JUMP_DAMPENER: 0.01,
    DEFAULT_MAX_VELOCITY_X: 100,
    DEFAULT_MAX_VELOCITY_Y: 100,
    DEFAULT_BOUNCE_X: .1,
    DEFAULT_BOUNCE_Y: .1,
    DEFAULT_DRAG_X: 500,
} 

Object.assign(CanMoveFactory, { CONSTANTS });

export default CanMoveFactory;