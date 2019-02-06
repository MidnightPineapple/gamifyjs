import Menu from '../Menu';
import keys from '../../keys';

export default class MainMenu extends Menu() {

    constructor(params) {
        super({ ...params, key: keys.MAIN_MENU })
    }

    create() {
        const logo = this.add.image(400,280, 'logo').setOrigin();

        const {height,width} = this.sys.game.canvas;
        this.cameras.main.setViewport(0,0, width, height)

        const { input: inputWtf, output: outputWtf } = this.cache.json.get('wtfjs');
        this.scene.launch(keys.BACKGROUND, { parent:this, color:"#1d212d"} );
        this.scene.launch(keys.TEXT_CONSOLE, { parent:this, inputLines:inputWtf, outputLines:outputWtf, config: { random: true } });
        this.scene.moveAbove(keys.TEXT_CONSOLE);

        // this.add.button(25,540, {text: "<Continue>", onClick: this.startGame.bind(this) });
        this.add.button(203,540, {text: "<Start Game>", onClick: this.startGame.bind(this) });
        this.add.button(410,540, {text: "<Select Level>", onClick: this.startLevelMenu.bind(this) });
        this.add.button(646,540, {text: "<Credits>", onClick: this.startCreditsMenu.bind(this) });

        this.tweens.add({
            targets: logo,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Power3',
            duration: 300
        })

        this.events.on("shutdown", () => {
            this.scene.stop(keys.BACKGROUND);
            this.scene.stop(keys.TEXT_CONSOLE);
        })

    }

    startGame() {
        this.scene.start(keys.LEVEL_ONE)
    }

    startLevelMenu() {
        this.scene.start(keys.LEVEL_SELECT_MENU)
    }

    startCreditsMenu() {
        this.scene.start(keys.CREDITS_MENU)
    }
}
