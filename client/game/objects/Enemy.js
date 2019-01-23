import ArcadeSprite from './ArcadeSprite';
import { CanMove, IsAnimated, KillsOnTouch, IsMortal } from './mixins';
import { compose } from 'ramda';

export default ({ anims }) => {

    const traits = [
        CanMove,
        IsAnimated(anims),
        KillsOnTouch,
        IsMortal
    ]

    return class Enemy extends compose(...traits)(ArcadeSprite) {

        constructor(...args) {
            super(...args);
        }

        onRun() {
            if(!this.alive) return false;
        }

        onJump() {
            if(!this.alive) return false;
        }

        onIdle() {
            if(!this.alive) return false;
        }

        onDie() {
            // TODO: add safe way to remove the object from scene
        }

    }

}