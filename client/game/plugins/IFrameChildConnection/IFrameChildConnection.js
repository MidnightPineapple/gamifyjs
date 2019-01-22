import Phaser from 'phaser';
import CONSTANTS from './constants';

export default class IFrameConnection extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
        this.events = new Phaser.Events.EventEmitter();
        this.connection = Phaser.Math.RND.uuid();
        this.ready = false;
        this.parent;

        // // ! FOR DEBUG
        // window.addEventListener("message", _ => console.log("CHILD", _))
    }

    static alias = "frame"

    init() {
        if(typeof super.init === "function") super.init();
        if(window.parent === window) { this.game.destroy(true) }
        this.parent = window.parent;

        window.addEventListener("message", ({ data, source, origin }) => {
            if(origin !== SITE_ORIGIN ) return;
            if(this.parent !== source) return;
            let name, payload, connection, uuid;
            try {
                ({ name, payload, connection, uuid } = JSON.parse(data));
            } catch(e) {
                return; // if message isnt json or isnt shaped properly, ignore
            }
            
            if(connection === this.connection) {
                this.events.emit(name, payload);
                if(name !== CONSTANTS.MESSAGE_RECEIVED) {
                    this.send(CONSTANTS.MESSAGE_RECEIVED, { uuid }); 
                }
            }

        })

        this.send(CONSTANTS.CONNECTION_INIT, undefined, () => {
            this.ready = true;
            this.events.emit(CONSTANTS.CONNECTION_READY);
        });
    }

    destroy() {
        // TODO: send a disconnect event maybe... tho not all that crucial
    }

    send(name, payload, cb) {

        if(!this.ready && name !== CONSTANTS.CONNECTION_INIT) {
            this.events.once(CONSTANTS.CONNECTION_READY, () => {
                this.send(name, payload, cb);
            })
            return
        }

        if(!name) throw new Error("Message must have a name");

        const uuid = Phaser.Math.RND.uuid();

        this.parent.postMessage(JSON.stringify({
            name, 
            payload, 
            connection: this.connection, 
            uuid
        }));

        if(name !== CONSTANTS.MESSAGE_RECEIVED) {
            const messageCallback = ({ uuid:mUuid = undefined }) => {
                if(uuid !== mUuid) return;
                if(typeof cb === "function") cb();
                this.events.off(CONSTANTS.MESSAGE_RECEIVED, messageCallback);
            }
            this.events.once(CONSTANTS.MESSAGE_RECEIVED, messageCallback )        
        }
    }

}

IFrameConnection.CONSTANTS = CONSTANTS;