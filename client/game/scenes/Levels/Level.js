import { compose } from 'ramda';
import { UsesCustomObjects, EmitsEvents, UsesPlayerFunctions, DisplaysModals, UsesCommonKeyboardKeys } from '../mixins'
import Scene from '../Scene';

const LevelFactory = ({ customObjects }) => {

    const traits = [
        DisplaysModals, 
        UsesPlayerFunctions,
        EmitsEvents,
        UsesCustomObjects(customObjects),
        UsesCommonKeyboardKeys,
    ]

    return class Level extends compose(...traits)(Scene) {

        constructor(...args) {
            super(...args);
        }

    }
}

LevelFactory.UsesCustomObjects = UsesCustomObjects;
LevelFactory.EmitsEvents = EmitsEvents;
LevelFactory.UsesPlayerFunctions = UsesPlayerFunctions;


export default LevelFactory;