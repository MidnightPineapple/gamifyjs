import Phaser from 'phaser';
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

    let tieBreaker = () => Math.pow(-1, Phaser.Math.RND.integerInRange(0,1)) > 0 ? "left" : "right";
    let tieBreakDirection;
    let tieBreakY;
    let tieBreaking = false;

    return class Enemy extends compose(...traits)(ArcadeSprite) {

        constructor(...args) {
            super(...args);
        }

        isEnemy = true;

        onRun() {
            if(!this.isAlive) return false;
        }

        onJump() {
            if(!this.isAlive) return false;
        }

        onIdle() {
            if(!this.isAlive) return false;
        }

        onDie() {
            this.destroy(false);
            // add some despawn effects 
        }

        moveToward(foreignObj) {
            if( Math.abs(this.x - foreignObj.x) < 16 && Math.abs(this.y - foreignObj.y) < 16) {
                this.idle();
                return;
            } 
            if(!tieBreaking) {
                if( Math.abs(this.x - foreignObj.x) < 32 && foreignObj.y - this.y > 32) {
                    tieBreaking = true;
                    tieBreakDirection = tieBreaker();
                    tieBreakY = this.y;
                } else {
                    if(this.x < foreignObj.x) this.run('right');
                    if(this.x > foreignObj.x) this.run('left');
                }
            } else {
                this.run(tieBreakDirection);
            }
            if(tieBreakY !== this.y || this.body.touching.left || this.body.touching.right || this.body.onWall() ) {
                tieBreaking = false;
            }
            if(this.y - foreignObj.y > 50) this.jump();
        }

        patrol() {
            const touchWall = this.body.touching.left || this.body.touching.right || this.body.onWall();
            if(!tieBreakDirection || touchWall) {
                tieBreakDirection = tieBreaker();
            } 
            if(Phaser.Math.RND.integerInRange(0,99) < 10) {
                this.jump();
            }
            this.run(tieBreakDirection);
        }

    }

}