import { compose } from 'ramda';
import { UsesCustomObjects, EmitsEvents, UsesPlayerFunctions, DisplaysAlerts } from '../mixins'
import Scene from '../Scene';

const LevelFactory = ({ customObjects }) => {

    const traits = [
        DisplaysAlerts, 
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