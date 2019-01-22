import { compose } from 'ramda';
import { UsesCustomObjects, EmitsEvents, UsesPlayerFunctions } from '../mixins'
import Scene from '../Scene';

const LevelFactory = ({ customObjects }) => class Level extends compose(UsesPlayerFunctions,EmitsEvents,UsesCustomObjects(customObjects))(Scene) {

    constructor(...args) {
        super(...args);
    }

}

LevelFactory.UsesCustomObjects = UsesCustomObjects;
LevelFactory.EmitsEvents = EmitsEvents;
LevelFactory.UsesPlayerFunctions = UsesPlayerFunctions;


export default LevelFactory;