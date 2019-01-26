import { compose } from 'ramda';
import Scene from '../Scene';
import { UsesCustomObjects } from '../mixins';
import Button from './Button';

export default function Menu(objs = {}) {
    
    const traits = [
        UsesCustomObjects({ button:Button, ...objs})
    ]
    
    return class Menu extends compose(...traits)(Scene) {

        constructor(...params) {
            super(...params);
        }

    }
}