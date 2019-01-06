import Phaser from 'phaser';
import { curry } from 'ramda';

const mixinPreUpdate = gameObject => {
    Object.assign(gameObject.prototype, {
        preUpdate(...args) {
            const _super = Object.getPrototypeOf(gameObject)
            if(typeof _super.preUpdate === "function") _super.preUpdate.call(this, ...args)
        }
    })
    return gameObject;
}

export default curry((objects, superclass) => class UsesCustomObjects extends superclass {

    init() {
        if(typeof super.init === "function") super.init();

        for( const key in objects ) {
            Phaser.GameObjects.GameObjectFactory.register(key, function(x, y, config) {
                const gameObjectClass = mixinPreUpdate(objects[key])
                let gameObject = new gameObjectClass(this.scene, x, y, config);
                
                this.displayList.add(gameObject);
                this.updateList.add(gameObject);
        
                return gameObject;
            })
        }

    }

})