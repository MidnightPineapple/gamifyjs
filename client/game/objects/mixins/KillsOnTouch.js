export default superclass => class KillsOnTouch extends superclass {

    constructor(...args) {
        super(...args);

        if(this.scene.emitsEvents) {
            this.addListener(this.scene.constants.EmitsEvents.COLLIDE_PLAYER, this.killPlayer.bind(this));
        }
    }

    killsOnTouch = true;

    killPlayer(player) {
        player.die();
    }

}