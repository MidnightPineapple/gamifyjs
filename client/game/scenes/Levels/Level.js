import { compose } from 'ramda';
import { UsesCustomObjects, EmitsEvents, UsesPlayerFunctions, DisplaysModals } from '../mixins'
import Scene from '../Scene';

const LevelFactory = ({ customObjects }) => {

    const traits = [
        DisplaysModals, 
        UsesPlayerFunctions,
        EmitsEvents,
        UsesCustomObjects(customObjects)
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