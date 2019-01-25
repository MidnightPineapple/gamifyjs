import constants from './constants';

export default class GameMessenger {

    constructor(frameConnection) {
        this.frame = frameConnection;
    }

    getGameProgress(cb) {
        this.frame.events.once(constants.RECEIVE_GAME_PROGRESS, payload => {
            cb(payload);
        })
        this.frame.send(constants.GET_GAME_PROGRESS)
    }

    sendLevelCompleted(levelId, cb) {
        this.frame.send(constants.LEVEL_COMPLETED, { levelId }, cb);
    }

    sendCheckpointReached(levelId, checkpointId, cb) {
        this.frame.send(constants.LEVEL_CHECKPOINT, { levelId, checkpointId }, cb);
    }

    sendFunctionChanged(levelId, functionId, json, cb) {
        this.frame.send(constants.FUNCTION_SAVE, { levelId, functionId, json }, cb);
    }
}