function importAll(require) {

    const assetList = {}
    for(let key of require.keys()) {
        assetList[key] = require(key)
    }
    
    return assetList

}

export function importImages(require) {
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

