import constants from "./constants";

export default class GameStateMessenger {

    constructor(frameConnection) {
        this.frame = frameConnection;

        this.frame.attachListener(constants.GET_GAME_PROGRESS, this.handleGameProgressRequest.bind(this));
        this.frame.attachListener(constants.LEVEL_COMPLETED, this.handleLevelCompleted.bind(this))
        this.frame.attachListener(constants.LEVEL_CHECKPOINT, this.handleCheckpointReached.bind(this))
        this.frame.attachListener(constants.FUNCTION_SAVE, this.handleFunctionChanged.bind(this))

    }

    async getGameProgress() {
        return {
            levels: [
                {
                    levelId:"levelone",
                    lastCheckpoint:5,
                    functions: {
                        "demo-function":`{
                            "displayName": "test",
                            "description": "A function to test the loader and execution in the browser", 
                            "parameters": [],
                            "lines": [
                                { "text":"    console.log('Hello World');", "config": { "restricted": false } }
                            ]
                        }`
                    },
                    completed: false,
                }
            ]
        }
    }

    sendGameProgress(data) {
        this.frame.send(constants.SEND_GAME_PROGRESS, data)
    }

    handleGameProgressRequest() {
        this.getGameProgress().then(this.sendGameProgress.bind(this));
    }

    handleLevelCompleted({ levelId }) {
        console.log("H_LVL_CMPT", levelId)
    }

    handleCheckpointReached({ levelId, checkpointId }) {
        console.log("CHKPT", levelId, checkpointId);
    }

    handleFunctionChanged({ levelId, functionId, functionJson }) {
        console.log("FUN CHANGE", levelId, functionId, functionJson)
    }

}