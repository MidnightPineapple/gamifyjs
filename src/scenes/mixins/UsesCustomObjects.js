import Phaser from 'phaser';
import { curry } from 'ramda';

export default curry((objects, superclass) => class UsesCustomObjects extends superclass {

    init() {
        if(typeof super.init === "function") super.init();

        for( const key in objects ) {
            Phaser.GameObjects.GameObjectFactory.register(key, function(x, y) {
                let gameObject = new objects[key](this.scene, x, y);

                this.displayList.add(gameObject);
                this.updateList.add(gameObject);
        
                return gameObject;
            })
        }

    }

})