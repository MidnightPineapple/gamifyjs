import uuidv4 from 'uuid/v4';
import CONSTANTS from './constants';

export default class IFrameParentConnection {

    constructor() {
        // ! FOR DEBUG
        window.addEventListener("message", _ => console.log("PARENT", _))

        window.addEventListener("message", ({ data, source, origin }) => {
            if(origin !== SITE_ORIGIN ) return;
            
            let name, payload, connection, uuid;
            
            try {
                ({ name, payload, connection = undefined, uuid } = JSON.parse(data));
            } catch(e) {
                return;
            }
            if( !this.connection && name === CONSTANTS.CONNECTION_INIT ) {
                this.connect(source, connection);
            } 
            
            if( this.connection === connection ) {
                this.emit(name, payload);
                if(name !== CONSTANTS.MESSAGE_RECEIVED) {
                    this.send(CONSTANTS.MESSAGE_RECEIVED, { uuid })
                }
            }
            
        });
        this.callbacks = {}
        this.connection, this.source;
        this.ready = false;
    }

    attachListener(name, cb) {
        if(typeof this.callbacks[name] === "undefined") {
            this.callbacks[name] = new Array();
        }
        this.callbacks[name].push(cb);
    }

    removeListener(name, cb) {
        const idx = this.callbacks[name].indexOf(cb);
        if(idx === -1) throw new Error("Cant remove listener for "+name+". Index not found.");
        this.callbacks[name].splice(idx, 1);
    }

    emit(name, payload) {
        if(!this.callbacks[name]) return;
        for( const cb of this.callbacks[name] ) {
            cb(payload);
        }
    }

    send(name, payload, cb) {

        if(!name) throw new Error("Message must have a name");

        if(!this.ready) {
            const readyCallback = () => {
                this.send(name, payload, cb);
                this.removeListener(CONSTANTS.CONNECTION_READY, readyCallback);
            }
            this.attachListener(CONSTANTS.CONNECTION_READY, readyCallback);
            return;
        }

        const uuid = uuidv4();

        this.child.postMessage(JSON.stringify({
            name, 
            payload, 
            connection: this.connection, 
            uuid
        }))
        
        if(name !== CONSTANTS.MESSAGE_RECEIVED) {
            const messageCallback = ({ uuid:mUuid = undefined }) => {
                if(mUuid !== uuid) return;
                if(typeof cb === "function") cb();
                this.removeListener(CONSTANTS.MESSAGE_RECEIVED, messageCallback)
            }
    
            this.attachListener(CONSTANTS.MESSAGE_RECEIVED, messageCallback);
        }
            

    }

    connect(source, connection) {
        this.connection = connection;
        this.child = source;
        this.ready = true;
        this.emit(CONSTANTS.CONNECTION_READY);

    }

}

IFrameParentConnection.CONSTANTS = CONSTANTS;