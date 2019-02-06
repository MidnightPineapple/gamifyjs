import { compose, curry } from 'ramda';
import HandlesErrors from './HandlesErrors';
import { PlayerFunctionMessenger, PlayerFunction } from '../../lib';

const UsesPlayerFunctionsFactory = (playerFunctionMetas, superclass) => {

    const functions = {}
    
    return class UsesPlayerFunctions extends compose(HandlesErrors)(superclass) {

        init(data) {
            if(typeof super.init === "function") super.init(data);
            for( const { functionId, template } of playerFunctionMetas ) {
                if(this.getFunc(functionId)) continue;
                this.makeFunc(template, functionId);
            }
            this.events.on("shutdown", () => this.discardFuncs())
        }

        usesPlayerFunctions = true;

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

        getFuncIds() {
            return Object.keys(functions);
        }

        discardFuncs() {
            Object.values(functions).forEach( f => f.destroy() )
            Object.keys(functions).forEach( k => delete functions[k] )
        }

    }
}

export default curry(UsesPlayerFunctionsFactory)