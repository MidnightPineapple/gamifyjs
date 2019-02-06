import Phaser from 'phaser';

export default class InteractionZone extends Phaser.GameObjects.Zone {

    constructor(scene, x, y, { width, height, onOverlap, player}) {
        super(scene, x, y, width, height);

        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.moves = false;
        this.setOrigin(0,0);

        player.overlapZone(player.ZONES.INTERACT, this);

        player.on(player.constants.OverlapsZones.OVERLAP_START+"_"+player.ZONES.INTERACT, zone => {
            if(zone!==this) return;
            onOverlap(zone);
        })
    }

}