function importAll(require) {

    const assetList = {}
    for(let key of require.keys()) {
        assetList[key] = require(key)
    }
    
    return assetList

}

export default superclass => class ImportsAssets extends superclass {

    constructor(params) {
        super(params);
    }

    preload() {
        if(typeof super.preload === "function") super.preload();
        if(this.loads.hasOwnProperty("images")) this.importImages( this.loads['images'] )
        if(this.loads.hasOwnProperty("svgs")) this.importSvgs( this.loads['svgs'] )
        if(this.loads.hasOwnProperty("fonts")) this.importFonts( this.loads['fonts'] )
        if(this.loads.hasOwnProperty("tilemaps")) this.importTilemaps( this.loads['tilemaps'] )
        if(this.loads.hasOwnProperty("tilesets")) this.importTilesets( this.loads['tilesets'] )
        if(this.loads.hasOwnProperty("spritesheets")) this.importSpritesheets( this.loads['spritesheets'] )
    }

    loads = {};
    
    importImages(require) {
        const files = importAll(require)
        
        for(let filename in files) {
            this.load.image(
                filename
                .replace(/\.(png|jpe?g)$/,"")
                .replace(/^\.(\\|\/)/,""),
                files[filename]
            )
        }
    
    }

    importSvgs(require) {
        const files = importAll(require)
    
        for(let filename in files) {
            this.load.svg(
                filename
                .replace(/\.svg$/,"")
                .replace(/^\.(\\|\/)/,""),
                files[filename]
            )
        }
    
    }

    importFonts(require) {
        const files = importAll(require)

        const pngs = [];
        const fnts = [];

        for (let filename in files) {
            if(filename.match(/.png$/)) pngs.push(filename);
            if(filename.match(/.(xml|fnt)$/)) fnts.push(filename);
        }

        for (let png of pngs) {
            const name = png.replace(/.png$/, "").replace(/^\.(\\|\/)/,"")
            const fnt = fnts.find( x => RegExp( name + ".(xml|fnt)$").test(x))
            if(fnt) {
                this.load.bitmapFont(name, files[png], files[fnt])
            }
        }  
    }

    importTilesets(require) {
        this.importImages(require);
    }

    importTilemaps(require) {
        const files = importAll(require);
        
        for( let filename in files ) {
            this.load.tilemapTiledJSON(
                filename
                .replace(/\.json$/,"")
                .replace(/^\.(\\|\/)/,""),
                files[filename]
            )
        }
    }

    importSpritesheets(require, config) {
        const files = importAll(require);

        const spritesheetConfig = {
            frameWidth: 32,
            frameHeight: 32,
            spacing: 0, 
            margin: 0,
        }

        for( let filename in files ) {
            this.load.spritesheet(
                filename
                .replace(/\.(png|jpe?g)$/,"")
                .replace(/^\.(\\|\/)/,""),
                files[filename], 
                config || spritesheetConfig
            )
        }
    }
}