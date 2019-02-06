import { curry } from 'ramda';

const UsesTiledMapFactory = (tilemapData, superclass) => {
    
    let map, tileset, layers = {}, objects;
    
    return class UsesTiledMap extends superclass {

        init(data) {
            if(typeof super.init === "function") super.init(data);

            map = this.add.tilemap(tilemapData.tilemapKey, 32, 32);
            tileset = map.addTilesetImage("industrial", "industrial-tileset"); 
    
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

            for ( const key of tilemapData.layerKeys ) {
                layers[key] = map.createStaticLayer(key, tileset, 0, 0);
                if(key.match(/platforms/i)) layers[key].setCollisionByProperty({ collides: true })
            }

            objects = map.objects.map( layer => {
                let newLayer = Object.assign({}, layer);
                let newObjects = newLayer.objects.slice();
                newObjects = newObjects.map(o => ({
                    ...o,
                    cx: o.x + o.width / 2,
                    cy: o.y + o.height / 2
                }))
                newLayer.objects = newObjects;
                return newLayer;
            }).reduce((ag, v, k) => ({...ag, [v.name || k]: v }), {})

        }

        getMap() {
            return map;
        }

        getMapObjectLayer(key) {
            return objects[key]
        }

        getMapObjectByName(layerKey, objectName) {
            return objects[layerKey].objects.find( o => o.name === objectName )
        }

        getMapLayer(key) {
            return layers[key]
        }

    }
}

export default curry(UsesTiledMapFactory)