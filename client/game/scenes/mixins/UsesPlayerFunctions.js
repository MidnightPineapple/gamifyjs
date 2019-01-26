import Phaser from 'phaser';
import { compose } from 'ramda';
import HandlesErrors from './HandlesErrors';
import { PlayerFunctionMessenger, PlayerFunction } from '../../lib';

export default superclass => {

    const functions = {}
    
    return class UsesPlayerFunctions extends compose(HandlesErrors)(superclass) {

        makeFunc(templateKey, functionId) { 
            const PlayerFunction = this.cache.json.get(templateKey);
            if(!PlayerFunction) throw new Error("Function " + templateKey + " not found.");
            const fun = new PlayerFunction(this.emitError.bind(this), new PlayerFunctionMessenger(functionId, this.frame));
            functions[functionId] = fun;
            return fun; 
        }

        loadFunc(functionId, json) {
            const fun = PlayerFunction.fromJson(json)
            .setMessenger(new PlayerFunctionMessenger(functionId, this.frame))
            .setErrorHandler(this.emitError.bind(this));
            functions[functionId] = fun;
            return fun;
        }

        getFunc(functionId) {
            return functions[functionId];
        }

    }

}