import Phaser from 'phaser';
import { curry } from 'ramda';

export default curry((objects, superclass) => class UsesCustomObjects extends superclass {

    init(args) {
        if(typeof super.init === "function") super.init(args);

        for( const key in objects ) {
            Phaser.GameObjects.GameObjectFactory.register(key, function(x, y, config) {
                let gameObject = new objects[key](this.scene, x, y, config);
                
                this.displayList.add(gameObject);
                if(typeof gameObject.preUpdate === "function") this.updateList.add(gameObject);
        
                return gameObject;
            })
        }

    }

})