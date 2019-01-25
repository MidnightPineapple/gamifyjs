import CONSTANTS from './constants';

export default class EditorMessenger {

    constructor(iFrameConnection) {
        this.frame=iFrameConnection;
    }

    onReceiveFunction(fn) {
        this.frame.attachListener(CONSTANTS.EDITOR_INIT, fn);
        return this;
    }

    onError(fn) {
        this.frame.attachListener(CONSTANTS.EDIT_ERROR, fn);
        return this;
    }

    onValueChanged(fn) {
        this.frame.attachListener(CONSTANTS.EDIT_SUCCESS, fn);
        return this;
    }

    onRevokeFunction(fn) {
        this.frame.attachListener(CONSTANTS.EDITOR_STOP, fn);
        return this;
    }
    
    forId(funId) {
        const _frame = this.frame;
        let onValueChanged, onError;

        _frame.attachListener(CONSTANTS.EDIT_SUCCESS, ({ functionId, newText }) => {
            if( functionId !== funId ) return;
            if( typeof onValueChanged !== "function" ) return;
            onValueChanged({ functionId,  newText });
        })
    
        _frame.attachListener(CONSTANTS.EDIT_ERROR, ({ functionId, newText, errorMessage }) => {
            if( functionId !== funId ) return;
            if( typeof onError !== "function" ) return;
            onError({ functionId, newText, errorMessage });
        })
        return {
            insert(row, col, text) {
                _frame.send(CONSTANTS.EDITOR_INSERT, {
                    functionId: funId,
                    text,
                    start:{ row, col }
                })
            },
            remove(startRow, startCol, endRow, endCol) {
                _frame.send(CONSTANTS.EDITOR_REMOVE, {
                    functionId: funId,
                    start: { row: startRow, col: startCol },
                    end: { row: endRow, col: endCol }
                })
            },
            setOnValueChangedCallback(fun) {
                onValueChanged = fun;
                return this;
            },
            setOnErrorCallback(fun) {
                onError = fun;
                return this;
            }
        }        
    }


}

EditorMessenger.CONSTANTS = CONSTANTS;