import Scene from '../Scene';

export default class Etc extends Scene {

    constructor(params) {
        super(params)
    }

    init(data) {
        if(typeof super.init === "function") super.init(data);
        if(data.parent) data.parent.events.on("shutdown", () => {
            this.scene.stop();
        });
    }

}