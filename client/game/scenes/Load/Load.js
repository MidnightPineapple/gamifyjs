import { compose } from 'ramda';
import { ImportsAssets } from '../mixins';
import Scene from '../Scene';
import keys from '../keys';

export default class LoadScene extends compose(ImportsAssets)(Scene) {

    imports = {
        images: require.context("../../assets/images", false, /\.(png|jpe?g)$/),
        tilemaps: require.context("../../assets/tilemaps", false, /\.json/),
        tilesets: require.context("../../assets/tilesets", false, /\.(png|jpe?g)$/),
        spritesheets: require.context("../../assets/spritesheets", false, /\.(png|jpe?g)$/),
        functionData: require.context("../../assets/function-data", false, /\.json$/),
        json: require.context("../../assets/json", false, /\.json$/),
    }

    constructor(params) {
        super({ ...params, key: keys.LOAD });
        this.loaded = 0;
    }

    init() {
        this.stateManager.initialize(this.frame, () => this.loaded++);
    }

    preload() {
        window.setTimeout(() => this.loaded++, 2000);
        
        this.cameras.main.setBackgroundColor("#1d212d")
        
        const logo = this.add.image(400,250, 'logo')
        .setOrigin();
        
        const loadingBox = this.add.image(225,450,"loading-box")
        .setOrigin(0,.5)
        .setScale(.7,.5);     

        // TODO: I should swap out bitpotion and just use the Consolas web font....
        const loadingText = this.add.bitmapText(400,350, 'BitPotion', 'Loading: 0%', 50)
        .setOrigin(.5,0);

        const loadingBar = this.add.image(237,450,"loading-bar")
        .setOrigin(0,.5)
        .setScale(.7*0,.5); 

        this.load.on("progress", function(progress) {
            loadingBar.setScale(.7*progress, .5)
            loadingText.setText("Loading: " + Math.round(progress * 100) + "%")
        })

        this.load.on("complete", function() {
            loadingBox.destroy()
            loadingBar.destroy()
            loadingText.destroy()
            
            // start a tween to put the logo in the center for a sec
            this.tweens.add({
                targets:logo,
                ease:"Sine.easeInOut",
                y:280,
                duration:800,
                delay:100
            })

            this.loaded++;
        }, this)

        super.preload();
    }

    update() {
        if(this.loaded === 3) {
            // * Start Menu Scene Here
            this.scene.start(keys.MAIN_MENU)
            this.loaded = true; 
        }
    }
}

