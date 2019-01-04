import FactoryFunctions from './PlayerFunctionFactories';
import LineList from './LineList'; 

// TODO: I should inject an error handler that hooks into a phaser scene into this class...

class PlayerFunction {

    constructor(config, errorHandler) {
        this.displayName = config.displayName || "fun"
        this.parameters = config.parameters || []
        this.description = config.description || ""
        this.lines = new LineList(config.lines)
        this.funCache = undefined
    }

    execute(...params) {
        if(typeof this.funCache !== "function") this.makeCache()
        
        try {
            return this.funCache(...params)
        } catch(e) {
            // TODO: catch all other types of errors
            //console.log(Object.getOwnPropertyNames(e), e.message)
            throw e;
        }

    }

    makeCache() {
        try {
            const fun = new Function(...this.parameters, this.lines.toBabel())
            this.funCache = fun
        } catch(e) {
            if(e instanceof SyntaxError === false) { throw e; return; }
            // TODO: handle SyntaxError 
            // Babel gives the error [ 'stack', 'message', 'pos', 'loc', 'code' ]
            // e.loc has the line and column properties that contain the position
            // e.message has the code snippet I need to display, but it'd be nicer to generate it myself.
            // runtime errors are gonna be so much harder to source map RIPP
            // ? I could add some info to the error here and throw it back? Or make a new error based off of it.
            // errorHandler.catch(e) // TODO: make an ErrorHandler plugin? Idk how I'm using this class later...

            throw e;
        }
    }

    stale() {
        this.funCache = undefined;
    }

    modify() {
        // 1.  return an object that holds all methods 
        //     necessary to handle modifications to this.lines
        // 2.  stale cache
    }

    toJson() {
        // remember to remove any functions out of the Line objs
        return ""
    }

    toString() {
        return `function ${this.displayName}(${this.parameters}) {\n${this.lines}\n}`
    }

}

Object.assign(PlayerFunction, FactoryFunctions(PlayerFunction));

export default PlayerFunction;