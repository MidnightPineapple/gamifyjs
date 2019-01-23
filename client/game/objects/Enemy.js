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

    }

}