import keys from '../keys';

export default superclass => class DisplaysAlerts extends superclass {

    constructor(...params) {
        super(...params)
    }

    alert(messages) {
        this.scene.run(keys.ALERT, { messages, parent: this })
    }

}