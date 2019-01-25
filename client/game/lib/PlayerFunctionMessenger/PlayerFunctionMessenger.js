import CONSTANTS from './constants';

const sendEditResponse = function sendEditResponse(functionId, newText, frame, error) {
    const response = { functionId, newText }
    if(typeof error !== "undefined") {
        frame.send(CONSTANTS.EDIT_ERROR, {
            errorMessage: error.message, ...response
        })
    } else {
        frame.send(CONSTANTS.EDIT_SUCCESS, response);
    }
}

export default class PlayerFunctionMessenger {

    isPlayerFunctionMessenger = true;
    
    constructor(functionId, iFrameConnection ) {

        this.frame = iFrameConnection;
        this.functionId = functionId;

        this.frame.events.on(CONSTANTS.EDITOR_INSERT, ({ functionId, text, start: { row, col } }) => {
            if(functionId !== this.functionId) return;
            let error;
            try {
                this.playerFunction.lines.addText(row, col, text)
            } catch(e) { error = e; }
            sendEditResponse(functionId, this.playerFunction.lines.toString(), this.frame, error);
        });

        this.frame.events.on(CONSTANTS.EDITOR_REMOVE, ({ functionId, text, start, end }) => {
            if(functionId !== this.functionId) return;
            let error;
            try {
                this.playerFunction.lines.removeText(start.row, start.col, end.row, end.col);
            } catch(e) { error = e; }
            sendEditResponse(functionId, this.playerFunction.lines.toString(), this.frame, error);
        });
    }

    setPlayerFunction(pF) {
        if(!pF) throw new TypeError("pF must be a PlayerFunction Object");
        if(pF.isPlayerFunction !== true ) throw new TypeError("playerFunction must be a PlayerFunction");
        
        this.playerFunction=pF;
        return this;
    }

    send() {
        if(!this.playerFunction) throw new Error("Messenger has not been attached to a PlayerFunction yet.")
        this.frame.send(CONSTANTS.FUNCTION_SEND, {
            functionId: this.functionId,
            text: this.playerFunction.lines.toString(),
            restricted: this.playerFunction.lines.restrictedRanges,
            displayName: this.playerFunction.displayName,
            parameters: this.playerFunction.parameters,
        })
    }

    revoke() {
        if(!this.playerFunction) throw new Error("Messenger has not been attached to a PlayerFunction yet.")
        this.frame.send(CONSTANTS.FUNCTION_REVOKE, {
            functionId: this.functionId,
        })
    }

}