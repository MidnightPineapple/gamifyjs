import Line from './Line';
import transformSync from './transformSync';

// TODO: make a class responsible for keeping track of modifications to the lines

function parseParams(paramArray) {
    let inputArr = [], parsedArr = [];
    if(paramArray.length===0) return parsedArr;
    if(paramArray.length===1) {
        if(paramArray[0] instanceof Array) inputArr = paramArray[0]
        if(typeof paramArray[0] === "string") {
            parsedArr = paramArray[0].split("\n").map( x => new Line(x) )
            return parsedArr
        }
    }
    if(paramArray.length > 1) {
        inputArr = paramArray
    };
    for( const input of inputArr ) {
        switch(typeof input) {
            case "string":
                parsedArr.push(new Line(input));
                break;
            case "object":
                if(input instanceof Line) {
                    parsedArr.push(input);
                } else {
                    parsedArr.push(new Line(input.text, input.editable))
                }
                break;
        }
    }
    return parsedArr;

}

export default class LineList extends Array {

    constructor(...params) {
        super(...parseParams(params));
    }

    toString() {
        return this.map(x => x.text).join("\n")
    }

    toBabel() {
        return transformSync(this.toString()).code
    }
    
}

