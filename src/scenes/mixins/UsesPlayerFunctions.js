import { compose } from 'ramda';
import HandlesErrors from './HandlesErrors';

export default superclass => {
    
    const functions = {};

    return class UsesPlayerFunctions extends compose(HandlesErrors)(superclass) {
        // TODO: registerPlayerFunc at init for initialstate 
        // TODO: need a this.executePlayerFunc(key, ...args) func
        // TODO: need a this.getPlayerFuncInterface(key)?
        // TODO: catch and this.emitError for any errors
    }

}