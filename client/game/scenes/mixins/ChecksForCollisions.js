import Phaser from 'phaser';

const isGameObject = obj => obj instanceof Phaser.GameObjects.GameObject

const events = {
    UPDATE:"update",
    COLLIDE:"collide",
    COLLIDE_PLAYER:"collide_player",
    OVERLAP:"overlap",
    OVERLAP_PLAYER:"overlap_player",
}

function emitCollideOrOverlap(type, ...args) {
    if(args.length === 1 && args[0] instanceof Array) {
        // if theres one argument which is an array, assume it has 2 gameobjects
        return args[0].map(([ o1, o2 ]) => {
            emitCollideOrOverlap.call(this, type, o1, o2);
        }) 
    } else if(args.length === 2 && isGameObject(args[0]) && isGameObject(args[1])) {
        const [ obj1, obj2 ] = args

        const collider = this.physics.add[type](obj1, obj2, (o1,o2) => {
            const eventPrefix = type === "collider" ? "COLLIDE" : "OVERLAP";
            if(typeof o1.emit === "function") {
                o1.emit(events[eventPrefix], o1, o2)
                if(o2.isPlayer===true) o1.emit(events[eventPrefix + "_PLAYER"], o2)
            }
            if(typeof o2.emit === "function") {
                o2.emit(events[eventPrefix], o2, o1)
                if(o1.isPlayer===true) o2.emit(events[eventPrefix + "_PLAYER"], o1)
            }
        }, null, this)

        if(!obj1.colliders) obj1.colliders = new Map();
        if(!obj2.colliders) obj2.colliders = new Map();
        obj1.colliders.set(obj2, collider);
        obj2.colliders.set(obj1, collider);

        return collider;
    }
}

const ChecksForCollisionsFactory = superclass => class ChecksForCollisions extends superclass {

    constructor(...args) {
        super(...args);
        Object.assign(this.constants, { EmitsEvents: events })
    }

    emitsEvents = true;

    update(time, delta) {
        if(typeof super.update === "function") super.update(time, delta);
        
        for( const obj of this.children.getChildren() ) {
            obj.emit(events.UPDATE, time, delta)
        }

    }

    emitCollide(...args) {
        return emitCollideOrOverlap.call(this, "collider", ...args)
    }

    emitOverlap(...args) {
        return emitCollideOrOverlap.call(this, "overlap", ...args)
    }

    allEmitCollideOne(one, all) {
        if(!(all instanceof Array)) throw Error("Second parameter must be an array of game objects");
        for( const obj of all ) {
            this.emitCollide(obj, one);
        }
    }

    emitCollideOrOverlapAll(type, all) {
        for( let i = 0; i < all.length; i++ ) {
            for ( let j = i + 1; j < all.length; j++ ) {
                switch(type) {
                    case "overlap":
                        this.emitCollide(all[i],all[j]);
                        break;
                    case "collider":
                        this.emitCollide(all[i],all[j]);
                        break;
                }
            }
        }
    }

    emitCollideAll(all) {
        this.emitCollideOrOverlapAll("collider", all);
    }

    emitOverlapAll(all) {
        this.emitCollideOrOverlapAll("overlap", all);
    }



}

ChecksForCollisionsFactory.events = events;

export default ChecksForCollisionsFactory;