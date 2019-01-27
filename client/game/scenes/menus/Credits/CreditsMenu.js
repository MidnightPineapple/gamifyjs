import Menu from '../Menu';
import keys from '../../keys';

export default class CreditsMenu extends Menu() {

    constructor(params) {
        super({ ...params, key: keys.CREDITS_MENU })
    }

    create() {
        const { input:credits } = this.cache.json.get('credits');
        this.scene.launch(keys.BACKGROUND, { parent:this, color:"#1d212d"} );
        this.scene.launch(keys.TEXT_CONSOLE, { parent:this, inputLines:credits });
        this.scene.moveAbove(keys.TEXT_CONSOLE);

        this.add.sprite(370,0,"player", 24)
        .setScale(13)
        .setFlipX(true)
        .setOrigin(0,0);

        this.add.button(25,540,{ text:"<Back>", onClick:this.back.bind(this) });
    }

    back(){
        this.scene.start(keys.MAIN_MENU);
    }
}
