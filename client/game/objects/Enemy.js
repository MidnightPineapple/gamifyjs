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

        isEnemy = true;

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
            this.destroy(false);
            // add some despawn effects 
        }

        moveToward(foreignObj) {
            if(this.x < foreignObj.x) this.run('right');
            if(this.x > foreignObj.x) this.run('left');
            if(this.y - foreignObj.y > 50) this.jump();
        }

    }

}