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
        return args[0].map(([ o1, o2 ]) => this.emitCollide(o1,o2)) // I should think about making this work with both collide & overlap 
    } else if(args.length === 2 && isGameObject(args[0]) && isGameObject(args[1])) {
        const [ obj1, obj2 ] = args
        return this.physics.add[type](obj1, obj2, (o1,o2) => {
            const eventPrefix = type === "collider" ? "COLLIDE" : "OVERLAP"
            o1.emit(events[eventPrefix], o1, o2)
            o2.emit(events[eventPrefix], o2, o1)
            if(o1.isPlayer===true) o2.emit(events[eventPrefix + "_PLAYER"], o1)
            if(o2.isPlayer===true) o1.emit(events[eventPrefix + "_PLAYER"], o2)
        }, null, this)
    }
}

const EmitsEventsFactory = superclass => class EmitsEvents extends superclass {

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
        emitCollideOrOverlap.call(this, "collider", ...args)
    }

    emitOverlap(...args) {
        emitCollideOrOverlap.call(this, "overlap", ...args)
    }

}

EmitsEventsFactory.events = events;

export default EmitsEventsFactory;