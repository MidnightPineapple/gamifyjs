import keys from '../keys';

export default superclass => class DisplaysModals extends superclass {

    constructor(...params) {
        super(...params)
    }

    init(data) {
        if(typeof super.init === "function") super.init(data);

        const resetKeys = () => this.input.keyboard.resetKeys();
        this.events.on("pause", resetKeys)
        this.events.on("shutdown", () => this.events.off("pause", resetKeys))
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