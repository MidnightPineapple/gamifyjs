import Menu from '../Menu';
import keys from '../../keys';

export default class MainMenu extends Menu() {

    constructor(params) {
        super({ ...params, key: keys.MENU })
    }

    create() {
        const logo = this.add.image(400,300, 'logo').setOrigin();

        const {height,width} = this.sys.game.canvas;
        this.cameras.main.setViewport(0,0, width, height)

        const { input: inputWtf, output: outputWtf } = this.cache.json.get('wtfjs');
        this.scene.launch(keys.BACKGROUND, { parent:this, color:"#1d212d"} );
        this.scene.launch(keys.TEXT_CONSOLE, { parent:this, inputLines:inputWtf, outputLines:outputWtf });
        this.scene.moveAbove(keys.TEXT_CONSOLE);

        let cont = this.add.button(80,540, {text: "<Continue>", onClick: this.startGame.bind(this) });
        let start = this.add.button(280,540, {text: "<Start Game>", onClick: this.startGame.bind(this) });
        let levels = this.add.button(510,540, {text: "<Select Level>", onClick: this.startGame.bind(this) });

        this.tweens.add({
            targets: logo,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Power3',
            duration: 300
        })
    }

    startGame() {
        this.scene.start(keys.DEMO)
    }

    openLevelMenu() {
        this.scene.start(keys.WELCOME)
    }
}
