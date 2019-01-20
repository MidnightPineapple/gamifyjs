import CONSTANTS from './constants';

export default class EditorMessenger {

    constructor(iFrameConnection, funId) {
        this.frame=iFrameConnection;
        this.functionId=funId;
    
        this.frame.attachListener(CONSTANTS.EDIT_SUCCESS, ({ functionId, text }) => {
            if( functionId !== this.functionId ) return;
            if( typeof this.onValueChanged !== "function" ) return;
            this.onValueChanged(text);
        })

        this.frame.attachListener(CONSTANTS.EDIT_ERROR, ({ functionId, text, errorMessage }) => {
            if( functionId !== this.functionId ) return;
            if( typeof this.onValueChanged !== "function" ) return;
            this.onValueChanged(text);
            if( typeof this.onError !== "function" ) return;
            this.onError(text);
        })
    }

    insert(row, col, text) {
        this.frame.send(CONSTANTS.EDITOR_INSERT, {
            functionId: this.functionId,
            text,
            start:{ row, col }
        })
    }

    remove(startRow, startCol, endRow, endCol) {
        this.frame.send(CONSTANTS.EDITOR_REMOVE, {
            functionId: this.functionId,
            start: { row: startRow, startCol },
            end: { row: endRow, col: endCol }
        })
    }

    setOnValueChangedCallback(fun) {
        this.onValueChanged = fun;
    }

    setOnErrorCallback(fun) {
        this.onError = fun;
    }

}

EditorMessenger.CONSTANTS = CONSTANTS;