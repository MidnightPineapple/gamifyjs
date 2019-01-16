import { compose } from 'ramda';
import HandlesErrors from './HandlesErrors';

export default superclass => {

    const functions = {}
    
    return class UsesPlayerFunctions extends compose(HandlesErrors)(superclass) {

        getFunc(key) { 
            if(!functions.hasOwnProperty(key)) {
                const funFromCache = this.cache.json.get(key);
                if(!funFromCache) throw new Error("Function " + key + " not found.");
                funFromCache.errorHandler = this.emitError.bind(this);
                functions[key] = funFromCache;
            } 

            return functions[key];
        }

    }

}