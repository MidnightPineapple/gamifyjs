import Scene from "../Scene";
import keys from '../keys';

export default class Menu extends Scene {

    constructor(params) {
        super({ ...params, key: keys.MENU })
    }

    create() {
        
    }

}