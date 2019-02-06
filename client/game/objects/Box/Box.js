import Sprite from '../ArcadeSprite';
import { IsHackable } from '../mixins';
import { compose } from 'ramda';
import constants from './constants';

export default class Box extends compose(IsHackable)(Sprite) {

    constructor(scene, x, y, { player }) {
        super(scene, x, y, constants.SPRITESHEET_KEY);
        this.body.setDragX(constants.DRAG_X)
        this.body.setDragY(constants.DRAG_Y)
        this.player = player

    }

    blue() { // true
        this.setTint(0x0000ff);
        this.playerCollider().active = true;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        return this;
    }
    
    red() { // string
        this.setTint(0xff0000);
        this.body.setAllowGravity(false);
        this.playerCollider().active = false;
        return this;
        // set tint & set player collider to overlap
        // if I used the collision events scene mixin, its in this.colliders[this.player] ?
    }

    green() { // number?
        this.setTint(0x00ff00);
        this.playerCollider().active = true;
        this.body.setAllowGravity(true);
        this.body.setImmovable(false);
        return this;
    }

    yellow() {
        // falsy?
    }

    black() {
        // undefined?
    }

    changeColor(color) {
        switch(color) {
            case "red": 
                this.red();
                break;
            case "green":
                this.green();
                break;
            case "blue":
                this.blue();
                break;
        }
        return this;
    }

    playerCollider() {
        return this.colliders.get(this.player);
    }

}