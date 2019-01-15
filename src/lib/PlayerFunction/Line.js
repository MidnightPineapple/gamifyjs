/**
 * Creates a Line Object for storing info about a line of text
 * @param { string } initialText 
 * @param { Object } config 
 * @param { (boolean|Array[]) } config.restricted
 */

export default function LineFactory(initialText, config) { 
    
    let text = "", restricted = false;
    
    function tupleRangeArrayIntegrityOk(tuples) {
        const problem = msg => ({ ok: false, error:msg })
        const _tuples = tuples.slice();
        if(_tuples.length === 0) return problem("No tuples found");
        if(_tuples.find( x => !(x instanceof Array) )) return problem("Tuples must be instanceof Array.");
        if(_tuples.find( x => x.length !== 2 )) return problem("Tuples must have 2 elements.");
        if(_tuples.find( x => x[0] < 0 )) return problem("Range cannot be negative");
        if(_tuples.find( x => x[0] > x[1] )) return problem("First element of range must be smaller than or equal to second.");
        _tuples.sort( (a,b) => a[0] - b[0] )
        if(_tuples.find( (curr,k,a) => {
            if(k === 0) return false;
            const prev = a[k-1];
            return prev[1] >= curr[0];
        } )) return problem("Ranges shouldn't overlap")
        if(_tuples[_tuples.length-1][1] >= text.length) return problem("Range exceeds text length");
        return { ok: true }
    }

    function updateTupleRange(pos, func) {
        // assuming pos doesn't fall into a restricted range...
        const upperRange = restricted.find( r => r[0] >= pos )
        if(!upperRange) return;
 
        const idx = restricted.indexOf(upperRange);
        for(let i = idx; i<restricted.length; i++) {
            const curr = restricted[i];
            curr[0] = func(curr[0]);
            curr[1] = func(curr[1]);
        }
    }

    function constructor(initialText = "", config = {}) {
        if(typeof initialText !== "string") throw new TypeError("Initial text of Line must be string.");
        text = initialText;

        if(typeof config.restricted !== "undefined") {
            if(typeof config.restricted === "boolean") restricted = config.restricted;
            else if(config.restricted instanceof Array) {
                restricted = config.restricted.slice();
                const integrity = tupleRangeArrayIntegrityOk(restricted)
                if(!integrity.ok) throw new Error(integrity.error);
                restricted.sort( (a,b) => a[0] - b[0] );
            } else throw new TypeError("restricted config must be boolean or Array of tuples.")
        } 
    }

    function isEditable(pos, allowFirstPos = false) { 
        if(typeof restricted === "boolean") return !restricted;
        if(!(restricted instanceof Array)) throw new TypeError("Unexpected type of restricted state");
        if(typeof pos !== "number") return false;
        if(pos > text.length) throw new RangeError("Position "+pos+" out of bounds of text.");
        const range = restricted.find( r => {
            if(!allowFirstPos) return r[0] <= pos && r[1] >= pos;
            return r[0] < pos && r[1] >= pos;
        })
        if(range) return false;
        return true;
    }

    function add(pos, str) {
        if(pos < 0 || pos > text.length) throw new RangeError("Can't edit column "+pos+". Out of bounds.");
        if(typeof str !== "string") throw new TypeError("Value added to Line must be string.")
        if(str.includes("\n")) throw new Error("Can't add a newline within a line!");
        if(!isEditable(pos, true)) throw new Error("No permission to edit column "+pos);
        text = text.substring(0,pos) + str + text.substring(pos);
        if(restricted instanceof Array) updateTupleRange(pos, x => x + str.length);
        return text;
    }

    function removeCharAt(pos) {
        if(pos < 0 || pos >= text.length) throw new RangeError("Can't delete column "+pos+". Out of bounds");
        if(!isEditable(pos)) throw new Error("No permission to edit column "+pos);
        text = text.substring(0,pos) + text.substring(pos + 1);
        if(restricted instanceof Array) updateTupleRange(pos, x => x - 1);
        return text;
    }
    
    // ! I should optimize this so I don't need a loop... How to check if a bigger range overlaps a smaller one basically... actually isn't that hard.
    function remove(pos, length = 1) {
        if(pos < 0) throw new RangeError("Can't delete starting from negative index. Out of bounds.")
        if(text.length - 1 < pos + length - 1) throw new RangeError("Can't delete "+length+" chars from index "+pos+". Out of bounds.");
        if(length < 0) throw new RangeError("Can't delete negative characters")
        for(let i = length; i > 0; i--) {
            const offset = i - 1;
            removeCharAt(pos + offset);
        }
    }

    function clear() {
        if(!isEditable()) throw new Error("No permission to clear line.");
        text = "";
        return text;
    }

    constructor(initialText, config)
    return {
        isEditable(pos) { return isEditable(pos) },
        add,
        remove,
        clear,
        toString() { return text; },
        get length() { return text.length; },
        get text() { return text; },
        get editable() { return isEditable() },
        get restrictedRanges() {
            if(restricted instanceof Array) return restricted.slice();
            else return undefined;
        },
        get data() { return { 
            text, 
            config: { restricted: typeof restricted === "boolean" ? restricted : this.restrictedRanges },
        }},
        isLine: true
    }
}