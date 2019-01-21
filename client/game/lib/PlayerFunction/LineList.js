import Line from './Line';

/**
 * Creates a LineList 
 * @param { Object[] } initialLines 
 * @param { string } intialLines[].text 
 * @param { Object } initialLines[].config 
 */

export default function LineListFactory(initialLines) {

    let lines = [], onChangeCallback = () => {};

    function checkLineInputIntegrity(lines) {
        const problem = msg => ({ ok: false, msg })
        if(lines.find(l => typeof l !== "object")) { 
            return problem("LineList must be instantiated with array of lineConfig");
        }
        if(lines.find(l => typeof l.text === "undefined")){
            return problem("All lines in LineList must have text property");
        }
        return { ok: true }
    }

    function constructor(initialLines) {
        if(typeof initialLines === "undefined") return;
        if(!(initialLines instanceof Array)) throw new TypeError("LineList must be instantiated with array of lineConfig");
        const integrity = checkLineInputIntegrity(initialLines);
        if(integrity.ok === false) throw new Error(integrity.error);
        lines = initialLines.map( cfg => Line(cfg.text, cfg.config) );
    }

    function allowedToAddLine(pos) { 
        // BUG: if I have a line with just a few chars on it not editable, then the entire line counts as uneditable...
        if(lines.length === 0) return true;
        if(pos === lines.length && lines[pos-1].editable) return true;
        if(lines[pos].editable) return true;
        if(lines[pos-1].editable) return true;
        return false;
    }

    function addLine(pos, text = "", config = {}) {
        if(pos < 0 || pos > lines.length) throw new RangeError("Can't add at index "+pos+". Out of bounds.");
        if(!allowedToAddLine(pos)) throw new Error("Can't add line at pos "+pos+". Restricted Range");
        if(typeof pos !== "number") throw new TypeError("Line index must be a number.")
        if(typeof text !== "string") throw new TypeError("Text of Line must be string");
        const newLine = Line(text, config);
        lines.splice(pos, 0, newLine);
    }

    function addLineBelow(pos, ...args) {
        if(pos < 0 || pos === lines.length) throw new RangeError("Can't add line below index "+pos+". Out of bounds.")
        addLine(pos+1, ...args);
    }

    function deleteLine(pos) {
        if(pos < 0 || pos > lines.length - 1) throw new RangeError("No line at index "+pos+". Out of bounds.");
        if(lines[pos].editable === false) throw new Error("No permission to edit row.");
        const upper = lines[pos-1];
        const lower = lines[pos+1];
        // don't let ppl delete lines surrounded by restricted lines
        if((!upper && !lower) || 
        (!upper && lower.editable===false) ||
        (!lower && upper.editable===false) || 
        (upper.editable===false && lower.editable===false)) throw new Error("Can't delete last editable line.")
        lines.splice(pos, 1);
    }

    function addText(row, col, str) {
        if(typeof str !== "string") throw new TypeError("Text to add must be a string");
        const newLines = str.split("\n");
        if(row < 0 || row > lines.length) throw new RangeError("Can't add at index "+row+". Out of bounds.");
        if(newLines.length === 1) {
            if(row === lines.length) return addLine(row, str);
            else if(!lines[row].isEditable(col)) throw new Error("Not allowed to add at line "+(row+1)+", column "+(col+1)+".");
            lines[row].add(col, str);
        } else if(newLines.length > 1) {
            const addingBelowLastLine = row === lines.length
            if(!addingBelowLastLine) {
                if(!lines[row].editable) throw new Error("Can't add multiline text at line "+(row+1)+". Restricted range");
                const thisLine = lines[row];
                const textPushedDown = thisLine.text.slice(col);
                thisLine.remove(col, textPushedDown.length);
                thisLine.add(col, newLines.shift());
                // add last line
                addLine(row+1, newLines.pop() + textPushedDown);
            }
            // add middle lines in reverse order
            for( const line of newLines.reverse() ) {
                if(line.length !== 0 ) addLine(addingBelowLastLine?row:row+1, line)
            }
        }

    }

    function deleteText(startRow, startCol, endRow, endCol) {
        if([startRow, startCol, endRow, endCol].includes(undefined)) throw new TypeError("Can't delete. Starting and ending row and col can't be undefined.")
        if(startRow > endRow) throw new Error("Delete must start on a higher row than it ends on.")
        if(startRow === endRow) {
            try {
                // char at endCol doesn't get removed. remove range is from startCol to endCol-1
                lines[startRow].remove(startCol, endCol - startCol);
            } catch (e) {
                e.message = "Line "+(startRow+1)+": "+e.message;
                throw e;
            }
        }
        if(startRow < endRow) {
            if(!lines[startRow].editable) throw new Error("Line "+(startRow+1)+" is not editable.");
            if(!lines[endRow].editable) throw new Error("Line "+(endRow+1)+" is not editable.");
            let range = endRow - startRow + 1
            let startLine = lines[startRow];
            let endLine = lines[endRow];
            startLine.remove(startCol, startLine.text.length - startCol);
            // char at endCol is not removed. only delete up to endCol-1
            endLine.remove(0, endCol); 
            range -= 2;
            // del intermediate rows
            for(let i = 0; i<range; i++){
                try {
                    deleteLine(startRow+1);  
                } catch(e) {
                    e.message = "Line "+(startRow+1)+": "+e.message
                    throw e;
                }
            }
            // append text to startRow and del endRow
            startLine.add(startLine.text.length, endLine.text);
            deleteLine(startRow+1);
        }
    }

    function bindCb(action, fun) {
        return function(...args) {
            onChangeCallback(action);
            return fun(...args);
        }
    }

    constructor(initialLines);
    return {
        addText: bindCb("addText", addText),
        removeText: bindCb("removeText", deleteText),
        newLine: bindCb("newLine", addLine),
        newLineBelow: bindCb("newLineBelow", addLineBelow),
        removeLine: bindCb("removeLine", deleteLine),
        toString() { return lines.map( l => l.text ).join("\n") },
        isLineList:true,
        get text() { return this.toString() },
        get config() { return lines.map( l => l.data ) },
        get restrictedRanges() { return lines.map( l => l.restrictedRanges || l.restricted ) },
        set onChange(cb) {
            onChangeCallback = cb;
        },
    }

}

// TODO: for the methods that have a loop that adds or deletes stuff,
// TODO: it'd be nice to have an undo function if an error is thrown just to clean up