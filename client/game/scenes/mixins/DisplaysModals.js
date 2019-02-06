import keys from '../keys';

export default superclass => class DisplaysModals extends superclass {

    constructor(...params) {
        super(...params)
    }

    modal = {
        alert: (messages, onDismiss) => {
            this.scene.run(keys.ALERT, { messages, parent: this, onDismiss });
            return this.scene.get(keys.ALERT);
        },
        jumbotron: (title, subtitle="", onDismiss) => {
            this.scene.run(keys.JUMBOTRON, { title, subtitle, parent: this, onDismiss });
            return this.scene.get(keys.JUMBOTRON);
        }
    }

}