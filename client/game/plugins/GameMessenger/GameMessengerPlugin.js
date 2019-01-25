import Phaser from 'phaser';
import GameMessenger from '../../lib';

export default class GameStateManager extends Phaser.Plugins.BasePlugin {

    constructor(...params) {
        super(...params);
    }

    alias = "stateManager"

    initialize(frameConnection) {
        this.messenger = new GameMessenger(frameConnection);
        this.getGameProgress();
    }

    getGameProgress() {
        const { registry } = this.game;

        this.messenger.getGameProgress( ({ levels = [], error }) => {

            if(error) throw new Error(error.message);

            for( const level of levels ) {
                registry.set(level.levelId, level);
            }

        });
    }

    sendLevelCompleted(levelId, cb) {
        const { registry } = this.game;

        this.messenger.sendLevelCompleted(levelId, () => {
            const prevState = registry.get(levelId);
            const newState = Object.assign({}, prevState)
            newState.completed = true;
            registry.set(levelId, newState);
            if(typeof cb === "function") cb(newState);
        })
    }

    sendCheckpointReached(levelId, checkpointId, cb) {
        const { registry } = this.game;

        this.messenger.sendCheckpointReached(levelId, checkpointId, () => {
            const prevState = registry.get(levelId);
            const newState = Object.assign({}, prevState);
            newState.lastCheckpoint = checkpointId;
            registry.set(levelId, newState);
            if(typeof cb === "function") cb(newState);
        });

    }

    sendFunctionChanged(levelId, functionId, json, cb) {
        const { registry } = this.game;

        this.messenger.sendFunctionChanged(levelId, functionId, json, () => {
            const prevState = registry.get(levelId);
            const newState = Object.assign({}, prevState);
            newState.functions = newState.functions.slice();
            newState.functions[functionId] = json;
            registry.set(levelId, newState);
        })
    }

}