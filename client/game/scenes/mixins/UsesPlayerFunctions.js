import Phaser from 'phaser';
import { compose } from 'ramda';
import HandlesErrors from './HandlesErrors';
import { PlayerFunctionMessenger } from '../../lib';

export default superclass => {

    const functions = {}
    
    return class UsesPlayerFunctions extends compose(HandlesErrors)(superclass) {

        makeFunc(key) { 
            const PlayerFunction = this.cache.json.get(key);
            if(!PlayerFunction) throw new Error("Function " + key + " not found.");
            const functionId = Phaser.Math.RND.uuid();
            const fun = new PlayerFunction(this.emitError.bind(this), new PlayerFunctionMessenger(functionId, this.frame));
            functions[functionId] = fun;
            return fun; 
        }

    }

}