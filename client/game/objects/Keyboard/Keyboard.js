import Phaser from 'phaser';
import { IsAnimated } from '../mixins';
import { compose } from 'ramda';
import constants from './constants';

const anims = spritesheetKey => anims => [
    {
        key:constants.ANIMS.KEYDOWN,
        frames: anims.generateFrameNumbers(spritesheetKey, { start:0, end:1 }), 
        frameRate: 1,
        repeat: -1,
    }
]

function KeyboardFactory(key) {

    const traits = [
        IsAnimated(anims(key))
    ]

    return class Keyboard extends compose(...traits)(Phaser.GameObjects.Sprite) {

        constructor( scene, x, y) {
            super(scene,x,y,key,0);
            if(!key) throw new Error("Keyboard gameObject was not assigned a key to display")
            this.anims.play(constants.ANIMS.KEYDOWN);
        }

    }

}

KeyboardFactory.A = KeyboardFactory("a-key")
KeyboardFactory.W = KeyboardFactory("w-key")
KeyboardFactory.D = KeyboardFactory("d-key")
KeyboardFactory.S = KeyboardFactory("s-key")
KeyboardFactory.ESC = KeyboardFactory("esc-key")
KeyboardFactory.SHIFT = KeyboardFactory("shift-key")

export default KeyboardFactory;