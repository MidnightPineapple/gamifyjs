function importAll(require) {

    const assetList = {}
    for(let key of require.keys()) {
        assetList[key] = require(key)
    }
    
    return assetList

}

export default superclass => class ImportsAssets extends superclass {

    preload() {
        if(typeof super.preload === "function") super.preload();
        if(this.imports.hasOwnProperty("images")) this.importImages( this.imports['images'] )
        if(this.imports.hasOwnProperty("svgs")) this.importSvgs( this.imports['svgs'] )
        if(this.imports.hasOwnProperty("fonts")) this.importFonts( this.imports['fonts'] )
        if(this.imports.hasOwnProperty("tilemaps")) this.importTilemaps( this.imports['tilemaps'] )
        if(this.imports.hasOwnProperty("tilesets")) this.importTilesets( this.imports['tilesets'] )
        if(this.imports.hasOwnProperty("spritesheets")) this.importSpritesheets( this.imports['spritesheets'] )
        if(this.imports.hasOwnProperty("functionData")) this.importPlayerFunctionData( this.imports['functionData'] )
        if(this.imports.hasOwnProperty("json")) this.importJson( this.imports['json'] )
    }

    imports = {};
    
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

    importSpritesheets(require) {
        const files = importAll(require);

        for( let filename in files ) {
            const match = filename.match(/\.([0-9]{1,2}\.[0-9]{1,2}).(png|jpe?g)$/)
            let frameWidth, frameHeight;

            if(match instanceof Array) {
                const dims = match[1].split(".");
                frameWidth = parseInt(dims[0]);
                frameHeight = parseInt(dims[1]);
            }

            this.load.spritesheet(
                filename
                .replace(/\.(png|jpe?g)$/,"")
                .replace(/^\.(\\|\/)/,"")
                .replace(/\.[0-9]{1,2}\.[0-9]{1,2}/, ""),
                files[filename], 
                { 
                    frameWidth: frameWidth || 32,
                    frameHeight: frameHeight || 32,
                    spacing: 0, 
                    margin: 0,    
                }
            )
        }
    }

    importPlayerFunctionData(require) {

        const files = importAll(require);

        for( let filename in files ) {
            this.load.playerFunction(filename
                .replace(/\.json$/,"")
                .replace(/^\.(\\|\/)/,""),
                files[filename]
            )
        }

    }

    importJson(require) {
        const files = importAll(require);

        for (let filename in files) {
            this.load.json(filename
                .replace(/\.json$/,"")
                .replace(/^\.(\\|\/)/,""),
                files[filename]
            )
        }
    }
}