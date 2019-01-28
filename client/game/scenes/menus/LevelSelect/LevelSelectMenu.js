import Menu from '../Menu';
import keys from '../../keys';

export default class LevelSelectMenu extends Menu() {

    constructor(params) {
        super({ ...params, key: keys.LEVEL_SELECT_MENU })
    }

    create() {
        this.cameras.main.setBackgroundColor("#1d212d");

        this.add.button(100,100,{ text: "Demo", onClick: () => this.scene.start( keys.DEMO )})
        this.add.button(200,100,{ text: "Level 1", onClick: () => this.scene.start( keys.WELCOME )})
    }

}