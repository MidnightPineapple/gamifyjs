import { Scene as PScene } from 'phaser';

export default class Scene extends PScene {

    constructor(params) {
        super(params)

        if(!params.key) {
            // TODO: better error handler 
            throw new Error(
                "No key for scene" + 
                this.constructor.name
            )
        }
    }

}