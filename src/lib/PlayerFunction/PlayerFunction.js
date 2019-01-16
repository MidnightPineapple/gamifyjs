import LineList from './LineList';
import traceEvalError from './traceEvalError';
import transformSync from './transformSync';

const defaultConfig = {
    displayName: "fun",
    parameters: [],
    description: "A player editable function",
    lines: [ { text: "" } ],
}


function _eval(funStr, transformEs5, errorHandler) {
    let funFromEval, _eval, _stale, _cache, _error, defaultConfig, PlayerFunction; 
    funStr = "funFromEval=" + funStr;
    try {
        const { code: strToEval, map: babelSourceMap } = transformEs5(funStr);
        eval(strToEval)
        return { fun: funFromEval, map: babelSourceMap };
    } catch(err) {
        const fromBabel = err.code && !!err.code.match(/BABEL/)
        if(fromBabel) {
            const msg = err.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'').split("\n")
            const code = msg.slice(2).join("\n").replace(/funFromEval=/, "");
            const message = msg[0];
            const stack = err.name + ": " + message + "\n" + err.stack.split("\n").slice(msg.length).join("\n");
            Object.assign(err, { from:"PLAYER_FUNCTION_EVAL", message, code, stack, fromBabel });
        }
        
        if(typeof errorHandler === "function") {
            errorHandler(err);
        } else {
            throw err;
        }
    }
}

function _stale() {
    this.cache = undefined;
}

function _cache(fun) {
    this.cache = fun;
}

/** Class for storing and running user submitted functions */
export default class PlayerFunction {

    /**
     * @typedef {Object} parameters 
     * @property {string} displayName - name of the paramter
     * @property {string} description - describes what the parameter is for
     */

    /**
     * Creates a player function
     * @param {Object} config - metadata about player function
     * @param {string} config.displayName - name of function for user to see
     * @param {string} config.description - description of what this function does
     * @param {Object[]} config.lines - configuration for lines of the function 
     * @param {parameters[]} config.parameters - parameters of the function
     */
    constructor(errorHandler, config = {}) {
        this.displayName = config.displayName || defaultConfig.displayName
        this.parameters = Object.freeze(Object.assign([], config.parameters || defaultConfig.parameters));
        this.description = config.description || defaultConfig.description

        const lineConfig = ( config.lines instanceof Array && config.lines.length !== 0 && config.lines ) || defaultConfig.lines;
        this.lines = LineList([
            { text:"function "+this.displayName+"("+this.parameterNames+") {", restricted: true },
            ...lineConfig,
            { text:"}", restricted: true }
        ]);
        this.lines.onChange = _stale.bind(this);
        this.cache = undefined

        this.errorHandler = typeof errorHandler === "function" ? errorHandler : undefined; 
    }

    isPlayerFunction = true;

    execute(...paramValues) {
        let fun;
        if(typeof this.cache === "function") {
            fun = this.cache.fun;
        } else {
            let result = _eval(this.lines.toString(), transformSync, this.errorHandler);
            if(!result) return;

            _cache.call(this, result);
            fun = result.fun;
        }

        try {
            return fun.apply(null,paramValues);
        } catch(e) {
            traceEvalError(e, this.cache.map)
            .then( err => {
                Object.assign(err, { from: "PLAYER_FUNCTION_EXECUTION", fromBabel:false })
                if(typeof this.errorHandler === "function") {
                    this.errorHandler(err);
                } else {
                    throw err;
                }
            });
        }

    }

    get parameterNames() {
        return this.parameters.map(x => x.displayName);
    }

    toJson() {
        const lines = this.lines.config
        return JSON.stringify({
            displayName: this.displayName,
            paramters: this.parameters,
            description: this.description,
            lines: lines.slice(1, lines.length - 1),
        })
    }

    toString() {
        return this.lines.toString();
    }

    static fromJson(errorHandler, json) {
        const config = JSON.parse(json);
        return new PlayerFunction(errorHandler, config);
    }

    static withHandler(errorHandler) {
        return PlayerFunction.bind(null, errorHandler);
    }

    static fromJsonWithHandler(errorHandler) {
        return PlayerFunction.fromJson.bind(null, errorHandler);
    }

}

