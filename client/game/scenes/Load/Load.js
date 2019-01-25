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
    }

    constructor(params) {
        super({ ...params, key: keys.LOAD });
        this.loaded = 0;
    }

    init() {
        // this.stateManager.initialize(this.frame);
    }

    preload() {
        window.setTimeout(() => this.loaded++, 2000);
        
        this.cameras.main.setBackgroundColor("#00004d")
        
        const logo = this.add.image(400,300, 'logo')
        .setOrigin(.5, 1);
        
        const loadingBox = this.add.image(225,450,"loading-box")
        .setOrigin(0,.5)
        .setScale(.7,.5);     

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
                y:350,
                duration:800,
                delay:100
            })

            this.loaded++;
        }, this)

        super.preload();
    }

    update() {
        if(this.loaded === 2) {
            // * Start Menu Scene Here
            this.scene.start(keys.MENU)
            this.loaded = true; 
        }
    }
}

