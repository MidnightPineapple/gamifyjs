import keys from '../keys';

export default superclass => class DisplaysModals extends superclass {

    constructor(...params) {
        super(...params)
    }

    modal = {
        alert: (messages) => {
            this.scene.run(keys.ALERT, { messages, parent: this });
            return this.scene.get(keys.ALERT);
        },
        jumbotron: (title, subtitle="") => {
            this.scene.run(keys.JUMBOTRON, { title, subtitle, parent: this });
            return this.scene.get(keys.JUMBOTRON);
        }
    }

}