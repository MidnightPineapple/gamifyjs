export default superclass => class KillsOnTouch extends superclass {

    constructor(...args) {
        super(...args);

        if(this.scene.emitsEvents) {
            this.addListener(this.scene.constants.EmitsEvents.COLLIDE_PLAYER, () => {
                this.killPlayer();
            })
        }
    }

    killsOnTouch = true;

    killPlayer(player) {
        console.log("TODO: add a .die function on the player? or give it the IsMortal mixin?")
    }

}